
import { Box, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarRateIcon from '@mui/icons-material/StarRate';
import { removeFavorite } from '../../services/favoritesService';
import { useState } from 'react';

interface TitleCardProps {
  poster: string;
  title: string;
  plot: string;
  rating: number;
}

const EpisodeCard: React.FC<TitleCardProps> = ({
  poster,
  title,
  plot,
  rating
}) => {

  const [removed, setRemoved] = useState(false)
  const handleRemove = () => {
    removeFavorite(title)
    setRemoved(true);
  }
  return (
    <>
    <Box className='min-h-70 w-[80%] mb-10 flex shadow-xl border border-gray-100 rounded-xl justify-self-center'>
        <Box>
            <img src={poster} className='min-h-70 w-50 rounded-l-lg'/>
        </Box>
        <Box className='w-[80%] px-6 py-4 justify-between flex flex-col'>
            <Box>
                <Typography variant='h4' >{title}</Typography>
                <Typography className='pt-4'>{plot}</Typography>
            </Box>
            <Box className='flex w-full justify-between'>
                <Typography className='flex justify-center'>
                    <StarRateIcon fontSize='small' /> {rating}/10
                </Typography>               
                <IconButton onClick={handleRemove}>{ <FavoriteIcon className={removed ? '' :'text-yellow-400'}/>}</IconButton>
            </Box>
        </Box>
  </Box>
  </>
  );
};

export default EpisodeCard;