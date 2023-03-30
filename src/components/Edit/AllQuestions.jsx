import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const AllQuestions = ({ setKey }) => {
    const [data, setData] = useState([])
    const location = useLocation();
    const getData = async () => {
        const quizId = new URLSearchParams(location.search).get('quizId');
        const d = await fetch(`http://localhost:5000/getallquestions?quizId=${quizId}`)

        const { data } = await d.json();
        setData(data)
        setKey(Math.random())
        console.log(data, "from questions")
    }
    useEffect(() => {
        getData()
    }, []);

    return (

        data && data.map((items) => {

            return <div class="card">
                <div class="card-body">
                    {items.title}
                </div>
            </div>
        })
    )
}

export default AllQuestions