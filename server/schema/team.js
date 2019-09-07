export default
`
type Team {
owner: User!
members: [User!]!
channels: [Channel!]!
}

type Query {
  allTeams: [Team!]!
}

type CreateTeamResponse {
  ok: Boolean!
  errors: [Error!]
}



type Mutation {
  createTeam(name: String!): CreateTeamResponse!

}

`
