import { useState, useEffect } from 'react';

const wordsToType = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "Minecraft",
  "Valorant",
  "Apex",
  "Terraria",
  "Umamusume"

  // ... add more words ...
];

const getRandomWords = (count) => {
  const randomIndices = [];
  while (randomIndices.length < count) {
    const randomIndex = Math.floor(Math.random() * wordsToType.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }
  return randomIndices.map((index) => wordsToType[index]);
};

const Game2Page: React.FC = () => {
  const [wordsToTypeRandomized, setWordsToTypeRandomized] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [enteredText, setEnteredText] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [clearTime, setClearTime] = useState<number | null>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setEnteredText(inputText);

    if (inputText === wordsToTypeRandomized[currentWordIndex]) {
      if (currentWordIndex < wordsToTypeRandomized.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setEnteredText(""); // Clear the input field
      } else {
        const endTime = new Date().getTime();
        const elapsedTime = (endTime - startTime!) / 1000; // in seconds
        const wordsPerMinute = (wordsToTypeRandomized.length / elapsedTime) * 60;

        setClearTime(elapsedTime);
        setGameCompleted(true); // Set game completion state
      }
    }
  };

  const handleFocus = () => {
    if (currentWordIndex === 0) {
      setStartTime(new Date().getTime());
    }
  };

  const handleRestart = () => {
    setGameCompleted(false);
    setCurrentWordIndex(0);
    setEnteredText("");
    setClearTime(null);
    setWordsToTypeRandomized(getRandomWords(10)); // Randomize words again
  };

  useEffect(() => {
    setWordsToTypeRandomized(getRandomWords(10)); // Initialize with 10 random words
    setCurrentWordIndex(0);
    setEnteredText("");
    setClearTime(null);
  }, []);

  return (
    <div className="container">
      <h1>Typing Game</h1>
      {gameCompleted ? (
        <div>
          <p>Congratulations! You completed the typing challenge.</p>
          <p>Clear time: {clearTime ? `${clearTime.toFixed(2)} seconds` : ''}</p>
          <button onClick={handleRestart}>One more!</button>
        </div>
      ) : (
        <div>
          <p id="text-to-type">{wordsToTypeRandomized[currentWordIndex]}</p>
          <input
            id="input-field"
            type="text"
            placeholder="Start typing..."
            value={enteredText}
            onChange={handleInput}
            onFocus={handleFocus}
          />
        </div>
      )}
    </div>
  );
};

export default Game2Page;
