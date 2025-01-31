import { Box, Button, IconButton } from "@mui/material"
import Search from "../SearchHeader";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;


    return(
        <Box className='flex bg-sky-700 py-4 items-center justify-between px-8 relative'>
            <Button onClick={() => navigate('/')}> 
                <img src={logo} className="h-10"/>
            </Button>
            <Search/>
            <IconButton onClick={() => navigate('/episodes')}><FavoriteIcon className={pathname == '/episodes' ? "text-yellow-400" : ""}/></IconButton>
        </Box>
    )
}

export default Header;