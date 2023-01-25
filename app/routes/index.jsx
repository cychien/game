import words from "~/constants/words";
import * as React from "react";
import shuffle from "lodash/shuffle";
import cx from "classnames";

function getFourRandomNumbers(max) {
  let numbers = Array.from({ length: max }, (_, i) => i);

  let randomNumbers = [];

  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * numbers.length);
    let randomNumber = numbers.splice(randomIndex, 1)[0];
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

export default function Index() {
  const [isHideMode, setIsHideMode] = React.useState(false);
  const [randomNumbers, setRandomNumbers] = React.useState([]);
  const [clue1, setClue1] = React.useState("");
  const [clue2, setClue2] = React.useState("");
  const [clue3, setClue3] = React.useState("");
  const [clue4, setClue4] = React.useState("");
  const [order, setOrder] = React.useState([]);
  const [orderAppears, setOrderAppears] = React.useState(false);

  React.useEffect(() => {
    setRandomNumbers(getFourRandomNumbers(words.length));
  }, []);

  React.useEffect(() => {
    if (orderAppears) {
      setTimeout(() => {
        setOrderAppears(false);
      }, 1000);
    }
  }, [orderAppears]);

  return (
    <div className="p-8 grid grid-cols-3 h-full gap-6">
      <div className="grid grid-cols-2 grid-rows-2 h-full col-span-2 gap-4">
        <CodeCard title="CODE 1" isHideMode={isHideMode}>
          {words[randomNumbers[0]]}
        </CodeCard>
        <CodeCard title="CODE 2" isHideMode={isHideMode}>
          {words[randomNumbers[1]]}
        </CodeCard>
        <CodeCard title="CODE 3" isHideMode={isHideMode}>
          {words[randomNumbers[2]]}
        </CodeCard>
        <CodeCard title="CODE 4" isHideMode={isHideMode}>
          {words[randomNumbers[3]]}
        </CodeCard>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 h-full gap-4">
        <Textarea title="對手 CODE 1 線索" value={clue1} onChange={setClue1} />
        <Textarea title="對手 CODE 2 線索" value={clue2} onChange={setClue2} />
        <Textarea title="對手 CODE 3 線索" value={clue3} onChange={setClue3} />
        <Textarea title="對手 CODE 4 線索" value={clue4} onChange={setClue4} />
      </div>
      <div className="fixed p-4 bottom-0 left-0 space-y-2">
        {orderAppears && (
          <div className="bg-gray-900 opacity-60 px-4 rounded-md text-white h-10 items-center inline-flex">
            {order.join("")}
          </div>
        )}

        <button
          className="bg-teal-500 text-white rounded-full py-3 px-4 shadow-md font-bold transition opacity-20 hover:opacity-100 block"
          onClick={() => {
            setRandomNumbers(getFourRandomNumbers(words.length));
            setClue1("");
            setClue2("");
            setClue3("");
            setClue4("");
          }}
        >
          新局
        </button>
        <div className="flex space-x-2">
          <button
            className={cx("rounded-full py-3 px-4 shadow-md font-bold", {
              "bg-gray-600 text-white": isHideMode,
              "text-gray-600 bg-white": !isHideMode,
            })}
            onClick={() => {
              setIsHideMode((prev) => !prev);
            }}
          >
            {isHideMode ? "屏蔽模式" : "一般模式"}
          </button>
          <button
            className="bg-teal-500 text-white rounded-full py-3 px-4 shadow-md font-bold transition hover:bg-teal-600"
            onClick={() => {
              setOrder(shuffle([1, 2, 3, 4]).slice(0, 3));
              setOrderAppears(true);
            }}
          >
            抽牌
          </button>
        </div>
      </div>
    </div>
  );
}

function CodeCard({ children, title, isHideMode }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-teal-600 font-medium">{title}</div>
      <div
        className={cx(
          "flex items-center justify-center text-3xl shadow-md rounded-lg flex-1 hover:bg-teal-50 cursor-pointer font-bold text-gray-700 bg-white transition",
          { group: isHideMode }
        )}
      >
        <span className={cx({ "blur-lg group-hover:blur-none": isHideMode })}>
          {children}
        </span>
      </div>
    </div>
  );
}

function Textarea({ title, value, onChange }) {
  return (
    <div className="space-y-2 flex flex-col">
      <div className="text-gray-600 font-medium">{title}</div>
      <textarea
        className="border border-gray-200 flex-1 rounded-md"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
