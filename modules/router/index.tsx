import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Explore } from "../../modules/explore";
import AppGroup from "../../modules/appGroup";
import AppVersion from "../../modules/appVersion";
import { AppHeader } from "../layout/AppHeader";
import Search from "../search/search";
import { Box, darkTheme } from "@aura-ui/react";

export const Router = () => (
  <HashRouter>
    <Box
      css={{
        backgroundColor: "$indigo1",

        [`.${darkTheme} &`]: {
          backgroundColor: "#08090A",
        },
      }}
    >
      <AppHeader />
      <Routes>
        <Route path={"/"} element={<Explore />} />
        <Route path={"/app/"} element={<AppGroup />} />
        <Route path={"/version/"} element={<AppVersion />} />
        <Route path={"/search/"} element={<Search />} />
      </Routes>
    </Box>
  </HashRouter>
);
