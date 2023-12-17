const { createServer } = require('node:http');
const { createSchema, createYoga, PubSub } = require('graphql-yoga');

const messages = [];
// const subscribers = [];
// const pubSub = new PubSub();

// const onMessageUpdate = (fn) => subscribers.push(fn);

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */`
      type Message {
        id: ID!,
        user: String!,
        content: String!
      }

      type Query {
        messages: [Message!]
      }

      type Mutation {
        postMessage(user: String!, content: String!): ID!
      }

      type Subscription {
        messages: [Message!]
      }
    `,
    resolvers: {
      Query: {
        messages: () => messages
      },
      Mutation: {
        postMessage: (parent, { user, content }) => {
          const id = messages.length;
          messages.push({ id, user, content });
          subscribers.forEach(fn => fn());
          return id;
        }
      },
      // Subscription: {
      //   messages: {
      //     subscribe: () => {
      //       const channel = 'fixed_channel';
      //       onMessageUpdate(() => pubSub.publish(channel, { messages }));

      //       try {
      //         setTimeout(() => pubSub.publish(channel, { messages }), 0);
      //         return pubSub.asyncIterator(channel);
      //       } catch (error) {
      //         console.error('Error in subscription:', error);
      //         throw error;
      //       }
      //     },
      //     resolve: (payload) => payload
      //   },
      // },
    }
  })
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
