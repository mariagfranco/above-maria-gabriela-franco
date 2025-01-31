import axios from "axios";

const API_KEY = "6588b324";
const BASE_URL = "http://www.omdbapi.com/";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY
  }
});

export type SerieInfo = {
  id: string;
  Series: string;
  Title: string;
  Description: string;
  SeasonNumber: number;
  EpisodeNumber: number;
  ReleaseDate: string;
  imdbID: string;
}

export const getInitialEpisodes = async () => {
    try{
        const response = await api.get('', {
            params: {
                s: 'friends',
                type: 'series',
                page: 1,
            }
        });
        return response.data;

    } catch (error) {
        console.error("Error fetching episodes: ", error);
        throw error;
    }
};

export const searchSeries = async (title: string) => {
  try {
      const response = await api.get('', {
          params: {
            s: title,
                type: 'series',
                page: 1,
          }
        });
        return response.data.Search;
      } catch (error) {
        console.error("Error fetching series details: ", error);
        throw error;
      } 
};

export const getSeriesDetails = async (imdbID?: string, season?: number) => {
    try {
        const response = await api.get('', {
            params: {
              i: imdbID,
              season,
            }
          });
          return response.data;
        } catch (error) {
          console.error("Error fetching series details: ", error);
          throw error;
        } 
};
