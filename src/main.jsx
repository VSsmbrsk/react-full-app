import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>, // оборачиваем приложение в StrictMode (строгий режим), который запускает повторный рендер для выявления потенциальных проблем в коде.
  //  Это помогает обнаружить небезопасные методы жизненного цикла, устаревшие API и другие проблемы, которые могут возникнуть в будущем при обновлении React.
);
