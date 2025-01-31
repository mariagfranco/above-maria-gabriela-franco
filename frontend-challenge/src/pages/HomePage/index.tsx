import { useEffect, useState } from "react";
import { getInitialEpisodes, getSeriesDetails } from "../../services/omdbApi";
import TitleCard from "../../components/TitleCard";
import { Serie, useSeriesContext } from "../../context/SeriesContext";
import { Box } from "@mui/material";

const HomePage = () => {
  const [initialData, setInitialData] = useState<[]>([]);
  const { setOpen, setSelectedSerie, season, setPoster } = useSeriesContext();

  useEffect(() => {
    const fetchInitialEpisodes = async () => {
    const response = await getInitialEpisodes();
    setInitialData(response.Search);
    };
    fetchInitialEpisodes();
  }, []);

  const fetchEpisodesInfo = async (imdbId: string) => {
    const response = await getSeriesDetails(imdbId, season);
    setSelectedSerie(response)
  };

  const handleOpenModal = (serie: Serie) => { 
    setPoster(serie.Poster);  
    fetchEpisodesInfo(serie.imdbID);
    setSelectedSerie(serie)
    setOpen(true);
  }



return(
    <Box className='pt-8 grid justify-items-center grid-flow-row lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-y-8 w-full'>
      { initialData && initialData.map((item: Serie) => {
        return <TitleCard poster={item.Poster} imdbId={item.imdbID} openDetails={() => handleOpenModal(item)}/>
      })}
    </Box>
    )
};

export default HomePage;