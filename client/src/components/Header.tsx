import { FC, memo } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export const Header: FC = memo(() => {
  return (
    <Navbar color='primary' dark className='mb-4'>
      <NavbarBrand href='/'>Movie List</NavbarBrand>
    </Navbar>
  );
});
