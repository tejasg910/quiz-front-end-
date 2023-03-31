import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [data, setData] = useState([])
    const getData = async () => {
        const d = await fetch("http://localhost:5000/getquizzes")

        const { data } = await d.json();
        setData(data)

    }
    useEffect(() => {
        getData()


    }, []);
    return (
        <div>
            {

                data && data.map((item) => {
                    return <div class="card container my-2">
                        <div class="card-header">
                            Quiz
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text">{item.description}</p>
                            <Link to={`/start?quizId=${item._id}`} class="btn btn-success mx-2">Start Quiz</Link>
                            <Link to={`/edit?quizId=${item._id}`} class="btn btn-primary mx-2 ">Edit Quiz</Link>

                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default Home