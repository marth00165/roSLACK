export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    name:{
      type: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
    }
  });

  //1:M
  Channel.associate = (models) => {
    Channel.belongsTo(models.Team, {
      foreignKey: 'teamID',
    })
  };

  return Channel;
};
