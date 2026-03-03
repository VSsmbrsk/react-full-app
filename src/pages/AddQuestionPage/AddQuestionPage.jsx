import cls from "./AddQuestionPage.module.css";
import { Select } from "../../components/Select";
import { API_URL, levelOptions } from "../../constants";
import { useId, useActionState } from "react";
import { Button } from "../../components/Button";
import { toast } from "react-toastify";
import { delayFn } from "../../helpers/delayFn";
import { Loader } from "../../components/Loader";

const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn();
    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm; //or formData.get("clearForm")

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: undefined,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const question = response.json();
    toast.success("New question is successfully created");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

export const AddQuestionPage = () => {
  const [formState, dispatchAction, isPending] = useActionState(
    createCardAction,
    { clearForm: true },
  );
  const levelId = useId();
  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
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
          <Button isDisabled={isPending}>Add question</Button>
        </form>
      </div>
    </>
  );
};
