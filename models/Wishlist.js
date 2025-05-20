module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    'Wishlist',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
      },
    },
    {
      tableName: 'wishlist',
      timestamps: true, // Enable timestamps for createdAt/updatedAt
      createdAt: 'created_at',
      updatedAt: false, // Only use created_at, disable updatedAt
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'product_id'],
        },
      ],
    }
  );

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Wishlist.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
  };

  return Wishlist;
};