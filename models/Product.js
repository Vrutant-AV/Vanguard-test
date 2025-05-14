module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(100),
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'products',
      timestamps: false,
    });

    Product.associate = (models) => {
      Product.hasMany(models.ProductImage, {
        foreignKey: 'product_id',
        as: 'images', 
      });

      Product.hasMany(models.OrderItem, {
        foreignKey: 'product_id',
        as: 'orderItems',
      });
    };

    return Product;
  };
  