import React from 'react';

const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => {
   const totalExercises = parts.reduce((acc, parts) => acc + parts.exercises, 0);
   return (
      <div>
         {
            parts.map(part => <Part key={part.id} part={part} />)
         }
         <h3>Total of {totalExercises} exercises</h3>
      </div>
   );

}

const Part = ({ part }) =>
   <p>{part.name} || Exercises: {part.exercises}</p>

const Course = ({ course }) => {
   return (
      <div>
         <Header name={course.name} />
         <Content parts={course.parts} />
      </div>
   );
}

export default Course;