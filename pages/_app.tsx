import type { AppProps } from "next/app";
import { darkTheme, globalCss, TooltipProvider } from "@aura-ui/react";
import { ThemeProvider } from "next-themes";
import { ConnectProvider } from "arweave-wallet-ui-test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const globalStyles = globalCss({
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
  "*": {
    "*:focus:not(.focus-visible)": {
      outline: "none",
    },
  },
  "html, body, #root, #__next": {
    height: "100%",
    fontFamily: "$body",
    margin: 0,
    backgroundColor: "$indigo1",

    [`.${darkTheme} &`]: {
      backgroundColor: "#08090A",
    },
  },

  "#__next": {
    position: "relative",
    zIndex: 0,
  },
  a: {
    textDecoration: "none",
    width: "100%",
  },
});

globalStyles();

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          value={{ light: "light-theme", dark: darkTheme.toString() }}
          forcedTheme="dark"
        >
          <ConnectProvider>
            <Component {...pageProps} />
          </ConnectProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
