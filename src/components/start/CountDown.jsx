
import React, { useState, useEffect } from 'react';

const CountDown = ({ duration = 15, submit, current, data, handelSubmit, timeLeft, setTimeLeft }) => {


    const [intervalId, setIntervalId] = useState(null);










    useEffect(() => {
        // Clear the previous interval if it exists
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Create a new interval
        const id = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        setIntervalId(id);

        // Clear the interval when the component unmounts
        return () => clearInterval(id);
    }, [current]);

    useEffect(() => {
        if (timeLeft <= 0) {
            setTimeLeft(duration);
            console.log(timeLeft)
            submit();

            if (data.length - 1 === current) {

                handelSubmit()
            }
        }


    }, [timeLeft, duration, submit, current]);


    return <div>Time Left: {timeLeft} seconds</div>;
};

export default CountDown;
