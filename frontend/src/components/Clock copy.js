import React, { useState, useEffect } from 'react';

function Clock(props) {
    const [value,setValue] = useState(props.value)
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    
    useEffect(() => {
        const interval = setInterval(() =>{
            setTime(new Date().toLocaleTimeString()), 1000);
            setValue(value +1);
        }
            );
        return () => { clearInterval(interval); }
    }, [value,time]);
    
    return <p>current value at {time}  is : {value}.
    Original value was {props.value}</p>
}

export default Clock;