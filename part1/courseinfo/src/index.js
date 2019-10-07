import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
   return (
      <h1>{props.course}</h1>
   );
}

const Content = (props) => {
   return (
      <div>
         {
            props.parts.map(element => {
            return(
               <Part key={element.part} part={element.part} exercises={element.exercises}/>
            )})
         }
      </div>
   );
}

const Part = (props) => {
   return (
      <p>{props.part} || Exercises: {props.exercises}</p>
   )
}

const Total = (props) => {
   var sum = 0;
   props.exercises.map(function (element) {
      sum = sum + element;
      return sum;
   });
   return (
      <p>
         Total number of exercises {sum}
      </p>
   )
}

const App = () => {
   const course = 'Half Stack application development'
   const parts = [
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
   ];
   const exercises = [10, 7, 14];

   return (
      <>
         <Header course={course} />
         <Content parts={parts} />
         <Total exercises={exercises} />
    </>
   )
}

ReactDOM.render(<App />, document.getElementById('root'))
