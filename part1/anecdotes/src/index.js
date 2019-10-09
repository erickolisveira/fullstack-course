import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const DisplayTitle = props => <h2>{props.text}</h2>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const DisplayAnecdote = ({ anecdote }) => <div>{anecdote.quote} <br />has {anecdote.votes} votes</div>

const App = (props) => {
   const [selected, setSelected] = useState(0);
   const [anecdotes, setAnecs] = useState(props.anecdotes);
   const [mostVotes, setMostVotes] = useState(0);

   //Will run only once when the component mount
   //So it can show a randon quote at the start,
   //instead of the quote on anecdotes[0]
   const useMountEffect = (funct) => useEffect(funct, []);

   const handleNewAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length));
   
   const handleVote = () => {
      const anecdotesCopy = [...anecdotes];
      anecdotesCopy[selected].votes += 1;
      setAnecs(anecdotesCopy);
      getNewMostVotes();
   }

   const getNewMostVotes = () => {
      let indexOfGreatest = 0;
      let maxValue = anecdotes[0].votes;
      anecdotes.forEach((element, index) => {
         if (element.votes > maxValue) {
            maxValue = element.votes;
            indexOfGreatest = index;
         }
      });
      setMostVotes(indexOfGreatest);
   }

   useMountEffect(handleNewAnecdote);
   return (
      <div>
         <DisplayTitle text="Anecdote of the day" />
         <DisplayAnecdote anecdote={anecdotes[selected]} />
         <Button handleClick={handleVote} text="Vote" />
         <Button handleClick={handleNewAnecdote} text="Next Anecdote" />
         <DisplayTitle text="Anecdote with most votes" />
         <DisplayAnecdote anecdote={anecdotes[mostVotes]} />
      </div>
   )
}

const anecdotes = [
   {
      quote: 'If it hurts, do it more often',
      votes: 0,
   },
   {
      quote: 'Adding manpower to a late software project makes it later!',
      votes: 0,
   },
   {
      quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0,
   },
   {
      quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0,
   },
   {
      quote: 'Premature optimization is the root of all evil.',
      votes: 0,
   },
   {
      quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0,
   },
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));