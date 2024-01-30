import { useState } from 'react'

const Header = ({mainHeader}) => <h1>{mainHeader}</h1>

const Subheader = ({subHeader}) => <h2>{subHeader}</h2>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatLine = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value} {text === 'positive' ? '%' : ''}</td>
  </tr>
)

const Stats = ({stats}) => (
  <table>
    <StatLine text='good' value={stats.good} />
    <StatLine text='neutral' value={stats.neutral} />
    <StatLine text='bad' value={stats.bad} />
    <StatLine text='all' value={stats.all} />
    <StatLine text='avg' value={stats.avg} />
    <StatLine text='positive' value={stats.positive} />
  </table>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const mainHeader = 'give feedback'
  const subHeader = 'stats'

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedAll = all + 1
    setAll(updatedAll)
    const updatedAvg = (updatedGood - bad) / updatedAll
    setAvg(updatedAvg)
    setPositive(updatedGood * 100 / updatedAll)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedAll = all + 1
    setAll(updatedAll)
    const updatedAvg = (good - bad) / updatedAll
    setAvg(updatedAvg)
    setPositive(good * 100 / updatedAll)
  }
  
  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedAll = all + 1
    setAll(updatedAll)
    const updatedAvg = (good - updatedBad) / updatedAll
    setAvg(updatedAvg)
    setPositive(good * 100 / updatedAll)
  }

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    avg: avg,
    positive: positive
  }

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <Header mainHeader={mainHeader} />
        <Button onClick={handleGood} text='good' />
        <Button onClick={handleNeutral} text='neutral' />
        <Button onClick={handleBad} text='bad' />
        <Subheader subHeader={subHeader} />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Header mainHeader={mainHeader} />
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Subheader subHeader={subHeader} />
      <Stats stats={stats} />
    </div>
  )
}

export default App