import requiresAuth from '../permissions';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

const NEW_MESSAGE = 'NEW_MESSAGE'

export default {
  Message: {
    user: ({ user, user_id }, args, { models }) =>{

      if(user) {
        return user;
      }

      return  models.User.findOne({ where: { id: user_id } }, { raw: true })
    }
    ,
  },
  Query: {
    messages: requiresAuth.createResolver(async (parent, { channel_id }, { models }) =>
      models.Message.findAll(
        { order: [['created_at', 'ASC']], where: { channel_id } },
        { raw: true },
      )),
  },
  Subscription: {
      newChannelMessage: {
        subscribe: withFilter(() => pubsub.asyncIterator(NEW_MESSAGE), (payload, args) => {
           return payload.channel_id === args.channel_id;
         })
        }
      },
  Mutation: {
    createMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const message = await models.Message.create({
          ...args,
          user_id: user.id,
        });

        const liveMessage = async () => {
          const current = await models.User.findOne({
            where: {
              id: user.id,
            }
          })

          pubsub.publish(NEW_MESSAGE, {
            channel_id: args.channel_id,
            newChannelMessage: {
              ...message.dataValues,
              user: current.dataValues
            }
          }
        )}

        liveMessage();


        return true;
      }

       catch (err) {
        console.log(err);
        return false;
      }
    }),
        },
      }
