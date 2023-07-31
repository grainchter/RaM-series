import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { changeFilter } from "../../../../store/Store";

import "./filter.scss";

const Filter = () => {
  //данный компонент получает данные о том, какие фильтры нужно применить из формы и записывает в стейт

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
              sortByNameReverse: false,
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
              sortByNameReverse: false,
              sortByDate: true,
            },
          })
        );
      } else if (name === "sortByNameReverse") {
        dispatch(
          changeFilter({
            filterArray: {
              search: searchValue,
              sortByName: false,
              sortByNameReverse: true,
              sortByDate: false,
            },
          })
        );
      } else if (name === "sortByDateReverse") {
        dispatch(
          changeFilter({
            filterArray: {
              search: searchValue,
              sortByName: false,
              sortByNameReverse: false,
              sortByDate: false,
              sortByDateReverse: true,
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
          <div className="actions">
            <div className="side">
              <h3>Сортировка по алфавиту</h3>
              <label htmlFor="">
                
                <input
                  type="radio"
                  name="sortByName"
                  value="sortByName"
                  onChange={(e) => changeFilterFunc(e)}
                  checked={radioSelectedValue === "sortByName"}
                />
                A-Z
              </label>
              <label htmlFor="">
                
                <input
                  type="radio"
                  name="sortByNameReverse"
                  value="sortByNameReverse"
                  onChange={(e) => changeFilterFunc(e)}
                  checked={radioSelectedValue === "sortByNameReverse"}
                />
                Z-A
              </label>
            </div>
            <div className="side">
              <h3>Сортировка по дате</h3>
              <label htmlFor="">
                
                <input
                  type="radio"
                  name="sortByDate"
                  value="sortByDate"
                  onChange={(e) => changeFilterFunc(e)}
                  checked={radioSelectedValue === "sortByDate"}
                />
                Сначала старые
              </label>
              <label htmlFor="">
                
                <input
                  type="radio"
                  name="sortByDateReverse"
                  value="sortByDateReverse"
                  onChange={(e) => changeFilterFunc(e)}
                  checked={radioSelectedValue === "sortByDateReverse"}
                />
                Сначала новые
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Filter;
