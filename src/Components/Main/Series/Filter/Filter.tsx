import React, { useContext, useEffect, useState } from "react";
import { SeriesContext } from "../../../../context";
import { TPayload } from "../../../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { TStore } from "../../../../store/hooks";
import { changeFilter } from "../../../../store/Store";

const Filter = () => {
  const dispatch = useDispatch();
  const [radioSelectedValue, setRadioSelectedValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const changeFilterFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    console.log(value);
    console.log(name);

    if (name !== "search") {
      setRadioSelectedValue(name);
      if (name === "sortByName") {
        dispatch(
          changeFilter({
            filterArray: {
              search: searchValue,
              sortByName: true,
              sortByDate: false,
            },
          })
        );
      } else if (name === "sortByDate") {
        dispatch(
          changeFilter({
            filterArray: {
              search: searchValue,
              sortByName: false,
              sortByDate: true,
            },
          })
        );
      }
    }

    if (name === "search") {
      setSearchValue(value);
      dispatch(
        changeFilter({
          filterArray: { search: value, sortByName: false, sortByDate: false },
        })
      );
    }
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          name="search"
          id=""
          onChange={(e) => changeFilterFunc(e)}
        />
        <input
          type="radio"
          name="sortByName"
          value="sortByName"
          onChange={(e) => changeFilterFunc(e)}
          checked={radioSelectedValue === "sortByName"}
        />
        <input
          type="radio"
          name="sortByDate"
          value="sortByDate"
          onChange={(e) => changeFilterFunc(e)}
          checked={radioSelectedValue === "sortByDate"}
        />
      </form>
    </div>
  );
};
export default Filter;
