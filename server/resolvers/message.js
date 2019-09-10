import requiresAuth from '../permissions';

export default {
  Message: {
    user: ({ user_id }, args, { models }) =>
      models.User.findOne({ where: { id: user_id } }, { raw: true }),
  },
  Query: {
    messages: requiresAuth.createResolver(async (parent, { channel_id }, { models }) =>
      models.Message.findAll(
        { order: [['created_at', 'ASC']], where: { channel_id } },
        { raw: true },
      )),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Message.create({
          ...args,
          user_id: user.id,
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
