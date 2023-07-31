import React, { useContext, useEffect, useState } from "react";
import { SeriesContext } from "../../../../context";
import { TPayload } from "../../../../store/Store";
import { useSelector } from "react-redux";
import { TStore } from "../../../../store/hooks";
import { Link } from "react-router-dom";


const Series = (series: any) => {



  const [seriesArray, setSeriesArray] = useState<any>(
    series.series.seriesArray
  );

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

  const sortByName = () => {
    if (seriesArray.length !== 0) {
      let sortedData: any = [];

      seriesArray.forEach((obj: any) => {
        let newObj = [...obj.results];
        newObj.sort((a: any, b: any) => a.name.localeCompare(b.name));

        sortedData.push({ season: obj.season, results: newObj });
      });

      setSeriesArray(sortedData);
    }
  };

  const sortByDate = () => {
    if (seriesArray.length !== 0) {
      let sortedData: any = [];

      seriesArray.forEach((obj: any) => {
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

  const searchByName = (name: string) => {
    let result;
    let resultSeriesArray;

    if (series.series.seriesArray.length > 0) {
      result = series.series.seriesArray.map((item: any) => ({
        season: item.season,
        results: item.results.filter((result: any) =>
          result.name.includes(name)
        ),
      }));

      resultSeriesArray = result.filter((result: any) => {
        return result.results.length !== 0;
      });
    }

    setSeriesArray(resultSeriesArray);
  };

  useEffect(() => {
    setSeriesArray(series.series.seriesArray);
  }, [series.series.seriesArray]);

  useEffect(() => {
    editSeriesArrayByFilter(series.series.filterArray);
  }, [series.series.filterArray]);

  return (
    <div className="container">
      {seriesArray &&
        seriesArray.length > 0 &&
        seriesArray.map((item: any) => (
          <div className="content" key={item.season}>
            <h3>{item.season}</h3>

            {item.results &&
              item.results.map((item: any) => (
                <Link to={"/series/" + item.id} key={item.id}>
                  {item.name}
                </Link>
              ))}
          </div>
        ))}
    </div>
  );
};
export default Series;
