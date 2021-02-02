import React, {useState, useEffect, useRef} from 'react'
import './pomodoro.css'
import { useStateValue } from './StateProvider';


function Pomodoro({header}) {
    



    const [{state, rounds}, dispatch]=useStateValue();
   
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const audio = document.getElementById('beep');
    
    
    const minutesRef = useRef(minutes);
    const secondsRef = useRef(seconds);
    const next = () => {
    
        let newState;
        if (state === 'work') {
          newState = 'rest';
          dispatch({type: 'DEC_ROUNDS'})
        }
        else
          if (state === 'rest') {
            if (rounds !== 0) {
              newState = 'work'
            }
          }
        audio.play(); 
        dispatch({ type: 'SET_STATE', state: newState });
        
        
        console.log('did next');
      }
    useEffect(() => {
        
        const countDown = () => {
            if (secondsRef.current > 0) {
                setMinutes(minutesRef.current);
                setSeconds(secondsRef.current-1);
            }
            if (secondsRef.current === 0) {
                if (minutesRef.current === 0) {
                    clearInterval(interval);
                    if(state!=='initial'){ next();};   
                } else {
                    setMinutes(minutesRef.current-1);
                    setSeconds(59);
                }
            }
        }

        const updateTimer = () => {
            if(rounds!==0){
                if(state==='work'){
                    setMinutes(25);
                    setSeconds(0);
                }
                if(state==='rest'){
                    setMinutes(5);
                    setSeconds(0);
                }
            }   else {
                setMinutes(0);
                setSeconds(0);
            }
        }

        updateTimer();  
         var interval = setInterval(countDown, 1000);
         return () => {clearInterval(interval)}

    }, [state]);

    useEffect(()=>{
        minutesRef.current = minutes;
        secondsRef.current = seconds;
    }, [minutes, seconds]);

    const onStartClick = () => { dispatch({ type: 'SET_STATE', state: 'work' })}
    const onRepeatClick = () => {dispatch({ type: 'RESTART'})};

    return (
        <>
        <audio
           
          id="beep"
          preload="auto"
          
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        {rounds === 0 ?
            <div className="container repeat">
            <h3 className="header">Great job! Want to repeat?</h3>
              <button onClick={onRepeatClick}>repeat</button>
            </div> :
            <div className="container">
              <h3 className="header">{header}</h3>
              <div className="tomato-container">
        <div className="tomato-top">
            <div className="tomato-leaf">
            </div>
            <div className="tomato-leaf">
            </div>
            <div className="tomato-leaf">
            </div>  
            
        </div>
        <div className="tomato">
           <div className="number-container">{minutes<10? `0${minutes}`: minutes}</div>
           <span className="tomato-colon">:</span>
           <div className="number-container">{seconds<10? `0${seconds}`: seconds}</div>
           
       </div>
       <p className="tomato-rounds">{rounds} Rounds left</p>
       
        </div>
              {state === 'initial' && <button onClick={onStartClick}>Start</button>}
              {state !== 'initial' && <button onClick={next}>Next</button>}
    
            </div>}
        
        </>
        
    )
}

export default Pomodoro
