import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import './createquiz.css'


const CreateQuiz = () => {
    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [points, setPoints] = useState("");
    const [timeLimit, setTimeLimit] = useState("");


    // handleSubmit function will be defined later
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("clicked ")
        console.log(quizName)
        // send form data to the database
    };
    return (
        <div>
            <h1>Create a New Quiz</h1>
            <form className="container" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="quiztitle" class="form-label">Quiz Title</label>
                    <input value={quizName}
                        onChange={(event) => setQuizName(event.target.value)} type="text" class="form-control" id="quiztitle" />

                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea value={quizDescription}
                        onChange={(event) => setQuizDescription(event.target.value)} type="text" class="form-control" id="description" />

                </div>
                <div class="mb-3">
                    <label for="marks" class="form-label">Marks for each question</label>
                    <input value={points}
                        onChange={(event) => setPoints(event.target.value)} type="text" class="form-control" id="marks" />

                </div>
                <div class="mb-3">
                    <label for="limit" class="form-label">Time limit</label>
                    <input value={timeLimit}
                        onChange={(event) => setTimeLimit(event.target.value)} type="text" class="form-control" id="limit" />

                </div>
                <button className="btn btn-primary " type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateQuiz