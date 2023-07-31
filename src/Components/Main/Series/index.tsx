import { useSelector } from "react-redux";
import { TPayload } from "../../../store/Store";
import Series from "./Series/Series";
import { TStore } from "../../../store/hooks";
import Filter from "./Filter/Filter";

const SeriesMain = () => {
  const seriesArray: TPayload = useSelector(
    (state: TStore) => state.storeReducer
  );

  return (
    <div>
      <Filter />
      <Series series={seriesArray} />
    </div>
  );
};
export default SeriesMain;
