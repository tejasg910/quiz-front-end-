import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div class="card">
                <div class="card-header">
                    Featured
                </div>
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link to={"/seequiz"} class="btn btn-success mx-2">See Quiz</Link>
                    <Link to={`/edit`} class="btn btn-primary mx-2 ">Edit Quiz</Link>

                </div>
            </div>
        </div>
    )
}

export default Home