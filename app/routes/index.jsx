import words from '~/constants/words'
import * as React from 'react'

function getFourRandomNumbers(max) {
  let numbers = Array.from({ length: max }, (_, i) => i);

  let randomNumbers = [];

  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * numbers.length);
    let randomNumber = numbers.splice(randomIndex, 1)[0];
    randomNumbers.push(randomNumber);
  }

  return randomNumbers
}

export default function Index() {
  const [randomNumbers, setRandomNumbers] = React.useState([])
  const [clue1, setClue1] = React.useState('')
  const [clue2, setClue2] = React.useState('')
  const [clue3, setClue3] = React.useState('')
  const [clue4, setClue4] = React.useState('')

  React.useEffect(() => {
    setRandomNumbers(getFourRandomNumbers(words.length))
  }, [])

  return (
    <div className="p-8 grid grid-cols-3 h-full gap-6">
      <div className="grid grid-cols-2 grid-rows-2 h-full col-span-2 gap-4">
        <CodeCard title="CODE 1">{words[randomNumbers[0]]}</CodeCard>
        <CodeCard title="CODE 2">{words[randomNumbers[1]]}</CodeCard>
        <CodeCard title="CODE 3">{words[randomNumbers[2]]}</CodeCard>
        <CodeCard title="CODE 4">{words[randomNumbers[3]]}</CodeCard>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 h-full gap-4">
        <Textarea title="對手 CODE 1 線索" value={clue1} onChange={setClue1} />
        <Textarea title="對手 CODE 2 線索" value={clue2} onChange={setClue2} />
        <Textarea title="對手 CODE 3 線索" value={clue3} onChange={setClue3} />
        <Textarea title="對手 CODE 4 線索" value={clue4} onChange={setClue4} />
      </div>
      <button className='fixed left-4 bottom-4 bg-teal-500 text-white rounded-full py-3 px-4 shadow-md font-bold transition opacity-50 hover:opacity-100' onClick={() => {
        setRandomNumbers(getFourRandomNumbers(words.length))
        setClue1('')
        setClue2('')
        setClue3('')
        setClue4('')
      }}>
        新局
      </button>
    </div>
  );
}

function CodeCard({ children, title }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-teal-600 font-medium">{title}</div>
      <div className="flex items-center justify-center text-3xl shadow-md bg-white rounded-lg flex-1 hover:bg-teal-50 cursor-pointer font-bold text-gray-700 transition">
        {children}
      </div>
    </div>
  );
}

function Textarea({ title, value, onChange }) {
  return (
    <div className="space-y-2 flex flex-col">
      <div className="text-gray-600 font-medium">{title}</div>
      <textarea className="border border-gray-200 flex-1 rounded-md" value={value} onChange={e => {onChange(e.target.value)}} />
    </div>
  );
}
