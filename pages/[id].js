import Items from "../models/items";
import dbConnect from "../util/mongodb";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Block from "../components/Block";

// category pages

// column styling
const Column = styled(Col)`
  background-color: white;
  margin: 2% 0;
`;

// container styling
const Cont = styled(Container)`
  padding: 0;
  overflow: hidden;
`;

// item card styling
const ItemCard = styled.div`
  border: solid 1px lightgrey;
  overflow: hidden;
  text-align: center;
  margin: 2%;
  img {
    width: 100%;
  }
  img:hover {
    transform: scale(1.2);
  }
`;

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

// item card text styling
const ThumbnailText = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  background-color: rgba(245, 245, 245, 0.5);
  padding: 1%;
  text-align: center;
  position: absolute;
  bottom: 2%;
  left: 30%;
  right: 30%;
  p {
    color: black;
    margin: 0;
  }
  p:first-of-type {
    border-bottom: solid 5px ${({ theme }) => theme.colors.primary};
  }
`;

// category pages code
export default function Category({ items, text }) {
  const router = useRouter();
  const route = router.isFallback;
  const capital = (t) => {
    let first = t.charAt(0).toUpperCase();
    let last = t.slice(1);
    return first + last;
  };
  return (
    <>
      {route && <div>Loading...</div>}
      {!route && (
        <Layout title={capital(text)}>
          <Cont fluid>
            <Row noGutters>
              <Col xs={12}>
                <Parallax url="/images/shop.jpg"></Parallax>
                <Block
                  color="whitesmoke"
                  size="5em"
                  stat
                  text={text.toUpperCase()}
                  dir
                  id="8"
                  top="150px"
                  underline
                  overflow="visible"
                />
              </Col>
              <Column xs={12}>
                <Row noGutters>
                  {items.map((e) => {
                    return (
                      <Col key={e._id} xs={6} lg={4}>
                        <Link
                          href={`/${encodeURIComponent(
                            e.category
                          )}/${encodeURIComponent(e._id)}`}
                        >
                          <a>
                            <ItemCard>
                              <img src={e.image} alt="vinyl cover" />
                              <ThumbnailText>
                                <p>{e.artist}</p>
                                <p>{e.title}</p>
                              </ThumbnailText>
                            </ItemCard>
                          </a>
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </Column>
            </Row>
          </Cont>
        </Layout>
      )}
    </>
  );
}

// create static paths for single items -> find item by id and populate page

// find items by category and then populate category pages
export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const res = await Items.find({ category: params.id });
    return {
      props: {
        items: JSON.parse(JSON.stringify(res)),
        text: params.id,
      },
      revalidate: 1,
    };
  } catch (err) {
    console.log(err.message);
  }
}
// create all the category page paths
export async function getStaticPaths() {
  try {
    await dbConnect();
    const res = await Items.find({});
    let categories = [];
    await JSON.parse(JSON.stringify(res)).forEach((e) => {
      if (!categories.includes(e.category)) categories.push(e.category);
    });
    const paths = categories.map((e) => ({
      params: { id: e },
    }));
    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    console.log(err.message);
  }
}
