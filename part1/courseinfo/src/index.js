import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.name}</h1>

const Content = (props) => {
   return (
      <div>
         {
            props.parts.map(element =>
               <Part key={element.part}
                  part={element.part}
                  exercises={element.exercises} />
            )
         }
      </div>
   );  
}

const Part = (props) => <p>{props.part} || Exercises: {props.exercises}</p>

const Total = (props) => {
   let sum = 0;
   props.parts.forEach(element => sum = sum + element.exercises);
   return (
      <p>
         Total number of exercises {sum}
      </p>
   )
}

const App = () => {
   const course = {
      name: 'Half Stack application development',
      parts: [
         {
            part: 'Fundamentals of React',
            exercises: 10,
         },
         {
            part: 'Using props to pass data',
            exercises: 7,
         },
         {
            part: 'State of a component',
            exercises: 14,
         }
      ]
   };
   return (
      <>
         <Header name={course.name} />
         <Content parts={course.parts} />
         <Total parts={course.parts} />
      </>
   )
}

/*
const DisplayCounter = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) =>
   <button onClick={onClick}>{text}</button>

const App = (props) => {
   const [counter, setCounter] = useState(0);
   const setToValue = (value) => setCounter(value);
   return (
      <div>
         <DisplayCounter counter={counter} />
         <Button onClick={() => setToValue(counter + 1)} text="+1" />
         <Button onClick={() => setToValue(counter - 1)} text="-1" />
         <Button onClick={() => setToValue(0)} text="Reset" />
      </div>
   )
}
*/

ReactDOM.render(<App />, document.getElementById('root'));

