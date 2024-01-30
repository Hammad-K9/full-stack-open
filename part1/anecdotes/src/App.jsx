import { useState } from 'react'

const Anecdote = ({anecdote, vote}) => (
  <>
    <div>{anecdote}</div>
    <div>This quote has {vote} votes</div>
  </>
)

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Header = ({header}) => <h1>{header}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))

  const getRandomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }
  
  const nextAnecdote = () => {
    setSelected(getRandomIntInclusive(0, anecdotes.length - 1))
  }

  const voteClick = () => {
    const copy = [...vote]
    copy[selected]++;
    setVote(copy)
  }

  const getQuoteWithMaxVotes = () => {
    const maxVotes = Math.max(...vote);
    return vote.indexOf(maxVotes);
  }
  const maxVote = getQuoteWithMaxVotes();
  return (
    <>
      <Header header='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} vote={vote[selected]}/>
      <Button onClick={nextAnecdote} text='next anecdote'/>
      <Button onClick={voteClick} text='vote'/>
      <Header header='Anecdote with most votes' />
      <Anecdote anecdote={anecdotes[maxVote]} vote={vote[maxVote]} />
    </>
  )
}

export default App