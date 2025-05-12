module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: 'pending',
    },
    return_status: {
      type: DataTypes.STRING(50),
      defaultValue: 'pending',
    },
    status_updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    shipping_address: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    cancelled_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cancelled_atn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    return_requested: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    return_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    return_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    return_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, 
  {
    tableName: 'orders',
    timestamps: false,
  });

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'items', 
    });
  };

  return Order;
};
