import Head from "next/head";
import styled from "styled-components";
import Header from "./Header";

// layout component

// footer styling
const Footer = styled.footer`
  height: 300px;
  background-color: ${({ theme }) => theme.colors.thirdly};
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  p {
    position: absolute;
    bottom: 5%;
    display: inline-block;
    left: 10%;
    right: 10%;
    font-family: ${({ theme }) => theme.fonts.primary};
  }
`;

// facebook icon styling
const Img = styled.img`
  margin: 10% auto 5% auto;
  transition: 0.5s;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
// layout code
export default function Layout({ children, title, home }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/images/fav.png" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <header>
        <Header home={home} />
      </header>
      <main>{children}</main>
      <Footer>
        <Img src="/images/facebook.png" alt="facebook icon" />
        <p>©Harison Lacey</p>
      </Footer>
    </>
  );
}
