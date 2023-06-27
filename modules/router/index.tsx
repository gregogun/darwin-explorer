import { HashRouter, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Explore } from "../../modules/explore";
import AppGroup from "../../modules/appGroup";
import AppVersion from "../../modules/appVersion";
import { AppHeader } from "../layout/AppHeader";
import Search from "../search/search";
import { Box, darkTheme } from "@aura-ui/react";
import { MobileHeader } from "../layout/MobileHeader";
import { Landing } from "../landing/Landing";
import { useEffect, useState } from "react";

export const Router = () => (
  <HashRouter>
    <Box
      css={{
        backgroundColor: "$indigo2",
        minHeight: "100%",

        [`.${darkTheme} &`]: {
          backgroundColor: "#08090A",
        },
      }}
    >
      <AppHeader />
      <MobileHeader />
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/explore"} element={<Explore />}>
          <Route path={"/explore/app/"} element={<AppGroup />} />
          <Route path={"/explore/version/"} element={<AppVersion />} />
          <Route path={"/explore/search/"} element={<Search />} />
        </Route>
      </Routes>
    </Box>
  </HashRouter>
);
