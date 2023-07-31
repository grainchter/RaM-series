import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { changeFilter } from "../../../../store/Store";

import "./filter.scss";

const Filter = () => {
  const dispatch = useDispatch();
  const [radioSelectedValue, setRadioSelectedValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const changeFilterFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

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
    <div className="filter-container">
      <div className="content">
        <form action="" className="form">
          <input
            type="text"
            name="search"
            id=""
            onChange={(e) => changeFilterFunc(e)}
            placeholder="Поиск серии..."
          />
          <label htmlFor="">
            Сортировка по алфавиту
            <input
              type="radio"
              name="sortByName"
              value="sortByName"
              onChange={(e) => changeFilterFunc(e)}
              checked={radioSelectedValue === "sortByName"}
            />
          </label>
          <label htmlFor="">
            Сортировка по дате
            <input
              type="radio"
              name="sortByDate"
              value="sortByDate"
              onChange={(e) => changeFilterFunc(e)}
              checked={radioSelectedValue === "sortByDate"}
            />
          </label>
        </form>
      </div>
    </div>
  );
};
export default Filter;
