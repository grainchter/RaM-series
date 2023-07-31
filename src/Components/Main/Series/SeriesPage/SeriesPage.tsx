import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TPayload } from "../../../../store/Store";
import { useSelector } from "react-redux";
import { TStore } from "../../../../store/hooks";

import "./seriesPage.scss";
import { Link } from "react-router-dom";
import { ISeriesResult } from "../../../../interfaces/interfaces";

const SeriesPage = () => {
  const params = useParams();
  const current = params.seriesId;

  const [series, setSeries] = useState<ISeriesResult | undefined>(undefined);
  const [characters, setCharacters] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const seriesArray: TPayload = useSelector(
    (state: TStore) => state.storeReducer
  );

  const requestData = async (url: string) => {
    const respponse = await fetch(url, {
      method: "GET",
    });
    return await respponse.json();
  };

  const getCharactersFromSeries = async (item: any) => {
    const url = "https://rickandmortyapi.com/api/character/";
    let characterIdArray: Array<number> = [];

    item.characters.forEach(async (item: any) => {
      characterIdArray.push(item.replace(/[^0-9]/g, ""));
    });

    let data = await requestData(url + characterIdArray.toString());

    setCharacters(data);
    setLoading(false);
  };

  useEffect(() => {
    seriesArray &&
      seriesArray.seriesArray &&
      seriesArray.seriesArray.forEach((item: any) => {
        item.results.forEach((item: any) => {
          if (item.id === Number(current)) {
            setSeries(item);
            getCharactersFromSeries(item);
          }
        });
      });
  }, [seriesArray]);

  return (
    <div className="seriesPage-container">
      <div className="wrap">
        <div className="about-series">
          <h1>Название серии {series && series.name}</h1>
          <p>Дата выхода {series && series.air_date}</p>
          <p>Номер эпизода {series && series.episode}</p>
        </div>
        <div className="title">
          <h1>Персонажи, участвующие в серии</h1>
          <Link to="/">Вернуться на главную</Link>
        </div>

        {loading ? (
          <p>Загружаю персонажей...</p>
        ) : (
          <div className="content">
            {characters &&
              characters.map((item: any) => (
                <div className="item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="info">
                    <p>{item.name}</p>
                    <p>{item.status}</p>
                    <p>{item.species}</p>
                    <p>{item.type}</p>
                    <p>{item.gender}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SeriesPage;
