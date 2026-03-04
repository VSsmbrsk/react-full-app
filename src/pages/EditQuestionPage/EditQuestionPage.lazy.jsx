import { lazy } from "react";
import EditQuestionPage from "./EditQuestionPage";

const EditQuestionPageLazy = lazy(() => import("./EditQuestionPage"));

export default EditQuestionPageLazy;
