module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define('Wishlist', {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
      },
    }, {
      tableName: 'wishlist',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'product_id'],
        },
      ],
    });
  
    return Wishlist;
  };
  