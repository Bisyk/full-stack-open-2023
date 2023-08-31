import { useState } from "react"

const Button = ({handleClick,text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const FeedbackSection = ({handleGoodClick, handleNeutralClick, handleBadClick}) =>{
  return(
    <>
    <h1>give feedback</h1>
    <Button handleClick={handleGoodClick}text="good"/>
    <Button handleClick={handleNeutralClick}text="neutral"/>
    <Button handleClick={handleBadClick}text="bad"/>
    </>
  )
}

const StatisticLine = ({text, value}) =>{
  console.log(typeof text)
  return(
    <>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
    </>
  )
}

const StatisticSection = ({good, neutral, bad}) =>{
  if (good + neutral + bad > 0){
  return(
    <table>
      <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good + neutral + bad}/>
          <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)}/>
          <StatisticLine text="positive" value={`${(good / (good + neutral + bad)) * 100} %`}/>
        </tbody>
    </table>
  )
}
return(
  <>
    <p>No feedback given</p>
  </>
)
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return(
    <>
      <FeedbackSection 
      handleGoodClick={handleGoodClick} 
      handleNeutralClick={handleNeutralClick} 
      handleBadClick={handleBadClick}/>
      <StatisticSection good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
