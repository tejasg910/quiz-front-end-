import React, { useEffect, useRef, useState } from 'react'



import { Link, useLocation, useNavigate } from 'react-router-dom';
import CountDown from './CountDown';
import ResultModel from './resultModel';
import "./start.css"
const StartQuiz = () => {
    const [next, setNext] = useState(0);
    const [previous, setPrevious] = useState(0)
    const location = useLocation();
    const [data, setData] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [options, setOptions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [selectedOptionId, setselectedOptionId] = useState("");
    const [result, setResult] = useState({});
    const [timeLimit, setTimeLimit] = useState(15);
    const [times, setTime] = useState(0);
    const [timeUp, setTimeUP] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const getData = async () => {
        const quizId = new URLSearchParams(location.search).get('quizId');
        const res = await fetch(`http://localhost:5000/getquizquestions?quizId=${quizId}`)
        const { data, time } = await res.json()

        setData(data)
        setOptions(data[currentQuestion].options)

        setTimeLimit(time)
    }

    const handleNext = () => {

        if (next < data.length - 1) {
            setTimeLeft(timeLimit)
            setNext(next + 1);
            setCurrentQuestion(currentQuestion + 1)
            setOptions(data[next + 1].options)
            if (selectedAnswer !== "" && selectedOptionId !== "") {


                const existingData = JSON.parse(localStorage.getItem("quiz_")) || [];

                const existingOption = existingData.find((item, index) => {
                    return item._id === selectedOptionId
                })

                if (!existingOption) {

                    existingData.push({
                        selectedAnswer, selectedOptionId

                    });
                    localStorage.setItem("quiz_", JSON.stringify(existingData));
                }
            }
        }

    }

    const handlePrev = () => {

        if (next > 0) {

            setTimeLeft(timeLimit)
            setNext(next - 1);
            setCurrentQuestion(currentQuestion - 1)
            setOptions(data[next - 1].options)


        }
    }

    const startTime = () => {
        const TimeLimit = Date.now() + 60 * 1000 * timeLimit;
        setInterval(() => {

        }, TimeLimit);
    }

    useEffect(() => {

        getData()
        startTime();
        return () => {
            localStorage.clear("quiz_")
        }
    }, [])
    const handelSelect = (optionId, selectedAns) => {

        setSelectedAnswer(selectedAns)
        setselectedOptionId(optionId)
    }
    const handelSubmit = async () => {
        if (selectedAnswer !== "" && selectedOptionId !== "") {


            const existingData = JSON.parse(localStorage.getItem("quiz_")) || [];

            const existingOption = existingData.find((item, index) => {
                return item._id === selectedOptionId
            })

            if (!existingOption) {

                existingData.push({
                    selectedAnswer, selectedOptionId

                });
                localStorage.setItem("quiz_", JSON.stringify(existingData));
            }
        }
        const data = JSON.parse(localStorage.getItem("quiz_")) || []
        const submission = Object.values(data.reduce((tempObj, item) => {
            tempObj[JSON.stringify(item)] = item;
            return tempObj;
        }, {}));



        const quizId = new URLSearchParams(location.search).get('quizId');
        const response = await fetch(`http://localhost:5000/submitquiz?quizId=${quizId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ submission }),
        });


        const res = await response.json();
        if (res.success) {
            setResult(res.score)

            modalRef.current.show();
            navigate('/', { replace: true });
        }


    }

    const timeOut = () => {
        handelSubmit()
    }
    return (

        <div>

            <ResultModel modalRef={modalRef} result={result} />
            <div className='container-box'>
                <div class="card container ">
                    <div class="card-header d-flex justify-content-between">
                        <div>
                            Question:  {currentQuestion + 1}
                        </div>
                        <CountDown handelSubmit={handelSubmit} data={data} timeLeft={timeLeft} setTimeLeft={setTimeLeft} duration={timeLimit} current={currentQuestion} submit={handleNext} />

                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{data[currentQuestion] && (
                            <h3>{data[currentQuestion].title}</h3>
                        )}</h5>

                        <hr />
                        <div>

                            {

                                options && options.map((item) => {


                                    return <div key={item._id} class="form-check">

                                        <input onClick={() => { handelSelect(item._id, item.option) }} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            {item.option}
                                        </label>
                                    </div>
                                })
                            }
                        </div>


                    </div>
                </div>





            </div>
            <div className='d-flex m-4'>

                {next > 0 ? <button onClick={handlePrev} className='btn w-auto btn-primary mx-2 '>Prev</button> : null}
                {next < data.length - 1 ? <button onClick={handleNext} className='btn btn-primary mx-2'>Next</button> : <Link to={"/"} type="button" class="btn  btn-primary mx-4" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={modalRef} onClick={handelSubmit}>
                    Submit
                </Link>}
            </div>

        </div>
    )
}

export default StartQuiz