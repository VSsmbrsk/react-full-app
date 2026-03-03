import { ToastContainer } from "react-toastify";
import { Header } from "../Header";
import cls from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";

const currentYear = new Date().getFullYear();

export const MainLayout = () => {
  return (
    <>
      <div className={cls.mainLayout}>
        <Header />
        <div className={cls.mainWrapper}>
          <main className={cls.main}>
            <Outlet />{" "}
          </main>
          <footer className={cls.footer}>
            React Questions Cards Application | {currentYear} <br />
            by Vadym Samborskyi
          </footer>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
