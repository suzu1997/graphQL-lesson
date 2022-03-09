import { gql } from '@apollo/client';

gql`
  query getMovies {
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

gql`
  query getDirectors {
    directors {
      id
      name
    }
  }
`;