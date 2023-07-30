import { useParams } from "react-router";

const SeriesPage = () => {

    const params = useParams();
    const current = params.seriesId;
    console.log(current);
    

    return (
      <div>

      </div>
    );
  };
  export default SeriesPage;
  