const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await pool.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
    `, ['Admin User', 'admin@vanguard.com', hashedPassword, 'admin']);

    // Create categories
    const categories = [
      { name: 'Men', slug: 'men', description: 'Men\'s clothing and accessories' },
      { name: 'Women', slug: 'women', description: 'Women\'s clothing and accessories' },
      { name: 'Accessories', slug: 'accessories', description: 'Fashion accessories for all' }
    ];

    for (const category of categories) {
      await pool.query(`
        INSERT INTO categories (name, slug, description)
        VALUES ($1, $2, $3)
        ON CONFLICT (slug) DO NOTHING
      `, [category.name, category.slug, category.description]);
    }

    // Get category IDs
    const menCategory = await pool.query('SELECT id FROM categories WHERE slug = $1', ['men']);
    const womenCategory = await pool.query('SELECT id FROM categories WHERE slug = $1', ['women']);
    const accessoriesCategory = await pool.query('SELECT id FROM categories WHERE slug = $1', ['accessories']);

    // Create products
    const products = [
      {
        name: 'Tailored Cotton Overshirt',
        description: 'Crafted from premium cotton with a brushed finish for exceptional comfort and durability. This versatile overshirt features a relaxed fit with clean lines and minimal detailing for a contemporary silhouette.',
        price: 189.00,
        category_id: menCategory.rows[0].id,
        stock_quantity: 50,
        sku: 'TCO-001',
        images: ['https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Stone', 'Navy', 'Black']
      },
      {
        name: 'Structured Wool Blazer',
        description: 'A sophisticated blazer crafted from premium wool blend. Features a classic double-breasted design with modern tailoring for a refined silhouette.',
        price: 290.00,
        category_id: womenCategory.rows[0].id,
        stock_quantity: 30,
        sku: 'SWB-002',
        images: ['https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Charcoal', 'Black']
      },
      {
        name: 'Relaxed Linen Shirt',
        description: 'A breathable, lightweight shirt made from a linen-cotton blend, perfect for warmer climates and casual styling.',
        price: 120.00,
        category_id: menCategory.rows[0].id,
        stock_quantity: 75,
        sku: 'RLS-003',
        images: ['https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['White', 'Sky Blue', 'Beige']
      },
      {
        name: 'High-Waist Tapered Pants',
        description: 'Elegant high-waisted pants with a tapered silhouette. Perfect for both professional and casual settings.',
        price: 175.00,
        category_id: womenCategory.rows[0].id,
        stock_quantity: 40,
        sku: 'HTP-004',
        images: ['https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Olive']
      },
      {
        name: 'Oversized Merino Sweater',
        description: 'Luxuriously soft merino wool sweater with an oversized fit. Perfect for layering during cooler months.',
        price: 210.00,
        category_id: womenCategory.rows[0].id,
        stock_quantity: 25,
        sku: 'OMS-005',
        images: ['https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Cream', 'Camel', 'Forest Green']
      }
    ];

    for (const product of products) {
      await pool.query(`
        INSERT INTO products (name, description, price, category_id, stock_quantity, sku, images, sizes, colors)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (sku) DO NOTHING
      `, [
        product.name,
        product.description,
        product.price,
        product.category_id,
        product.stock_quantity,
        product.sku,
        JSON.stringify(product.images),
        JSON.stringify(product.sizes),
        JSON.stringify(product.colors)
      ]);
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('📧 Admin login: admin@vanguard.com');
    console.log('🔑 Admin password: admin123');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

seedData();