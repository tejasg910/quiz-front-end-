import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const AddQuestionsModel = ({ setKey, getData }) => {
    const [inputCount, setInputCount] = useState(1);
    const [options, setOptions] = useState([""]);
    const [title, setTitle] = useState("");
    const [answer, setAnswer] = useState("");
    const location = useLocation();
    const handleAddInput = () => {
        setInputCount(inputCount + 1);
        setOptions((prevOptions) => [...prevOptions, ""]);
    };
    const handleDeleteInput = (index) => {
        if (inputCount > 0) {
            setInputCount(inputCount - 1);
            setOptions((prevOptions) =>
                prevOptions.filter((option, i) => i !== index)
            );
        }
    };
    const saveChanges = async () => {

        const quizId = new URLSearchParams(location.search).get('quizId');
        const response = await fetch(`http://localhost:5000/addquestion?quizId=${quizId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ options, title, answer }),
        });
        const data = await response.json();

        setKey(Math.random())


        setTitle("")
        setOptions([""])
        setAnswer("")

    }

    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">


                        <div class="mb-3">
                            <label for="questionTitle" class="form-label">Question</label>
                            <input onChange={(e) => { setTitle(e.target.value) }} name="title" value={title} type="text" class="form-control" id="questionTitle" />

                        </div>
                        <hr />
                        <div>
                            <label for="questionTitle" class="form-label">Options</label>

                            {[...Array(inputCount)].map((_, index) => (
                                <div>
                                    <input onChange={(e) => {
                                        const newOptions = [...options];
                                        newOptions[index] = e.target.value;
                                        setOptions(newOptions);
                                    }} value={options[index]} key={index} className=" my-2 form-control d-inline w-75" type="text" />
                                    <button className='btn btn-danger mx-2' onClick={() => { handleDeleteInput(index) }}>delete</button>
                                </div>

                            ))}
                            <button className='btn btn-primary' onClick={handleAddInput}>Add Input</button>
                        </div>


                        <div class="mb-3">
                            <label for="answer" class="form-label">Answer</label>
                            <input onChange={(e) => { setAnswer(e.target.value) }} name="answer" value={answer} type="text" class="form-control" id="answer" />

                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={saveChanges} type="button" data-bs-dismiss="modal" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddQuestionsModel