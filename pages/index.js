import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Block from "../components/Block";
import Items from "../models/items";
import dbConnect from "../util/mongodb";
import Slider from "../components/Slider";
import Newsletter from "../components/Newsletter";
import { Sizes } from "../components/Sizes";

// index page

// column styling
const Column = styled(Col)`
  height: 1000px;
  background-color: white;
`;

// container styling
const Cont = styled(Container)`
  padding: 0;
  overflow: hidden;
`;

// parallax styling
const Parallax = styled.div`
  height: 700px;
  background-image: url(${({ url }) => url});
  background-attachment: ${({ attach }) => attach};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

// about text styling
const About = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  align-items: center;
  height: 100%;
  text-align: center;
  line-height: 1.6;
  font-size: 1.5em;
  padding: 5%;
  @media only screen and (min-width: ${Sizes.lg}px) {
    border-bottom: solid 1px;
  }
  p {
    border-bottom: solid 10px ${({ theme }) => theme.colors.primary};
    padding-bottom: 10%;
  }
  span {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-size: 1.2em;
  }
`;

// column top styling
const ColTop = styled(Col)`
  margin-bottom: 20px;
`;

// index page code
export default function Home({ items }) {
  return (
    <Layout title="VinylHouse" home>
      <Cont fluid>
        <Row noGutters>
          <ColTop xs={12}>
            <Parallax url="/images/shop.jpg" attach="fixed"></Parallax>
            <Newsletter />
            <Block
              color="whitesmoke"
              size="5em"
              stat
              text="Vinyl. For. Days"
              dir
              id="7"
              top="150px"
              overflow="visible"
              underline
            />
          </ColTop>
          <Col lg={6}>
            <Slider items={items} />
          </Col>
          <Col lg={6}>
            <About id="About">
              <p>
                <span>VinylHouse</span> is South Africa's largest vinyl music
                and record store. We buy sell and trade anything vinyl related.
                We aim to stock a great selection of hand-picked music from
                Jazz, Soul and Blues through to mainstream Rock 'n Roll.{" "}
              </p>
            </About>
          </Col>
          <Column id="Categories" xs={12}>
            <Block
              color="black"
              size="5em"
              link
              text="ROCK"
              id="1"
              top="50px"
              underline
            />
            <Block
              text=""
              para
              url="/images/store.jpg"
              id="1"
              dir
              top="50px"
              attach="fixed"
            />
            <Block
              color="black"
              size="5em"
              link
              text="POP"
              id="2"
              top="350px"
              underline
            />
            <Block
              text=""
              para
              url="/images/store.jpg"
              id="2"
              dir
              top="350px"
              attach="fixed"
            />
            <Block
              color="black"
              size="5em"
              link
              text="RAP"
              id="3"
              top="650px"
              underline
            />
            <Block
              text=""
              para
              url="/images/store.jpg"
              id="3"
              dir
              top="650px"
              attach="fixed"
            />
          </Column>
          <Col xs={12}>
            <Parallax url="/images/what.jpg" attach="fixed"></Parallax>
          </Col>
          <Column id="Contact" xs={12}>
            <Block
              color="black"
              size="2em"
              text="23 Longstreet, Cape Town"
              id="4"
              top="50px"
              stat
              underline
            />
            <Block
              id="4"
              para
              url="/images/pile.jpg"
              stat
              dir
              top="50px"
              attach="fixed"
            />
            <Block
              id="5"
              para
              url="/images/pile.jpg"
              stat
              top="350px"
              attach="fixed"
            />
            <Block
              color="black"
              size="2em"
              text="vhouse@gmail"
              id="5"
              dir
              top="350px"
              bg
              underline
            />
            <Block
              stat
              color="black"
              size="2em"
              text="987 888 567"
              id="6"
              top="650px"
              underline
            />
            <Block
              id="6"
              para
              url="/images/pile.jpg"
              stat
              dir
              top="650px"
              attach="fixed"
            />
          </Column>
        </Row>
      </Cont>
    </Layout>
  );
}

// get all items and pass to slide component
export async function getStaticProps() {
  try {
    await dbConnect();
    const res = await Items.find({});
    let items = await res.map((e) => {
      let item = e.toObject();
      item._id = item._id.toString();
      return item;
    });
    return {
      props: {
        items: items,
      },
      revalidate: 1,
    };
  } catch (err) {
    console.log(err.message);
  }
}
