import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const DisplayTitle = props => <h1>{props.text}</h1>
const DisplayInfo = props => <p>{props.text}</p>

const Statistic = ({ text, value }) => {
   return (
      <tr>
         <td>{text}</td>
         <td>{value}</td>
      </tr>
   );
}

const Button = ({ handleClick, text }) =>
   <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
   if (all === 0)
      return (
         <DisplayInfo text="No feedback given."/>
      );
   else return (
      <table>
         <tbody>
            <Statistic text="Good:" value={good} />
            <Statistic text="Neutral:" value={neutral} />
            <Statistic text="Bad:" value={bad} />
            <Statistic text="All:" value={all} />
            <Statistic text="Average:" value={average} />
            <Statistic text="Positive:" value={positive + " %"} />
         </tbody>
      </table>
   );
}

const App = () => {
   const [good, setGood] = useState(0);
   const [neutral, setNeutral] = useState(0);
   const [bad, setBad] = useState(0);
   const [all, setAll] = useState(0);
   const [average, setAverage] = useState(0);
   const [positive, setPositive] = useState(0);

   useEffect(() => {
      setAll(good + neutral + bad);
      setAverage(((good * 1) + (neutral * 0) + (bad * -1)) / all);
      setPositive(good / all * 100);
   }, [good, neutral, bad, all]);

   return (
      <div>
         <DisplayTitle text="Give Feedback" />
         <Button handleClick={() => setGood(good + 1)} text="Good" />
         <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
         <Button handleClick={() => setBad(bad + 1)} text="Bad" />
         <DisplayTitle text="Statistics" />
         <Statistics good={good} neutral={neutral} bad={bad}
            all={all} average={average} positive={positive} />
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById('root'))