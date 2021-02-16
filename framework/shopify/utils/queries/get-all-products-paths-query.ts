const getAllProductsPathsQuery = /* GraphQL */ `
  query getAllProductPaths($first: Int!, $cursor: String) {
    products(first: $first, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          handle
        }
        cursor
      }
    }
  }
`
export default getAllProductsPathsQuery
