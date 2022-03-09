import { FC, memo } from 'react';
import { Card, CardBody, Table } from 'reactstrap';
import { useGetMoviesQuery } from '../type/generated/graphql';

export const MovieList: FC = memo(() => {
  const { data, error, loading } = useGetMoviesQuery();

  if (error) {
    <div>エラー</div>;
  }
  if (loading) {
    <div>...Loading</div>;
  }

  return (
    <Card>
      <CardBody>
        <Table hover>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>ジャンル</th>
              <th>監督</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.movies?.map((movie) => (
                <tr key={movie?.id}>
                  <td>{movie?.name}</td>
                  <td>{movie?.genre}</td>
                  <td>{movie?.director?.name}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
});
