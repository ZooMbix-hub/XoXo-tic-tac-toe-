import React, { useEffect, useState } from 'react';

const Timer = ({seconds, setSeconds, minutes, setMinutes, timer, newTimer, setNewTimer}) => {
    const [isActive, setIsActive] = useState(false);

    function toggle() {
      setIsActive(!isActive);
    }

    useEffect(() => {
        setSeconds(0);
        setMinutes(0);
        setIsActive(false);
        setNewTimer(false);
    }, [newTimer])
  
    useEffect(() => {
        let interval = null;
        if (timer) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                if (seconds === 59) {
                    setMinutes(minutes => minutes + 1);
                    setSeconds(0);
                }
            }, 1000);
        } else if (!timer && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer, seconds]);
    

    return (
        <div className='display-timer' onClick={() => toggle()}>
            <span>{(minutes >= 10) ? minutes : "0" + minutes + ':'}</span>
            <span>{(seconds >= 10) ? seconds : "0" + seconds}</span>
        </div>
    )
}

export default Timer