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

gql`
  mutation addMovie($name: String!, $genre: String!, $directorId: ID! ) {
    addMovie (name: $name, genre: $genre, directorId: $directorId) {
      id
      name
    }
  }
`