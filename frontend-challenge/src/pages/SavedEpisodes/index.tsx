import { Box, Typography } from "@mui/material";
import EpisodeCard from "../../components/EpisodeCard";

const SavedEpisodes = () => {
    const stagedEpisodes = localStorage.getItem("stagedEpisodes")
    const episodesArray = stagedEpisodes ? JSON.parse(stagedEpisodes) : [];

    return(
        <>
        <Box className='px-8 py-4'>
        <Typography variant="h4" className="text-sky-700">My episodes</Typography>

        </Box>
            <Box className='px-8'>
                { episodesArray.map((item: any) => {
                    return <EpisodeCard key={item.imdbID} 
                        poster={item.Poster} 
                        title={item.Title} 
                        plot={item.Plot} 
                        rating={item.imdbRating}
                        />
                })}
            </Box>
        </>
    )
};

export default SavedEpisodes;