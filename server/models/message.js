export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text:{
      type: DataTypes.STRING,
    
    }
  });

  //1:M
  Message.associate = (models) => {
    Message.belongsTo(models.Channel, {
      foreignKey: 'channelID',
    })

    Message.belongsTo(models.User, {
      foreignKey: 'userID',
    })

  };

  return Message;
};
