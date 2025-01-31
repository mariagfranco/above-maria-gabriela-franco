
import { CardActionArea, CardContent, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';

interface TitleCardProps {
  poster: string;
  imdbId: string;
  openDetails?: () => void;
  isSearch?: boolean;
}

const TitleCard: React.FC<TitleCardProps> = ({
  poster,
  imdbId,
}) => {

  return (
    <>
    <Card className='h-70 w-40'>
    <CardActionArea href={`/details/${imdbId}`}>  
      <CardMedia
        component="img"
        height="14"
        image={poster}
        alt="green iguana"
        className='h-70 w-40'
      />
      <CardContent>
      </CardContent>
    </CardActionArea>
  </Card>
  </>
  );
};

export default TitleCard;