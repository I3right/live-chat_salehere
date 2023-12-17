import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export const GET_MESSAGES = gql`
query{
  messages{
    id
    user
    content
   }
}
`

export const POST_MESSAGE = gql`
mutation($user: String!, $content: String!) { 
  postMessage (user: $user, content: $content )
}
`