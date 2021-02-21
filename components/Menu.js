import styled from "styled-components";
import { Sizes } from "./Sizes";

// menu component

// menu styling
const MenuShow = styled.div.attrs(({ show, move }) => ({
  width_one: !show ? "0" : "40%",
  width_two: !show ? "0" : "50%",
  top: !move ? "100px" : "60px",
  op: !show ? "0" : "98%",
}))`
  @media only screen and (max-width: ${Sizes.lg}px) {
    width: ${({ width_two }) => width_two};
  }
  width: ${({ width_one }) => width_one};
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 100%;
  transition: 0.5s ease;
  position: fixed;
  opacity: ${({ op }) => op};
  z-index: 3;
  top: ${({ top }) => top};
`;

// menu code
export default function Menu({ show, move, items }) {
  return (
    <MenuShow id="menu" show={show} move={move}>
      {items}
    </MenuShow>
  );
}
