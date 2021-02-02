import logo from './logo.svg';
import './App.css';
import { useStateValue } from './Components/StateProvider';
import Pomodoro from './Components/Pomodoro';
import React, { useState, useEffect } from 'react'

function App() {

  

  const [{state}, dispatch] = useStateValue();
  
  const [header, setHeader] = useState('get ready');
  const [className, setClassName] = useState('initial');

  useEffect(() => {
    const updateDOM = () => {
      switch (state) {
        case 'work': {
          setHeader('work');
          setClassName('work');
          break;
        }
        case 'rest': {
          setHeader('Take a break');
          setClassName('rest');
          break;
        }
        default: {
          setHeader('Get ready');
          setClassName('initial');
          break;
        }
      }
    }

    updateDOM();
  }, [state])


  return (
    <div className={`App ${className}`}>
     <Pomodoro header={header}></Pomodoro>


    </div>
  );
}

export default App;
