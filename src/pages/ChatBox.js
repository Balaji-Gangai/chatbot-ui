import React, { useState, useRef } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import '../App.css';

let msgTyped = false;
const arr = [];
const ChatBox = () => {
    const inputRef = useRef(null);
    const socket = new WebSocket("wss://111mamf5gb.execute-api.eu-west-1.amazonaws.com/prod")
    const [inputMsg, typedMsg] = useState('');
    const [data, setData] = useState([]);

    const resObj = {}
    // Connection opened
    socket.addEventListener("open", event => {
        if (inputMsg !== '' && msgTyped) {
            socket.send(inputMsg);
            msgTyped = false;
        }

    });

    // Listen for messages
    socket.addEventListener("message", event => {

        if (JSON.parse(event.data).statusCode === 200) {
            console.log("Message from server ", JSON.parse(event.data))
            setData(JSON.parse(event.data).body);
            resObj["ip"] = inputMsg;
            resObj["op"] = JSON.parse(event.data).body;
            arr.push(resObj)
            console.log(arr)
        }
    });

    const handleKeyEvent = (event) => {
        msgTyped = true;
        typedMsg(inputRef.current.value);
    }

    return (
        <Container fluid={true}>
            <Form>
                <Row>
                    <div className="mb-1">
                        
                    </div>
                </Row>
                <Row className='g-0'>
                    <Col sm={3} className='pt-0' style={{ borderRadius:'10px'}}>
                        <div className="mb-2 rounded" style={{ height: '650px' }}></div>
                    </Col>
                    <Col sm={9} className='bg-color-chatbox' style={{ borderRadius:'10px'}}>
                        <div className="mb-2 rounded display-center-text" style={{ height: '650px'}}>
                            <div className="mt-4 d-flex bd-highlight">
                                <div className="p-2 flex-grow-1 bd-highlight"></div>
                            </div>
                            {arr.length === 0 ? (<div style={{fontSize:'22px'}}>How can i help you ?</div>) : (
                                <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                                    {arr.map((list) => (
                                        <div key={list.ip} className="p-2">
                                            <Row className='g-0 pt-0'><Col sm={1}></Col><Col className='mb-2 chat_ip text-end' sm={10}><div className='chat-input'>{list.ip}</div></Col><Col sm={1} className='d-flex justify-content-center mt-1'><div className='dot_you'>US</div></Col></Row>
                                            <Row className='g-0'><Col sm={1} className='d-flex justify-content-center'><div className='dot_mvp'>AI</div></Col><Col sm={10}><div className='chat-output'>{list.op}</div></Col></Row>
                                        </div>
                                    ))}
                                </div>
                            )}


                        </div>
                    </Col>
                </Row>
                <Row className='mt-2 mb-1 fixed-bottom'><Col sm={3}></Col><Col className="me-0" sm={9}>
                    <InputGroup className="mb-3">
                        <Form.Control ref={inputRef} placeholder="Ask me here.." aria-label="Recipient's username" />
                        <Button variant="outline-secondary" onClick={handleKeyEvent} id="button-addon2">
                            Submit Query
                        </Button>
                    </InputGroup>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default ChatBox;