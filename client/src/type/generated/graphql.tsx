import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Director = {
  __typename?: 'Director';
  age: Scalars['Int'];
  id: Scalars['ID'];
  movies?: Maybe<Array<Maybe<Movie>>>;
  name: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  director?: Maybe<Director>;
  genre?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDirector?: Maybe<Director>;
  addMovie?: Maybe<Movie>;
  deleteDirector?: Maybe<Director>;
  deleteMovie?: Maybe<Movie>;
  updateDirector?: Maybe<Director>;
  updateMovie?: Maybe<Movie>;
};


export type MutationAddDirectorArgs = {
  age?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationAddMovieArgs = {
  directorId?: InputMaybe<Scalars['ID']>;
  genre?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteDirectorArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMovieArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateDirectorArgs = {
  age?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateMovieArgs = {
  directorId?: InputMaybe<Scalars['ID']>;
  genre?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  director?: Maybe<Director>;
  directors: Array<Director>;
  movie?: Maybe<Movie>;
  movies: Array<Maybe<Movie>>;
};


export type RootQueryDirectorArgs = {
  id: Scalars['ID'];
};


export type RootQueryMovieArgs = {
  id: Scalars['ID'];
};

export type GetMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMoviesQuery = { __typename?: 'RootQuery', movies: Array<{ __typename?: 'Movie', id: string, name: string, genre?: string | null, director?: { __typename?: 'Director', name: string, age: number } | null } | null> };

export type GetDirectorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDirectorsQuery = { __typename?: 'RootQuery', directors: Array<{ __typename?: 'Director', id: string, name: string }> };

export type AddMovieMutationVariables = Exact<{
  name: Scalars['String'];
  genre: Scalars['String'];
  directorId: Scalars['ID'];
}>;


export type AddMovieMutation = { __typename?: 'Mutation', addMovie?: { __typename?: 'Movie', id: string, name: string } | null };

export type AddDirectorMutationVariables = Exact<{
  name: Scalars['String'];
  age: Scalars['Int'];
}>;


export type AddDirectorMutation = { __typename?: 'Mutation', addDirector?: { __typename?: 'Director', id: string, name: string, age: number } | null };

export type DeleteMovieMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteMovieMutation = { __typename?: 'Mutation', deleteMovie?: { __typename?: 'Movie', id: string, name: string } | null };


export const GetMoviesDocument = gql`
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

/**
 * __useGetMoviesQuery__
 *
 * To run a query within a React component, call `useGetMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMoviesQuery(baseOptions?: Apollo.QueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMoviesQuery, GetMoviesQueryVariables>(GetMoviesDocument, options);
      }
export function useGetMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMoviesQuery, GetMoviesQueryVariables>(GetMoviesDocument, options);
        }
export type GetMoviesQueryHookResult = ReturnType<typeof useGetMoviesQuery>;
export type GetMoviesLazyQueryHookResult = ReturnType<typeof useGetMoviesLazyQuery>;
export type GetMoviesQueryResult = Apollo.QueryResult<GetMoviesQuery, GetMoviesQueryVariables>;
export const GetDirectorsDocument = gql`
    query getDirectors {
  directors {
    id
    name
  }
}
    `;

/**
 * __useGetDirectorsQuery__
 *
 * To run a query within a React component, call `useGetDirectorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDirectorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDirectorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDirectorsQuery(baseOptions?: Apollo.QueryHookOptions<GetDirectorsQuery, GetDirectorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDirectorsQuery, GetDirectorsQueryVariables>(GetDirectorsDocument, options);
      }
export function useGetDirectorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDirectorsQuery, GetDirectorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDirectorsQuery, GetDirectorsQueryVariables>(GetDirectorsDocument, options);
        }
export type GetDirectorsQueryHookResult = ReturnType<typeof useGetDirectorsQuery>;
export type GetDirectorsLazyQueryHookResult = ReturnType<typeof useGetDirectorsLazyQuery>;
export type GetDirectorsQueryResult = Apollo.QueryResult<GetDirectorsQuery, GetDirectorsQueryVariables>;
export const AddMovieDocument = gql`
    mutation addMovie($name: String!, $genre: String!, $directorId: ID!) {
  addMovie(name: $name, genre: $genre, directorId: $directorId) {
    id
    name
  }
}
    `;
export type AddMovieMutationFn = Apollo.MutationFunction<AddMovieMutation, AddMovieMutationVariables>;

/**
 * __useAddMovieMutation__
 *
 * To run a mutation, you first call `useAddMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMovieMutation, { data, loading, error }] = useAddMovieMutation({
 *   variables: {
 *      name: // value for 'name'
 *      genre: // value for 'genre'
 *      directorId: // value for 'directorId'
 *   },
 * });
 */
export function useAddMovieMutation(baseOptions?: Apollo.MutationHookOptions<AddMovieMutation, AddMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMovieMutation, AddMovieMutationVariables>(AddMovieDocument, options);
      }
export type AddMovieMutationHookResult = ReturnType<typeof useAddMovieMutation>;
export type AddMovieMutationResult = Apollo.MutationResult<AddMovieMutation>;
export type AddMovieMutationOptions = Apollo.BaseMutationOptions<AddMovieMutation, AddMovieMutationVariables>;
export const AddDirectorDocument = gql`
    mutation addDirector($name: String!, $age: Int!) {
  addDirector(name: $name, age: $age) {
    id
    name
    age
  }
}
    `;
export type AddDirectorMutationFn = Apollo.MutationFunction<AddDirectorMutation, AddDirectorMutationVariables>;

/**
 * __useAddDirectorMutation__
 *
 * To run a mutation, you first call `useAddDirectorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDirectorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDirectorMutation, { data, loading, error }] = useAddDirectorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      age: // value for 'age'
 *   },
 * });
 */
export function useAddDirectorMutation(baseOptions?: Apollo.MutationHookOptions<AddDirectorMutation, AddDirectorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDirectorMutation, AddDirectorMutationVariables>(AddDirectorDocument, options);
      }
export type AddDirectorMutationHookResult = ReturnType<typeof useAddDirectorMutation>;
export type AddDirectorMutationResult = Apollo.MutationResult<AddDirectorMutation>;
export type AddDirectorMutationOptions = Apollo.BaseMutationOptions<AddDirectorMutation, AddDirectorMutationVariables>;
export const DeleteMovieDocument = gql`
    mutation deleteMovie($id: ID!) {
  deleteMovie(id: $id) {
    id
    name
  }
}
    `;
export type DeleteMovieMutationFn = Apollo.MutationFunction<DeleteMovieMutation, DeleteMovieMutationVariables>;

/**
 * __useDeleteMovieMutation__
 *
 * To run a mutation, you first call `useDeleteMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMovieMutation, { data, loading, error }] = useDeleteMovieMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMovieMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMovieMutation, DeleteMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMovieMutation, DeleteMovieMutationVariables>(DeleteMovieDocument, options);
      }
export type DeleteMovieMutationHookResult = ReturnType<typeof useDeleteMovieMutation>;
export type DeleteMovieMutationResult = Apollo.MutationResult<DeleteMovieMutation>;
export type DeleteMovieMutationOptions = Apollo.BaseMutationOptions<DeleteMovieMutation, DeleteMovieMutationVariables>;