import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TPayload } from "../../../../store/Store";
import { useSelector } from "react-redux";
import { TStore } from "../../../../store/hooks";

const SeriesPage = () => {
  const params = useParams();
  const current = params.seriesId;

  const [series, setSeries] = useState<any | undefined>(undefined);
  const [characters, setCharacters] = useState<any>([]);
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
    let characterIdArray: any = [];

    item.characters.forEach(async (item: any) => {
      characterIdArray.push(item.replace(/[^0-9]/g, ""));
    });

    let data = await requestData(url + characterIdArray.toString());

    setCharacters(data);
    setLoading(false);
  };

  useEffect(() => {
    seriesArray.seriesArray.forEach((item: any) => {
      item.results.forEach((item: any) => {
        if (item.id === Number(current)) {
          setSeries(item);
          getCharactersFromSeries(item);
        }
      });
    });
  }, [seriesArray]);

  // console.log(characters);

  return (
    <div>
      <p>{series && series.id}</p>

      {/* {characters &&
        characters.map((item: any) => (
          <p>{item.id}</p>
        ))} */}

      {loading ? (
        <p>loading...</p>
      ) : (
        characters && characters.map((item: any) => <p>{item.name}</p>)
      )}
    </div>
  );
};
export default SeriesPage;
