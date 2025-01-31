import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <>
    <Box className='fixed z-1000 w-full'>
      <Header/>
    </Box>
    <Box className='pt-20 pb-10'>
    <Outlet /> 
    </Box>
    </>
  );
};

export default Layout;