import { FC, memo } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Button,
} from 'reactstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useGetDirectorsQuery,
  useAddMovieMutation,
  useAddDirectorMutation,
  GetMoviesDocument,
  GetDirectorsDocument,
} from '../type/generated/graphql';

type MovieFormInput = {
  movieName: string;
  movieGenre: string;
  directorId: string;
};

type DirectorFormInput = {
  directorName: string;
  directorAge: number;
};

export const SideNav: FC = memo(() => {
  const { data } = useGetDirectorsQuery();

  const [addMovie] = useAddMovieMutation({
    refetchQueries: [{ query: GetMoviesDocument }],
    awaitRefetchQueries: true, // addMovieの実行結果を待ってから、GetMoviesDocumentを再取得する
  });

  const [addDirector] = useAddDirectorMutation({
    refetchQueries: [{ query: GetDirectorsDocument }],
    awaitRefetchQueries: true, // addMovieの実行結果を待ってから、GetMoviesDocumentを再取得する
  });

  const { register, handleSubmit, reset } = useForm<MovieFormInput>();
  const {
    register: registerDirector,
    handleSubmit: handleSubmitDirector,
    reset: resetDirector,
  } = useForm<DirectorFormInput>();

  const onMovieSubmit: SubmitHandler<MovieFormInput> = (data) => {
    try {
      addMovie({
        variables: {
          name: data.movieName,
          genre: data.movieGenre,
          directorId: data.directorId,
        },
      });
      reset();
    } catch (error) {
      alert('エラーが発生しました');
    }
  };

  const onDirectorSubmit: SubmitHandler<DirectorFormInput> = (data) => {
    console.log(data);
    try {
      addDirector({
        variables: {
          name: data.directorName,
          age: Number(data.directorAge),
        },
      });
    } catch (error) {
      alert('エラーが発生しました');
    }
    resetDirector();
  };

  return (
    <>
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirector(onDirectorSubmit)}>
            <FormGroup>
              <input
                className='form-control'
                {...registerDirector('directorName')}
                type='text'
                name='directorName'
                placeholder='監督名'
              />
            </FormGroup>
            <FormGroup>
              <input
                className='form-control'
                {...registerDirector('directorAge')}
                type='number'
                name='directorAge'
                placeholder='年齢'
              />
            </FormGroup>
            <Button color='primary' type='submit'>
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
      <Card className='mt-4'>
        <CardHeader>映画作品</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onMovieSubmit)}>
            <FormGroup>
              <input
                className='form-control'
                type='text'
                placeholder='タイトル'
                {...register('movieName')}
              />
            </FormGroup>
            <FormGroup>
              <input
                className='form-control'
                type='text'
                placeholder='ジャンル'
                {...register('movieGenre')}
              />
            </FormGroup>

            <FormGroup>
              {data && (
                <select className='form-control' {...register('directorId')}>
                  {data.directors.map((director) => (
                    <option key={director.id} value={director.id}>
                      {director.name}
                    </option>
                  ))}
                </select>
              )}
            </FormGroup>
            <Button color='primary' type='submit'>
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
});
