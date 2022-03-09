import { FC, memo, useCallback } from 'react';
import { Card, CardBody, Table, Button } from 'reactstrap';
import {
  useGetMoviesQuery,
  useDeleteMovieMutation,
  GetMoviesDocument,
} from '../type/generated/graphql';

export const MovieList: FC = memo(() => {
  const { data, error, loading } = useGetMoviesQuery();
  const [deleteMovie] = useDeleteMovieMutation({
    refetchQueries: [{ query: GetMoviesDocument }],
    awaitRefetchQueries: true,
  });

  const onDeleteMovie = useCallback((id: string) => {
    deleteMovie({
      variables: { id },
    });
  }, []);

  if (error) {
    console.log(error);
    return <div>エラー</div>;
  }
  if (loading) {
    return <div>...Loading</div>;
  }

  return (
    <Card>
      <CardBody>
        <Table hover>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>ジャンル</th>
              <th colSpan={2}>監督</th>
            </tr>
          </thead>
          <tbody>
            {data?.movies &&
              data.movies.map((movie) => (
                <tr key={movie?.id}>
                  <td>{movie?.name}</td>
                  <td>{movie?.genre}</td>
                  <td>{movie?.director?.name}</td>
                  <td>
                    <Button
                      color='primary'
                      size='sm'
                      onClick={() => onDeleteMovie(movie!.id)}
                    >
                      削除
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
});
