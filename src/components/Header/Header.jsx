import cls from "./Header.module.css";
import { Button } from "../Button";
import reactLogo from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={reactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>
      <div className={cls.headerButtons}>
        <Button onClick={() => navigate("/addquestion")} isDisabled={false}>
          Add
        </Button>
        <Button isActive>Login</Button>
      </div>
    </header>
  );
};
