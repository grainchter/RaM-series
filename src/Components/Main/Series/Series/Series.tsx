import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./series.scss";
import { ISeriesArray, ISeriesResult } from "../../../../interfaces/interfaces";

const Series = (series: any) => {
  const [seriesArray, setSeriesArray] = useState<
    Array<ISeriesArray> | undefined
  >(series.series.seriesArray);

  //изменяем локальный стейт в зависимости от выбранных фильтров
  const editSeriesArrayByFilter = (filter: any) => {
    if (filter.search.length === 0) {
      setSeriesArray(series.series.seriesArray);
    }

    if (filter.search.length > 0) {
      searchByName(filter.search);
    }

    if (filter.sortByName) {
      sortByName();
    }

    if (filter.sortByDate) {
      sortByDate();
    }
  };

  //функция сортировки по алфавиту
  const sortByName = () => {
    if (seriesArray && seriesArray.length !== 0) {
      let sortedData: Array<ISeriesArray> = [];

      seriesArray.forEach((obj: ISeriesArray) => {
        let newObj = [...obj.results];
        newObj.sort((a: any, b: any) => a.name.localeCompare(b.name));

        sortedData.push({ season: obj.season, results: newObj });
      });

      setSeriesArray(sortedData);
    }
  };

  //функция сортировки по дате
  const sortByDate = () => {
    if (seriesArray && seriesArray.length !== 0) {
      let sortedData: Array<ISeriesArray> = [];

      seriesArray.forEach((obj: ISeriesArray) => {
        let newObj = [...obj.results];
        newObj.sort((a: any, b: any) => {
          let dateA: any = new Date(a.air_date);
          let dateB: any = new Date(b.air_date);

          return dateA - dateB;
        });

        sortedData.push({ season: obj.season, results: newObj });
      });

      setSeriesArray(sortedData);
    }
  };

  //функция поиска по имени
  const searchByName = (name: string) => {
    let result;
    let resultSeriesArray;

    if (series.series.seriesArray.length > 0) {
      result = series.series.seriesArray.map((item: ISeriesArray) => ({
        season: item.season,
        results: item.results.filter((result: ISeriesResult) =>
          result.name.includes(name)
        ),
      }));

      resultSeriesArray = result.filter((result: ISeriesArray) => {
        return result.results.length !== 0;
      });
    }

    setSeriesArray(resultSeriesArray);
  };

  //два useEffect для того, чтобы подписаться на изменения разных данных и выполнять разные условия
  useEffect(() => {
    setSeriesArray(series.series.seriesArray);
  }, [series.series.seriesArray]);

  useEffect(() => {
    editSeriesArrayByFilter(series.series.filterArray);
  }, [series.series.filterArray]);

  return (
    <div className="series-container">
      <div className="wrap">
        {seriesArray &&
          seriesArray.length > 0 &&
          seriesArray.map((item: ISeriesArray) => (
            <div className="content" key={item.season}>
              <h3>{item.season}</h3>

              {item.results &&
                item.results.map((item: ISeriesResult) => (
                  <Link
                    to={"/series/" + item.id}
                    key={item.id}
                    className="link"
                  >
                    <div className="">
                      <p>Название: {item.name}</p>
                      <p>Дата выхода: {item.air_date}</p>
                      <p>
                        Номер эпизода:{" "}
                        {item.episode.substring(item.episode.length - 2)}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};
export default Series;
