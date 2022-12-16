import Head from "next/head";
import Link from "next/link";
import { styled } from "../stitches.config";

const Grid = styled("div", {
  display: "grid",
  gridTemplateRows: "auto 1fr",
});

export default function About() {
  return <Grid>Yooo</Grid>;
}
