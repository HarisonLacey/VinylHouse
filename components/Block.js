import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// stretch block component

// stretch block styling
const Stretch = styled.div.attrs(
  ({ move, para, url, bg, attach, overflow, link, theme }) => ({
    width: !move ? "0" : "50%",
    left: !move ? "100%" : "50%",
    op: !move ? "0" : "100%",
    image: url || "none",
    attach: attach || "none",
    pos: !para ? "none" : "center",
    rep: !para ? "none" : "no-repeat",
    size: !para ? "none" : "cover",
    bg: !bg ? "none" : theme.colors.primary,
    overflow: overflow || "hidden",
    bgHover: !link ? "none" : theme.colors.thirdly,
    trans: !link ? "none" : "scale(1.1)",
  })
)`
  height: 300px;
  top: ${({ top }) => top};
  width: ${({ width, dir, stat }) => {
    if (dir) {
      if (!stat) return width;
      else return "50%";
    } else {
      return "50%";
    }
  }}};
  position: absolute;
  margin-left: ${({ dir, left, stat }) => {
    if (!dir) {
      if (!stat) return left;
      else return "50%";
    }
  }}};
  opacity: ${({ op, stat }) => {
    if (!stat) return op;
  }};
  transition: 1s ease, background-color 0s;
  background-color: ${({ bg }) => bg};
  background-image: url(${({ image }) => image});
  background-attachment: ${({ attach }) => attach};
  background-position: ${({ pos }) => pos};
  background-repeat: ${({ rep }) => rep};
  background-size: ${({ size }) => size};
  text-align: center;
  overflow: ${({ overflow }) => overflow};
  :hover {
   background-color: ${({ bgHover }) => bgHover};
    h1 {
      transform: ${({ trans }) => trans};
      border-bottom: ${({ link, theme }) => {
        if (link) return `solid 8px ${theme.colors.primary}`;
      }};
    }
  }
`;

// stretch block text styling
const Text = styled.h1.attrs(({ underline, fancy, theme }) => ({
  underline: !underline ? "none" : "solid 8px wheat",
  fancy: !fancy ? theme.fonts.primary : theme.fonts.secondary,
}))`
  font-family: ${({ fancy }) => fancy};
  margin-top: 100px;
  color: ${({ color }) => color};
  font-weight: bold;
  font-size: ${({ size }) => size};
  display: inline-block;
  border-bottom: ${({ underline }) => underline};
`;

// stretch block code
export default function StretchBlock({
  dir,
  top,
  para,
  url,
  text,
  stat,
  link,
  color,
  size,
  bg,
  attach,
  underline,
  overflow,
  fancy,
}) {
  const [move, setMove] = useState(false);
  const ID = useRef();
  // check whether component is in viewport
  useEffect(() => {
    function inView(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      );
    }
    if (!stat) {
      window.addEventListener("scroll", () => {
        if (inView(ID.current))setMove(true);
        });
    }
  }, [ID, stat]);

  return (
    <>
      {/* if stretch block is a link */}
      {link && (
        <a href={`/${text.toLowerCase()}`}>
          <Stretch
            ref={ID}
            para={para}
            url={url}
            top={top}
            dir={dir}
            move={move}
            stat={stat}
            link={link}
            oveflow={overflow}
            bg={bg}
          >
            {/* stretch block text */}
            <Text color={color} size={size} underline={underline} fancy={fancy}>
              {text}
            </Text>
          </Stretch>
        </a>
      )}
      {/* if stretch block is not a link */}
      {!link && (
        <Stretch
          ref={ID}
          para={para}
          url={url}
          top={top}
          dir={dir}
          move={move}
          stat={stat}
          bg={bg}
          attach={attach}
          underline={underline}
          overflow={overflow}
        >
          {/* stretch block text */}
          <Text color={color} size={size} underline={underline} fancy={fancy}>
            {text}
          </Text>
        </Stretch>
      )}
    </>
  );
}
