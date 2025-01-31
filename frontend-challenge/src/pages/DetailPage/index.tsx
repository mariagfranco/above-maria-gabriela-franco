import Box from '@mui/material/Box';
import { useSeriesContext } from '../../context/SeriesContext';
import { Chip, MenuItem, Select, Typography } from '@mui/material';
import { getSeriesDetails, SerieInfo } from '../../services/omdbApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EpisodeInfo from '../../components/EpisodeInfo';
import StarRateIcon from '@mui/icons-material/StarRate';
import posterNotFound from '../../assets/posterNotFound.png'


const DetailPage = () => {
  const { episodes, setSelectedSerie, selectedSerie, season, setEpisodes, setSeason } = useSeriesContext();
  const { id } = useParams<{ id: string }>();

  const fetchEpisodesInfo = async (imdbId: string, selectedSeason: number) => {
    if (!imdbId) return;
    try {
      const response = await getSeriesDetails(imdbId, selectedSeason);
      setEpisodes(response.Episodes);
    } catch (error) {
      console.error('Failed to fetch episodes info:', error);
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchSerieInfo = async () => {
      try {
        const response = await getSeriesDetails(id);
        setSelectedSerie(response);
        if (id) {
          localStorage.setItem(id, JSON.stringify(response));
        }
        fetchEpisodesInfo(id, season);
      } catch (error) {
        console.error('Failed to fetch series info:', error);
      }
    };

    fetchSerieInfo();
  }, [id, fetchEpisodesInfo, season, setSelectedSerie]);

  useEffect(() => {
    if (id) {
      fetchEpisodesInfo(id, season);
    }
  }, [season, id, fetchEpisodesInfo]);

  const handleChange = async (e: string | number) => {
    setSeason(Number(e));
  };

  const serie = id ? JSON.parse(localStorage.getItem(`${id}`) || '{}') : null;

  return (
    <Box className='flex p-10 justify-around'>
      <Box className='h-[100vh]'>
        <img
          src={serie.Poster || posterNotFound}
          alt="poster"
          className='h-[80%] w-auto'
        />
      </Box>
      <Box className='w-[60%] px-6'>
        <Typography variant='h3'>{selectedSerie?.Title}</Typography>
        <Box className='flex justify-between py-2'>
          <Box>
            {serie?.Genre?.split(", ").map((genre: string) => (
              <Chip className='px-2 mr-2' key={genre} label={genre} />
            ))}
          </Box>
          <Typography className='flex justify-center'>
            <StarRateIcon fontSize='small' /> {serie?.imdbRating}/10
          </Typography>
        </Box>
        <Typography>{serie?.Plot}</Typography>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Season"
          onChange={(e) => handleChange(e.target.value)}
          value={season}
          className='my-2 h-9 w-40'
        >
          {Array.from({ length: Number(selectedSerie?.totalSeasons || 1) }, (_, i) => i + 1).map((s) => (
            <MenuItem key={s} value={s}>
              Season {s}
            </MenuItem>
          ))}
        </Select>

        <Box className='h-[50vh] overflow-scroll shadow-xl'>
          {episodes?.map((ep: SerieInfo) => (
            <EpisodeInfo key={ep.imdbID} title={ep.Title} imdbID={ep.imdbID} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailPage;
