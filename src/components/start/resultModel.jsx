import React from 'react'
import { useNavigate } from 'react-router-dom';

const ResultModel = ({ modalRef, result }) => {
    const navigate = useNavigate()
    const handelDone = () => {
        navigate('/', { replace: true });

    }
    return (
        <div class="modal fade" ref={modalRef} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <strong>Total Marks:</strong> {result.totalMarks}
                        </div>
                        <div>
                            <strong>Obtained Marks:</strong> {result.marksObtained}
                        </div>


                    </div>
                    <div class="modal-footer">

                        <button onClick={handelDone} type="button" data-bs-dismiss="modal" class="btn btn-primary">Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultModel