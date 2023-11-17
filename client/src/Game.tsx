import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";

const Game: React.FC = () => {
  const [count, setCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);

  // Function to handle button click
  const handleButtonClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Function to start the game
  const startGame = () => {
    setGameStarted(true);
    // Set to 5 second for testing. Should be 60 seconds
    setTimeRemaining(5);
    setCount(0);
  };

  // Function to end the game
  const endGame = () => {
    setGameStarted(false);
    alert(`Game Over! Your click count: ${count}`);
  };

  // Countdown timer effect
  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;

    if (gameStarted && timeRemaining > 0) {
      countdownTimer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }

    return () => {
      clearTimeout(countdownTimer);
    };
  }, [timeRemaining, gameStarted]);

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">ClickMaster</h1>

      <div className="flex justify-center py-4">
        <img
          src="/clickmaster_banner.jpg"
          alt="Clickmaster Banner"
          className="max-w-full rounded-lg"
        />
      </div>

      {!gameStarted ? (
        <Button className="font-bold py-2 px-4 rounded" onClick={startGame}>
          Start
        </Button>
      ) : (
        <>
          <p className="text-2xl font-bold mb-4">
            Time Remaining: {timeRemaining}s
          </p>
          <p className="text-2xl font-bold mb-4">Points: {count}</p>
          <Button
            className="font-bold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Smash Me!
          </Button>
        </>
      )}
    </div>
  );
};

export default Game;
