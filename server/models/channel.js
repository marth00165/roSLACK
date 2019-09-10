export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    name:{
      type: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
    }
  },

);

  //1:M
  Channel.associate = (models) => {
    Channel.belongsTo(models.Team, {
      foreignKey: 'team_id',
    })

    // N:M
  Channel.belongsToMany(models.User, {
    through:'channel_member',
    foreignKey: 'channel_id'
    })
  };

  return Channel;
};
