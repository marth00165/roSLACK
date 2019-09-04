
export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username:{
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args:true,
          msg: 'The Username Can only have numbers or letters'

          },
        len: {
          args:[3, 25],
          msg: 'Username must have between 3 and 25 letters'
        },
      },
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args:true,
          msg: 'Invalid Email'

          },
      }
    },
    password: {
      type: DataTypes.STRING,
    },
  }

);

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: 'user_id',
    })
    // N:M

    User.belongsToMany(models.Channel, {
      through:'channel_member',
      foreignKey: 'user_id'
    })

  };

  return User;
};
