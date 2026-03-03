import cls from "./QuestionPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { useEffect, useId, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { Loader, SmallLoader } from "../../components/Loader";

export const QuestionPage = () => {
  const navigate = useNavigate();
  const checkboxId = useId();
  const [isChecked, setIsChecked] = useState(false);
  const [card, setCard] = useState(null);
  const { id } = useParams();

  const levelVariant = () =>
    card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";

  const completed = () => (card.completed ? "success" : "primary");

  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();

    setCard(data);
  });

  const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${card.id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: isChecked }),
    });
    const data = await response.json();

    setCard(data);
  });

  useEffect(() => {
    fetchCard();
  }, []);

  useEffect(() => {
    card !== null && setIsChecked(card.completed);
  }, [card]);

  const onCheckboxChangeHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
    <>
      {isCardLoading && <Loader />}

      {card !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={levelVariant()}>Level: {card.level}</Badge>
            <Badge variant={completed()}>
              {card.completed ? "Completed" : "Not Completed"}
            </Badge>
            {card?.editDate && (
              <p className={cls.editDate}>Edited: {card.editDate}</p>
            )}
          </div>
          <h5 className={cls.cardTitle}>{card.question}</h5>

          <p className={cls.cardDecsription}>{card.description}</p>

          <div className={cls.cardAnswers}>
            <label>short answer:</label>
            <p className={cls.cardAnswerText}>{card.answer}</p>
          </div>

          <ul className={cls.cardResources}>
            Resources:
            {card.resources.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.trim()} target="_blank" rel="noreferrer">
                    {link.trim()}
                  </a>
                </li>
              );
            })}
          </ul>

          <label htmlFor={checkboxId} className={cls.checkboxWrapper}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={isChecked}
              onChange={onCheckboxChangeHandler}
              disabled={false}
            />
            <span>mark question as completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>

          <Button
            onClick={() => navigate(`/editquestion/${card.id}`)}
            isDisabled={isCardUpdating}
          >
            Edit question
          </Button>
          <Button onClick={() => navigate("/")} isDisabled={isCardUpdating}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};
