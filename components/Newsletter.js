import { useState, useEffect } from "react";
const axios = require("axios");
import styled from "styled-components";
import { Sizes } from "../components/Sizes";

// newsletter component

// form styling
const Form = styled.form.attrs(({ show }) => ({
  show: !show ? "none" : "inline-block",
}))`
  position: fixed;
  font-family: ${({ theme }) => theme.fonts.primary};
  text-align: center;
  padding: 3%;
  @media only screen and (max-width: ${Sizes.md}px) {
    width: 90%;
    margin: 0 auto;
  }
  width: 30%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: solid 1px;
  z-index: 7;
  left: 2%;
  right: 2%;
  bottom: 2%;
  display: ${({ show }) => show};
  input,
  p {
    display: block;
    margin: 5% auto;
  }
  p {
    font-size: 1.2em;
  }
  input:focus {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  button {
    background-color: ${({ theme }) => theme.colors.thirdly};
    border: none;
    padding: 2%;
    pointer: cursor;
    width: 50%;
  }
  button:hover {
    background-color: grey;
    color: ${({ theme }) => theme.colors.thirdly};
  }
`;

// form close icon styling
const Close = styled.img`
  position: absolute;
  right: 2%;
  top: 3%;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;

// form title styling
const H2 = styled.h2`
  border-bottom: solid 5px skyblue;
  display: inline-block;
`;

// newsletter code
export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);
  const [close, setClose] = useState(false);
  const [run, setRun] = useState(0);
  // on scroll show newsletter form
  const showNewsletter = () => {
    if (document.documentElement.scrollTop > 200 && !close && run === 0) {
      setShow(true);
      setRun(1);
    } else if (!close && run === 1) setShow(true);
    else setShow(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", showNewsletter);
  }, [close, run]);
  // form submit api call
  const formHandle = async (e) => {
    e.preventDefault();
    setResponse("One moment...");
    try {
      let res = await axios.post("api/newsletter", {
        name: name,
        email: email,
      });
      setResponse(res.data.message);
    } catch (err) {
      console.log(err.message);
      setResponse("Something broke. Please try again!");
    }
  };
  return (
    <div>
      <Form show={show} onSubmit={formHandle}>
        <Close
          src="images/close-button.png"
          onClick={() => {
            setClose(true);
            setShow(false);
          }}
        />
        <H2>Subscribe!</H2>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
          required
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          required
        />
        <button type="submit">Let's Go!</button>
        <p>{response}</p>
      </Form>
    </div>
  );
}
