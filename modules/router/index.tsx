import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Explore } from "../../modules/explore";
import AppGroup from "../../modules/appGroup";
import AppVersion from "../../modules/appVersion";
import { AppHeader } from "../layout/AppHeader";
import Search from "../search/search";

export const Router = () => (
  <HashRouter>
    <AppHeader />
    <Routes>
      <Route path={"/"} element={<Explore />} />
      <Route path={"/app/"} element={<AppGroup />} />
      <Route path={"/version/"} element={<AppVersion />} />
      <Route path={"/search/"} element={<Search />} />
    </Routes>
  </HashRouter>
);
