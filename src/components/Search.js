import React, { useState } from "react";
import axios from "../api/axios";
import copy from "../copy";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Spinner } from "react-bootstrap";
import "../Search.css";

//react-bootstrap and bootstrap

const HTTP_URL_VALIDATOR_REGEX =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g;

function Search() {
  const [text, setText] = useState("");
  const [short, setShort] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkLink(text)) {
      getLink();
      setText("");
      setLoading(!isLoading);
      document.getElementById("header").innerText = text.toUpperCase();
    } else {
      document.getElementById("header").innerText = "Invalid URL - Try Again";
    }
  };

  const checkLink = (string) => {
    return string.match(HTTP_URL_VALIDATOR_REGEX); // Regex to check if string is a valid URL
  };

  const getLink = async () => {
    try {
      const response = await axios("shorten?url=" + text);
      setShort(response.data.result.short_link);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 id="header">Shorten a Link!</h1>

      <Form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-floating mb-3">
          <input
            autoFocus
            className="form-control"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="ex: google.com"
          />
          <label for="floatingInput">
            Enter A Link Here: (i.e. Google.com)
          </label>
        </div>
        <Button onClick={(e) => handleSubmit(e)}>Shorten</Button>
      </Form>

      {isLoading && <Spinner animation="border" />}

      <div style={{ marginBottom: "30px" }}>
        <a
          href={"https://" + short}
          id="copy"
          style={{ fontSize: "30px" }}
          target="_blank"
          rel="noreferrer"
        >
          {short}
        </a>{" "}
        <br></br>
      </div>
      {short !== "" && (
        <Button onClick={copy()} variant="primary">
          Copy Link to Clipboard
        </Button>
      )}
    </div>
  );
}

export default Search;
