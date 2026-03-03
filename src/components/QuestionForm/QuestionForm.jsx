import cls from "./QuestionForm.module.css";
import { Button } from "../Button";
import { Select } from "../Select";
import { levelOptions } from "../../constants";
import { useId } from "react";

export const QuestionForm = ({
  dispatchAction,
  formState,
  isPending,
  submitBtnText,
}) => {
  const levelId = useId();

  return (
    <form action={dispatchAction} className={cls.form}>
      <div className={cls.formControl}>
        <label htmlFor="questionField">Question:</label>
        <textarea
          name="question"
          id="questionField"
          cols={30}
          rows={2}
          placeholder="Please enter a question"
          defaultValue={formState.question}
          required
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="shortAnswerField">Short answer:</label>
        <textarea
          name="answer"
          id="shortAnswerField"
          cols={30}
          rows={2}
          placeholder="Please enter a short answer"
          defaultValue={formState.answer}
          required
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="descriptionField">Description:</label>
        <textarea
          name="description"
          id="descriptionField"
          cols={30}
          rows={4}
          placeholder="Please enter a description"
          defaultValue={formState.description}
          required
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="resourcesField">Resources:</label>
        <textarea
          name="resources"
          id="resourcesField"
          cols={30}
          rows={2}
          placeholder="Please enter a resources"
          defaultValue={formState.resources}
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor={levelId}>Level:</label>
        <Select
          options={levelOptions}
          id={levelId}
          name="level"
          placeholder={"Question level"}
          className={cls.select}
        />
      </div>
      <label htmlFor="clearFormField" className={cls.clearFormControl}>
        <input
          type="checkbox"
          name="clearForm"
          id="clearFormField"
          className={cls.checkbox}
          defaultChecked={formState.clearForm}
        />
        <span>clear form after submitting?</span>
      </label>
      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};
