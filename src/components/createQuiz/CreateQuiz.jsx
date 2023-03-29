import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import './createquiz.css'


const CreateQuiz = () => {
    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [points, setPoints] = useState("");
    const [timeLimit, setTimeLimit] = useState("");
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {

    }, []);
    // handleSubmit function will be defined later
    const handleSubmit = (event) => {
        event.preventDefault();


        // send form data to the database
    };
    return (
        <div>
            <h1>Create a New Quiz</h1>
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                    <Col md={6}>

                        <Form.Group className="my-4" controlId="formQuizName">
                            <div className="form-label" >Quiz Name</div>
                            <Form.Control
                                type="text"
                                placeholder="Enter quiz name"
                                value={quizName}
                                onChange={(event) => setQuizName(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="my-4" controlId="formQuizDescription">
                            <div className="form-label" >Quiz Description</div>
                            <Form.Control
                                type="text"
                                placeholder="Enter quiz description"
                                value={quizDescription}
                                onChange={(event) => setQuizDescription(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="my-4" controlId="formPoints">
                            <div className="form-label">Points/Grading System</div>
                            <Form.Control
                                type="text"
                                placeholder="Enter points/grading system"
                                value={points}
                                onChange={(event) => setPoints(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="my-4" controlId="formTimeLimit">
                            <div className="form-label">Time Limit</div>
                            <Form.Control
                                type="text"
                                placeholder="Enter time limit in minutes"
                                value={timeLimit}
                                onChange={(event) => setTimeLimit(event.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create Quiz
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default CreateQuiz