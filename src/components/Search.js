import React, {useState} from "react";
import axios from "../api/axios";
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Form, Spinner} from "react-bootstrap"
import "../Search.css"

//react-bootstrap and bootstrap

const HTTP_URL_VALIDATOR_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

function Search() {

    const [text, setText] = useState("");
    const [short, setShort] = useState("");   
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(checkLink(text)){
            getLink();
            setText("")
            setLoading(!isLoading)
        }
    }

    const checkLink = (string) => {
        // Regex to check if string is a valid URL
        return string.match(HTTP_URL_VALIDATOR_REGEX);
      };

    const getLink = async () => {
        await axios
        .get('shorten?url=' + text)
        .then((response) => {
            setShort(response.data.result.short_link);
            setLoading(false);
        }).catch((error) => {
            console.error(error)
        });

        }
    
    return(
    <div className="container">

        <h1>Shorten a Link!</h1>

        <Form className="form" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group style={{marginBottom: "30px"}} className="md-3">
                <Form.Control value={text} onChange={(e) => {setText(e.target.value)}} placeholder="ex: google.com"/>
                <Form.Text>Type in a URL to Shorten</Form.Text>
            </Form.Group>
            <Button onClick={(e) => handleSubmit(e)}>
                Shorten
            </Button>
        </Form>

        {isLoading && <Spinner animation="border" />}
        
        <a href={"https://" + short} style={{fontSize: "30px"}}target="_blank" rel="noreferrer">{short}</a>

        
    </div>)
}

export default Search;
