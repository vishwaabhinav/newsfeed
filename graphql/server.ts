import { ApolloServer, gql } from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    feed(lastCreatedAt: String!, fellowship: String!): [Feed]
  }

  type Feed {
    id: Int!
    name: String
    dp: String
    announcement_title: String
    announcement_body: String 
    fellowship: String
    type: String
    created_ts: String!
    updated_ts: String!
  }
`;

export const server = new ApolloServer({ typeDefs, resolvers })
