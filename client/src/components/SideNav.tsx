import { FC, memo } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Button,
} from 'reactstrap';
import { useGetDirectorsQuery } from '../type/generated/graphql';

export const SideNav: FC = memo(() => {
  const { data } = useGetDirectorsQuery();

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
          <Form>
            <FormGroup>
              <input
                className='form-control'
                type='text'
                name='movieName'
                placeholder='タイトル'
              />
            </FormGroup>
            <FormGroup>
              <input
                className='form-control'
                type='text'
                name='movieGenre'
                placeholder='ジャンル'
              />
            </FormGroup>
            <FormGroup>
              <select className='form-control' name='directorId'>
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
