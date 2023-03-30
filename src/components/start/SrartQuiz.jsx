import React, { useEffect, useState } from 'react'
import { isCompositeComponent } from 'react-dom/test-utils';
import { useAsyncError, useLocation } from 'react-router-dom';
import "./start.css"
const StartQuiz = () => {
    const [next, setNext] = useState(0);
    const [previous, setPrevious] = useState(0)
    const location = useLocation();
    const [data, setData] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [options, setOptions] = useState([]);
    const getData = async () => {
        const quizId = new URLSearchParams(location.search).get('quizId');
        const res = await fetch(`http://localhost:5000/getquizquestions?quizId=${quizId}`)
        const { data } = await res.json()
        console.log(data[currentQuestion])
        setData(data)
        setOptions(data[currentQuestion].options)

    }

    const handleNext = () => {

        console.log(data[currentQuestion])
        if (next < data.length - 1) {

            setNext(next + 1);
            setCurrentQuestion(currentQuestion + 1)
            setOptions(data[currentQuestion].options)
        }

    }

    const handlePrev = () => {
        if (next > 0) {


            setNext(next - 1);
            setCurrentQuestion(currentQuestion - 1)
            setOptions(data[currentQuestion].options)
        }
    }



    useEffect(() => {

        getData()
    }, [])


    return (
        <div>



            <div className='container  d-flex flex-column  align-items-center '>
                <div className='container-box'>


                    <div>
                        {data[currentQuestion] && (
                            <h3>{data[currentQuestion].title}</h3>
                        )}
                    </div>
                    <div>


                        {

                            options && options.map((item) => {


                                return <div key={item._id} class="form-check">

                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        {item.option}
                                    </label>
                                </div>
                            })
                        }

                    </div>
                </div>

            </div>

            <div className='d-flex m-4'>

                <button onClick={handlePrev} className='btn btn-primary mx-2'>Prev</button>
                {next < data.length - 1 ? <button onClick={handleNext} className='btn btn-primary mx-2'>Next</button> : <button onClick={handleNext} className='btn btn-primary mx-2'>Submit</button>}
            </div>

        </div>
    )
}

export default StartQuiz