import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
 query {
    movies {
      id
      name
      genre
      director { 
        name
        age
      }
    }
  }
`;