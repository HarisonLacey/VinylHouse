import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from "next-auth/client";

// global styling
const GlobalStyle = createGlobalStyle`
html {
  overflow-x: hidden;
`;

// styling themes
const theme = {
  colors: {
    primary: "skyblue",
    secondary: "wheat",
    thirdly: "whitesmoke",
  },
  fonts: {
    primary: `"Fjalla One", sans-serif`,
    secondary: "'Lobster', cursive",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
