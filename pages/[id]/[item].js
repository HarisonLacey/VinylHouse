import Items from "../../models/items";
import dbConnect from "../../util/mongodb";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Block from "../../components/Block";
import { Sizes } from "../../components/Sizes";

// single item page

// parallax styling
const Parallax = styled.div`
  height: 700px;
  background-image: url(${({ url }) => url});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

// container styling
const Cont = styled(Container)`
  padding: 0;
  overflow: hidden;
`;

// item image styling
const ColImg = styled(Col)`
  text-align: center;
  margin: 2% 0;
`;

// item image styling
const Img = styled.img`
  width: 80%;
`;

// item text styling
const About = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.5em;
  text-align: left;
  padding: 5%;
  @media only screen and (min-width: ${Sizes.md}px) {
    border-bottom: solid 1px;
  }
  p {
    border-bottom: solid 10px ${({ theme }) => theme.colors.primary};
    padding-bottom: 10%;
  }
`;

// single item page code
export default function Item({ items }) {
  const router = useRouter();
  const route = router.isFallback;
  return (
    <>
      {route && <div>Loading...</div>}
      {!route && (
        <Layout title={items.artist}>
          <Cont fluid>
            <Row noGutters>
              <Col xs={12}>
                <Parallax url="/images/shop.jpg"></Parallax>
                <Block
                  color="whitesmoke"
                  size="5em"
                  stat
                  text={items.artist.toUpperCase()}
                  dir
                  id="9"
                  top="150px"
                  underline
                  overflow="visible"
                />
              </Col>
              <ColImg md={6}>
                <Img src={items.image} alt="vinyl cover" />
              </ColImg>
              <ColImg md={6}>
                <About>
                  <p>
                    Artist: {items.artist}
                    <br />
                    Title: {items.title}
                  </p>
                </About>
              </ColImg>
            </Row>
          </Cont>
        </Layout>
      )}
    </>
  );
}

// create static paths for categories -> find items by category and populate pages

// find items by category and then populate item page
export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const res = await Items.findById(params.item);
    return {
      props: {
        items: JSON.parse(JSON.stringify(res)),
      },
      revalidate: 1,
    };
  } catch (err) {
    console.log(err.message);
  }
}
// create category page paths
export async function getStaticPaths() {
  try {
    await dbConnect();
    const res = await Items.find({});
    const paths = JSON.parse(JSON.stringify(res)).map((e) => ({
      params: { id: e.category, item: e._id },
    }));
    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    console.log(err.message);
  }
}
