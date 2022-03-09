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
} from '../type/generated/graphql';

type MovieFormInput = {
  movieName: string;
  movieGenre: string;
  directorId: string;
};

export const SideNav: FC = memo(() => {
  const { data } = useGetDirectorsQuery();
  const [addMovie] = useAddMovieMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormInput>();

  const onSubmit: SubmitHandler<MovieFormInput> = (data) => {
    addMovie({
      variables: {
        name: data.movieName,
        genre: data.movieGenre,
        directorId: data.directorId,
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <input
                className='form-control'
                type='text'
                name='directorName'
                placeholder='監督名'
              />
            </FormGroup>
            <FormGroup>
              <input
                className='form-control'
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
          <Form onSubmit={handleSubmit(onSubmit)}>
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
              <select className='form-control' {...register('directorId')}>
                {data &&
                  data.directors.length &&
                  data.directors.map((director) => (
                    <option key={director.id} value={director.id}>
                      {director.name}
                    </option>
                  ))}
              </select>
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
