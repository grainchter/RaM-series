import React, { useEffect, useState } from "react";
import Series from "./Components/Main/Series/Series/Series";
import { useContext } from "react";
import { useDispatch } from "react-redux";

import { SeriesContext } from "./context";
import { changeValue, changeSeasons } from "./store/Store";
import SeriesMain from "./Components/Main/Series";

import { HashRouter, Route, Link, Routes } from "react-router-dom";
import SeriesPage from "./Components/Main/Series/SeriesPage/SeriesPage";

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

  const getAllEpisodes: (url: string) => any = async (url: string) => {
    let data = await requestData(url);

    const episodes = data.results.map((episode: any) => episode);
    if (data.info.next) {
      const nextEpisodes = await getAllEpisodes(data.info.next);
      return [...episodes, ...nextEpisodes];
    }

    return episodes;
  };

  const getUniqueSeasons = (episodes: any) => {
    let seasons: any[] = [];

    episodes.forEach((item: any) => {
      seasons.push(item.episode.substring(0, 3));
    });

    const uniqSeasons = _.uniq(seasons);

    // dispatch(changeSeasons({ seasonsArray: uniqSeasons }));

    return uniqSeasons;
  };

  const getResultEpisodesArray = (uniqSeasons: any) => {
    uniqSeasons.forEach(async (item: any) => {
      let data = await requestData(URL + `?episode=${item}`);

      const results = data.results;

      dispatch(changeValue({ seriesArray: { season: item, results } }));
    });
  };

  useEffect(() => {
    getAllEpisodes(URL)
      .then((episodes: any) => getUniqueSeasons(episodes))
      .then((uniqSeasons: any) => getResultEpisodesArray(uniqSeasons));
  }, []);

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/series/:seriesId" Component={SeriesPage} />
          <Route path="/" Component={SeriesMain} />
          {/* <SeriesMain /> */}
        </Routes>
      </HashRouter>
    </div>
  );
};
export default App;
