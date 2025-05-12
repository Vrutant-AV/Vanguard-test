module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      tableName: 'product_images',
      timestamps: false,
    });

    ProductImage.associate = (models) => {
      ProductImage.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',  // Alias for reverse relation
      });
    };
    
    return ProductImage;
  };
  