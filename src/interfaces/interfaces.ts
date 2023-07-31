export interface ISeriesResult {
    air_date: string;
    characters: Array<string>;
    created: string;
    episode: string;
    id: number;
    name: string;
    url: string;
  }
  
  export interface ISeriesArray {
    season: string;
    results: Array<ISeriesResult>;
  }