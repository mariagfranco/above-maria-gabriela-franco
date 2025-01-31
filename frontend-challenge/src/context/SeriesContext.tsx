import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Serie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

type SerieInfo = {
  Actors?: string;
  Awards?: string;
  Country?: string;
  Director?: string;
  Genre?: string;
  Language?: string;
  Metascore?: string;
  Plot?: string;
  Poster?: string;
  Rated?: string;
  Released?: string;
  Title?: string 
  Type?: string;
  Writer?: string;
  Year?: string;
  imdbID?: string;
  imdbRating?: string;
  imdbVotes?: string;
  totalSeasons?: string;
};

interface SeriesContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  imdbID: string;
  setImdbID: (open: string) => void;
  selectedSerie:  SerieInfo;
  setSelectedSerie: (serie: Serie) => void;
  season: number;
  setSeason: (season: number) => void;
  poster: string;
  setPoster: (poster: string) => void;
  episodes: any;
  setEpisodes: (episodes: any[]) => void;
}

const SeriesContext = createContext<SeriesContextType | undefined>(undefined);

interface ConversionProviderProps {
  children: ReactNode;
}

export const SeriesProvider: React.FC<ConversionProviderProps> = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [imdbID, setImdbID] = useState<string>('');
    const [season, setSeason] = useState<number>(1);
    const [poster, setPoster] = useState<string>('');
    const [selectedSerie, setSelectedSerie] = useState<Serie>({
        Poster: '',
        Title: '',
        Type: '',
        Year: '',
        imdbID: ''
    });
    const [episodes, setEpisodes] = useState<Array<any>>([]);


  return (
    <SeriesContext.Provider value={{ open, setOpen, selectedSerie, setSelectedSerie, season, setSeason, imdbID, setImdbID, poster, setPoster, episodes, setEpisodes }}>
      {children}
    </SeriesContext.Provider>
  );
};

export const useSeriesContext = (): SeriesContextType => {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error('useSeriesContext must be used within a ConversionProvider');
  }
  return context;
};
