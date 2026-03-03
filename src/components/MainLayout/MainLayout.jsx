import { ToastContainer } from "react-toastify";
import { Header } from "../Header";
import cls from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Loader } from "../Loader";

const currentYear = new Date().getFullYear();

export const MainLayout = () => {
  return (
    <>
      <div className={cls.mainLayout}>
        <Header />
        <div className={cls.mainWrapper}>
          <main className={cls.main}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
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
