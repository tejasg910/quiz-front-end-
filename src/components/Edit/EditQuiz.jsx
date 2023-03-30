import { Toast } from 'bootstrap';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import AddQuestionsModel from './AddQuestionsModel';
import AllQuestions from './AllQuestions';

const EditQuiz = () => {

    const [data, setData] = useState([])
    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [points, setPoints] = useState("");
    const [timeLimit, setTimeLimit] = useState("");
    const ref = useRef(null)
    const [key, setKey] = useState("");
    const location = useLocation();
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


        // send form data to the database
    };

    const getData = async () => {
        const quizId = new URLSearchParams(location.search).get('quizId');
        const d = await fetch(`http://localhost:5000/getquestions?quizId=${quizId}`)

        const { data } = await d.json();
        setData(data)

        setQuizName(data.title);
        setQuizDescription(data.description);
        setPoints(data.marks);
        setTimeLimit(data.limit);

        console.log(data)
    }


    useEffect(() => {
        getData()


    }, []);


    return (
        <div>
            <form className="container" onSubmit={handleSubmit}>



                <AddQuestionsModel setKey={setKey} />

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
                <div>

                    <label for="description" class="form-label">Questions</label>
                    <AllQuestions setKey={setKey} />
                </div>
                <button type="button" class="btn my-2 btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Question
                </button>

            </form>
        </div>
    )
}

export default EditQuiz