// models/NewsletterSubscriber.js
module.exports = (sequelize, DataTypes) => {
  const NewsletterSubscriber = sequelize.define('NewsletterSubscriber', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    subscribed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'newsletter_subscribers',
    timestamps: false, // disable automatic createdAt/updatedAt
  });

  return NewsletterSubscriber;
};
