import styled from "styled-components";
import { useState, useEffect } from "react";

// slider component

// slider component styling
const SlideContainer = styled.div`
  text-align: center;
`;

// slider icon block styling
const IconBlock = styled.div`
  position: absolute;
  top: 45%;
  cursor: pointer;
  z-index: 2;
  padding: 1.5%;
  border-radius: 5%;
  :hover {
    background-color: rgb(245, 245, 245, 0.6);
  }
`;

// left icon styling
const IconBlockLeft = styled(IconBlock)`
  left: 3%;
`;

// right icon styling
const IconBlockRight = styled(IconBlock)`
  right: 3%;
`;

// slider icon styling
const Icon = styled.img`
  transition: 0.5s;
  :hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
`;

// slider images
const Img = styled.img`
  width: 80%;
  z-index: 1;
  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

// slider text
const SlideText = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  background-color: rgba(245, 245, 245, 0.5);
  padding: 1%;
  font-weight: bold;
  text-align: center;
  position: absolute;
  bottom: 2%;
  left: 30%;
  right: 30%;
  h3 {
    border-bottom: solid 5px ${({ theme }) => theme.colors.primary};
  }
`;

// slider code
export default function Slide({ items }) {
  const [counter, setCounter] = useState(0);
  return (
    <SlideContainer>
      <IconBlockLeft>
        <Icon
          alt="left arrow"
          onClick={() => {
            if (counter !== 0) {
              setCounter(counter - 1);
            }
          }}
          src="/images/left.png"
        />
      </IconBlockLeft>
      <a
        href={`/${encodeURIComponent(
          items[counter].category
        )}/${encodeURIComponent(items[counter]._id)}`}
      >
        <Img id="slide" src={items[counter].image} />
      </a>
      <SlideText>
        <h3>{items[counter].artist}</h3>
        <h4>{items[counter].title}</h4>
      </SlideText>
      <IconBlockRight>
        <Icon
          alt="right arrow"
          onClick={() => {
            if (counter !== items.length - 1) {
              setCounter(counter + 1);
            }
          }}
          src="/images/right.png"
        />
      </IconBlockRight>
    </SlideContainer>
  );
}
