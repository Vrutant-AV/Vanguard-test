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
  
    return ProductImage;
  };
  