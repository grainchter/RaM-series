import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { changeValue } from "./store/Store";
import SeriesMain from "./Components/Main/Series";

import { HashRouter, Route, Routes } from "react-router-dom";
import SeriesPage from "./Components/Main/Series/SeriesPage/SeriesPage";
import "./global.css";
import { ISeriesArray, ISeriesResult } from "./interfaces/interfaces";

var _ = require("lodash");

const App = () => {
  const dispatch = useDispatch();

  const URL = "https://rickandmortyapi.com/api/episode/";

  const requestData = async (url: string) => {
    const respponse = await fetch(url, {
      method: "GET",
    });
    return await respponse.json();
  };

  const getAllEpisodes: (url: string) => Promise<Array<ISeriesArray>> = async (
    url: string
  ) => {
    let data = await requestData(url);

    const episodes = data.results.map((episode: ISeriesResult) => episode);

    if (data.info.next) {
      const nextEpisodes = await getAllEpisodes(data.info.next);
      return [...episodes, ...nextEpisodes];
    }

    return episodes;
  };

  const getUniqueSeasons = (episodes: Array<ISeriesArray>) => {
    let seasons: Array<string> = [];

    episodes.forEach((item: any) => {
      seasons.push(item.episode.substring(0, 3));
    });

    const uniqSeasons = _.uniq(seasons);

    return uniqSeasons;
  };

  const getResultEpisodesArray = (uniqSeasons: Array<string>) => {
    uniqSeasons.forEach(async (item: string) => {
      let data = await requestData(URL + `?episode=${item}`);

      const results = data.results;

      dispatch(changeValue({ seriesArray: { season: item, results } }));
    });
  };

  useEffect(() => {
    getAllEpisodes(URL)
      .then((episodes: Array<ISeriesArray>) => getUniqueSeasons(episodes))
      .then((uniqSeasons: Array<string>) =>
        getResultEpisodesArray(uniqSeasons)
      );
  }, []);

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/series/:seriesId" Component={SeriesPage} />
          <Route path="/" Component={SeriesMain} />
        </Routes>
      </HashRouter>
    </div>
  );
};
export default App;
