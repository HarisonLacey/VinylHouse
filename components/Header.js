import { useState, useEffect } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import { Sizes } from "./Sizes";
import Link from "next/link";
import { useRouter } from "next/router";

// header component

// header styling
const Head = styled.div.attrs(({ move }) => ({
  height: !move ? "100px" : "60px",
  op: !move ? "100%" : "95%",
  pad: !move ? "1.5em 0 0 1%" : "0.9em 0 0 1%",
  border: !move ? "none" : "solid 1px",
}))`
  background-color: white;
  position: fixed;
  height: ${({ height }) => height};
  width: 100%;
  opacity: ${({ op }) => op};
  z-index: 4;
  padding: ${({ pad }) => pad};
  transition: 0.5s;
  border-bottom: ${({ border }) => border};
`;

// menu icon styling
const Icon = styled.img.attrs(({ show }) => ({
  margin_one: !show ? "0" : "36%",
  margin_two: !show ? "0" : "43%",
}))`
  cursor: pointer;
  @media only screen and (max-width: ${Sizes.lg}px) {
    margin-left: ${({ margin_two }) => margin_two};
  }
  margin-left: ${({ margin_one }) => margin_one};
  transition: 0.5s ease;
`;

// menu styling
const MenuItem = styled.div`
  cursor: pointer;
  height: 60px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.2em;
  display: flex;
  padding-left: 2%;
  align-items: center;
  p, a {
    pointer-events: none;
  }
  a {
    color: black;
    }
  }
  :hover {
    background-color: black;
    p, a {
      color: ${({ theme }) => theme.colors.thirdly};
    }
  }
`;

// hr menu item styling
const HR = styled.hr`
  width: 0;
  border-top: solid 5px ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

// header title styling
const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.secondary};
  position: absolute;
  right: 2%;
  top: 2%;
  display: inline-block;
`;

// header code
export default function Header({ home }) {
  const [move, setMove] = useState(false);
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("/images/menu.png");
  const [items, setItems] = useState("");
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 0) setMove(true);
      else setMove(false);
    });
    // hr expand if mouse over menu item
    window.addEventListener("mouseover", (e) => {
      if (!e.target.className.includes("menuItems")) {
        let items = document.getElementsByClassName("menuItems");
        for (let el of items) {
          el.nextElementSibling.style.width = "0";
        }
      } else if (e.target.className.includes("menuItems")) {
        if (e.target.previousElementSibling !== null)
          e.target.previousElementSibling.style.width = "0";
        if (e.target.nextElementSibling.nextElementSibling !== null)
          e.target.nextElementSibling.nextElementSibling.nextElementSibling.style.width =
            "0";
        let i = 10;
        setInterval(() => {
          if (i <= 50) {
            e.target.nextElementSibling.style.width = `${i}%`;
            i += 10;
          }
        }, 30);
      }
    });
    // map menu items
    const menuItems = () => {
      let hitems = ["About", "Categories", "Contact"];
      let oitems = ["Home", "Back"];
      if (home) {
        let item = hitems.map((e) => {
          return (
            <>
              <MenuItem
                className="menuItems"
                onClick={() => {
                  document.getElementById(e).scrollIntoView();
                  setShow(false);
                  setSrc("/images/menu.png");
                }}
                key={e}
              >
                <p className="itemText">{e.toUpperCase()}</p>
              </MenuItem>
              <HR></HR>
            </>
          );
        });
        setItems(item);
      } else {
        let item = oitems.map((e) => {
          if (e === "Home")
            return (
              <>
                <MenuItem
                  onClick={() => router.push("/")}
                  className="menuItems"
                  key={e}
                >
                  <p className="itemText">{e.toUpperCase()}</p>
                </MenuItem>
                <HR></HR>
              </>
            );
          else
            return (
              <>
                <MenuItem
                  onClick={() => router.back()}
                  className="menuItems"
                  key={e}
                >
                  <p className="itemText">{e.toUpperCase()}</p>
                </MenuItem>
                <HR></HR>
              </>
            );
        });
        setItems(item);
      }
    };
    menuItems();
  }, []);
  return (
    <>
      <Head move={move}>
        <Icon
          show={show}
          src={src}
          alt="menu icon"
          onClick={() => {
            if (!show) {
              setShow(true);
              setSrc("/images/close.png");
            } else {
              setShow(false);
              setSrc("/images/menu.png");
            }
          }}
        />
        <Title>VinylHouse</Title>
      </Head>
      <Menu show={show} move={move} items={items} />
    </>
  );
}
