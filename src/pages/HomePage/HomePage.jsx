import cls from "./HomePage.module.css";
import { API_URL, sortOptions, countOptions } from "../../constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState(
    `?_page=1&_per_page=${DEFAULT_PER_PAGE}`,
  );
  const [questions, setQuestions] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [countSelectValue, setCountSelectValue] = useState("");

  const getActivePageNumber = () =>
    questions.next === null ? questions.last : questions.next - 1;

  const controlsWrapperRef = useRef();

  const [getQuestions, loading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();
    setQuestions(questions);
    return questions;
  });

  const cards = useMemo(() => {
    if (questions?.data) {
      if (inputValue.trim()) {
        return questions.data.filter((d) =>
          d.question.toLowerCase().includes(inputValue.trim().toLowerCase()),
        );
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, inputValue]);

  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;
    return Array(totalCardsCount)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);

  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  const inputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);

    setSearchParams(
      `?_page=1&_per_page=${countSelectValue}&${e.target.value}` ||
        DEFAULT_PER_PAGE,
    );
  };

  const onCountSelectChangeHandler = (e) => {
    setCountSelectValue(e.target.value);
    setSearchParams(
      `?_page=1&_per_page=${e.target.value}&${sortSelectValue}` ||
        DEFAULT_PER_PAGE,
    );
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      return setSearchParams(
        `?_page=${e.target.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`,
        controlsWrapperRef.current.scrollIntoView(
          { behavior: "smooth" } || DEFAULT_PER_PAGE,
        ),
      );
    }
  };

  return (
    <>
      <div className={cls.inputWrapper} ref={controlsWrapperRef}>
        <SearchInput value={inputValue} onChange={inputValueHandler} />
        <Select
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          options={sortOptions}
          placeholder="Sort by"
          className={cls.select}
        />

        <Select
          value={countSelectValue}
          onChange={onCountSelectChangeHandler}
          options={countOptions}
          className={cls.select}
        />
      </div>
      {loading && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList cards={cards} />

      {cards.length === 0 ? (
        <p className={cls.noCardsInfo}>No cards...</p>
      ) : (
        pagination.length > 1 && (
          <div className={cls.paginationContainer} onClick={paginationHandler}>
            {pagination.map((value) => {
              return (
                <Button key={value} isActive={value === getActivePageNumber()}>
                  {value}
                </Button>
              );
            })}
          </div>
        )
      )}
    </>
  );
};
