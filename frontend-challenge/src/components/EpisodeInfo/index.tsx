import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Alert, Box, IconButton, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSeriesDetails } from '../../services/omdbApi';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { addFavorite, removeFavorite } from '../../services/favoritesService';

interface EpisodeInfoProps {
  title: string;
  imdbID: string;
}

interface EpisodeDetails {
  Plot: string;
  Title: string;
  Rating: string;
  Poster: string;
}

const EpisodeInfo = ({title, imdbID}: EpisodeInfoProps) => {
  const [open, setOpen] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')


    const [episodeInfo, setEpisodeInfo] = useState<EpisodeDetails | null>(null);
    useEffect(() => {
        const getEpisodeDetail = async () => {
           const response = await getSeriesDetails(imdbID);
            setEpisodeInfo(response)
        };
        getEpisodeDetail()
    }, [imdbID])
   
    const isStaged = episodeInfo ? localStorage.getItem("stagedEpisodes")?.includes(title) : false;

    const handleStoraged =  () => {
      if(isStaged){
        removeFavorite(title)
        setNotificationMessage(`The episode ${title} was removed to you favorites!`)
        setOpen(true);
      } else {
        if(episodeInfo) {
          addFavorite(episodeInfo);
          setNotificationMessage(`The episode ${title} was succesfully added to you favorites!` )
          setOpen(true);
        }
     
      }
    }

  return (
    
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className='flex'>
            {episodeInfo?.Plot}
            <IconButton onClick={() => handleStoraged()}>{isStaged ? <BookmarkOutlinedIcon/> : <BookmarkBorderIcon/>}</IconButton>
            <Snackbar 
              open={open} 
              autoHideDuration={2000} 
              onClose={() => 
              setOpen(false)}  
              anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert icon={false} severity="info" onClose={() => setOpen(false)}>
                  {notificationMessage}
                </Alert>
            </Snackbar>
          </Box>
        </AccordionDetails>
      </Accordion>
  );
}

export default EpisodeInfo
