import React, { useEffect, useRef, useState } from "react";

import './createquiz.css'
    ;
import { Toast } from 'bootstrap';


const CreateQuiz = () => {
    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [points, setPoints] = useState("");
    const [timeLimit, setTimeLimit] = useState("");
    const ref = useRef(null)

    // handleSubmit function will be defined later
    const handleSubmit = async (event) => {
        event.preventDefault();

        const toastEl = ref.current;
        // title, description, marks, limit


        const data = {
            title: quizName,
            description: quizDescription,
            marks: points,
            limit: timeLimit,
        };

        try {
            const response = await fetch('http://localhost:5000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }



            const responseData = await response.json();

            if (toastEl) {
                const toastInstance = new Toast(toastEl);
                toastInstance.show();
            }

        } catch (error) {
            console.error('Error:', error);
        }


        // send form data to the database
    };
    return (
        <div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div ref={ref} id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">

                        <strong class="me-auto">Quiz app
                        </strong>
                        <small>0 mins ago</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Quiz added successfully!
                    </div>
                </div>
            </div>

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