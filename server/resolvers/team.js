import formatErrors from '../formatErrors'
import requiresAuth from '../permissions'


export default {
  Query: {
    allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
      models.Team.findAll({ where: { owner: user.id } }, { raw: true })),
  },
  Mutation: {
    addTeamMember: requiresAuth.createResolver(async (parent, { email, team_id }, { models, user }) => {
  try {
    const teamPromise = models.Team.findOne({ where: { id: team_id } }, { raw: true });
    const userToAddPromise = models.User.findOne({ where: { email } }, { raw: true });
    const [team, userToAdd] = await Promise.all([teamPromise, userToAddPromise]);
    if (team.owner !== user.id) {
      return {
        ok: false,
        errors: [{ path: 'email', message: 'You cannot add members to the team' }],
      };
    }
    if (!userToAdd) {
      return {
        ok: false,
        errors: [{ path: 'email', message: 'Could not find user with this email' }],
      };
    }
    await models.Member.create({ user_id: userToAdd.id, team_id });
    return {
      ok: true,
    };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      errors: formatErrors(err),
    };
  }
}),
  createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const team = await models.Team.create({ ...args, owner: user.id });
        await models.Channel.create({ name: 'general', public: true, team_id: team.id });
        console.log(team)
        return {
          ok: true,
          team
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    }),
  },
  Team: {
    channels: ({ id }, args, { models }) => models.Channel.findAll({ where: { team_id: id } }),
  },
};
