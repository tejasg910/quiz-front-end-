import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const AllQuestions = ({ setKey, key }) => {
    const [data, setData] = useState([])
    const location = useLocation();

    const getData = async () => {
        const quizId = new URLSearchParams(location.search).get('quizId');
        const d = await fetch(`http://localhost:5000/getallquestions?quizId=${quizId}`)

        const { data } = await d.json();
        setData(data)

    }

    const handelDelete = async (questionIndex) => {
        const quizId = new URLSearchParams(location.search).get('quizId');
        const response = await fetch(`http://localhost:5000/deletequestion?quizId=${quizId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questionIndex }),
        });
        const data = await response.json();
        getData()
    }
    useEffect(() => {

        getData()
    }, [key]);

    return (

        data && data.map((items, index) => {

            return <div className='d-flex justify-content-center align-items-center'>

                <div key={items._id} class="card w-100 mx-2 my-2">
                    <div class="card-body">
                        {items.title}
                    </div>
                </div>
                <div>
                    <button onClick={() => handelDelete(index)} className='btn mx-2 btn-danger'>-</button>
                </div>
            </div>
        })
    )
}

export default AllQuestions