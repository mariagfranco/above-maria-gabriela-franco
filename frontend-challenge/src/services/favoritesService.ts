export type FavoriteEpisode = {
    Title: string;
    Plot: string;
    Rating: string;
    Poster: string;
}

export const addFavorite = (episodeInfo: FavoriteEpisode) => {
      const stagedEpisodes = JSON.parse(localStorage.getItem("stagedEpisodes") || '[]');
      stagedEpisodes.push(episodeInfo);
      localStorage.setItem("stagedEpisodes", JSON.stringify(stagedEpisodes));
  }

  export const removeFavorite =  (title: string) => {
      const stagedEpisodes = JSON.parse(localStorage.getItem("stagedEpisodes") || '[]');
      const updatedEpisodes = stagedEpisodes.filter((episode: FavoriteEpisode) => episode.Title !== title);
      console.log(stagedEpisodes, 'opa')
      localStorage.setItem("stagedEpisodes", JSON.stringify(updatedEpisodes));
  }

