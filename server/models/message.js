export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text:{
      type: DataTypes.STRING,
    },

  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
);

  //1:M
  Message.associate = (models) => {
    Message.belongsTo(models.Channel, {
      foreignKey: 'channel_id',
    })

    Message.belongsTo(models.User, {
      foreignKey: 'user_id',
    })

  };

  return Message;
};
