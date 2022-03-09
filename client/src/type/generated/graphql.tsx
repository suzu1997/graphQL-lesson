import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  age?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  movies?: Maybe<Array<Maybe<Movie>>>;
  name?: Maybe<Scalars['String']>;
};

export type Movie = {
  __typename?: 'Movie';
  director?: Maybe<Director>;
  genre?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
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
  directors?: Maybe<Array<Maybe<Director>>>;
  movie?: Maybe<Movie>;
  movies?: Maybe<Array<Maybe<Movie>>>;
};

export type RootQueryDirectorArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type RootQueryMovieArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type GetMoviesQueryVariables = Exact<{ [key: string]: never }>;

export type GetMoviesQuery = {
  __typename?: 'RootQuery';
  movies?: Array<{
    __typename?: 'Movie';
    id?: string | null;
    name?: string | null;
    genre?: string | null;
    director?: {
      __typename?: 'Director';
      name?: string | null;
      age?: number | null;
    } | null;
  } | null> | null;
};

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
export function useGetMoviesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMoviesQuery, GetMoviesQueryVariables>(
    GetMoviesDocument,
    options
  );
}
export function useGetMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMoviesQuery,
    GetMoviesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMoviesQuery, GetMoviesQueryVariables>(
    GetMoviesDocument,
    options
  );
}
export type GetMoviesQueryHookResult = ReturnType<typeof useGetMoviesQuery>;
export type GetMoviesLazyQueryHookResult = ReturnType<
  typeof useGetMoviesLazyQuery
>;
export type GetMoviesQueryResult = Apollo.QueryResult<
  GetMoviesQuery,
  GetMoviesQueryVariables
>;
