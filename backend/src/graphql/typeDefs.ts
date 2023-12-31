// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  input FilterState {
    hasPark: Boolean
    hasNightSkiing: Boolean
    hasChairlift: Boolean
    hasGondola: Boolean
    isCertified: Boolean

    minElevationDifference: Int
    minBaseElevation: Int
    minTotalPiste: Int
    minTotalLifts: Int
    maxDayPassPrice: Int

    sortType: String
  }

  # This "Destination" type defines the queryable fields for every destination in our data source.
  type Destination {
    id: Int
    Resort: String
    Country: String
    HighestPoint: Int
    LowestPoint: Int
    ElevationDifference: Int
    DayPassPriceAdult: Int
    BeginnerSlope: Int
    IntermediateSlope: Int
    DifficultSlope: Int
    TotalSlope: Int
    Snowparks: Boolean
    NightSki: Boolean
    SurfaceLifts: Int
    ChairLifts: Int
    GondolaLifts: Int
    TotalLifts: Int
    TotalRating: Int
    AmountOfRatings: Int
    Certified: Boolean
  }

  input DestinationInput {
    id: Int
    Resort: String
    Country: String
    HighestPoint: Int
    LowestPoint: Int
    ElevationDifference: Int
    DayPassPriceAdult: Int
    BeginnerSlope: Int
    IntermediateSlope: Int
    DifficultSlope: Int
    TotalSlope: Int
    Snowparks: Boolean
    NightSki: Boolean
    SurfaceLifts: Int
    ChairLifts: Int
    GondolaLifts: Int
    TotalLifts: Int
    TotalRating: Int
    AmountOfRatings: Int
    Certified: Boolean
  }

  type DestinationConnection {
    edges: [DestinationEdge]
    pageInfo: PageInfo
  }

  type DestinationEdge {
    node: Destination
  }

  type PageInfo {
    endCursor: Destination
    hasNextPage: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "destination" query returns an array of zero or more Destinations (defined above).
  type Query {
    getCountries: [String]
    getDestination(Resort: String!): Destination
    getDestinations(searchTerm: String!, maxResults: Int!): [Destination]
    getFilteredDestinations(Country: String!, filter: FilterState!, after: DestinationInput, first: Int): DestinationConnection
  }

  type Mutation {
    giveRating(Resort: String!, Rating: Int!): Destination
  }
`;

export default typeDefs;
