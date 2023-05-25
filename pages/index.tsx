import { Router as StaticRouter } from "../modules/router";
import dynamic from "next/dynamic";

const Router = dynamic<React.ComponentProps<typeof StaticRouter>>(
  () => import("../modules/router").then((mod) => mod.Router),
  {
    ssr: false,
  }
);

export default function Home() {
  return <Router />;
}
