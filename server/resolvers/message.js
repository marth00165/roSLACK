export default {
  Query: {
    messages: async (parent, args, { models, user }) => [],
  },
  Mutation: {
    createMessage: async (parent, args, { models, user }) => {
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
    },
  },
};
