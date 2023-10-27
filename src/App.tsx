import { useCallback, useEffect, useState } from "react";
import "./App.css";
import hole from "./assets/hole.jpg";
import mole from "./assets/mole.jpg";

function App() {
  const [holes, setHoles] = useState<Array<boolean>>(Array(9).fill(true));
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    if (start) {
      setStart(false);
      setScore(0);
      setHoles(Array(9).fill(true));
    } else {
      setStart(true);
    }
  }, [start]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (start) {
      interval = setInterval(() => {
        setHoles((prevHoles) => {
          const randomIndex = Math.floor(Math.random() * prevHoles.length);
          const newHoles = [...prevHoles];
          newHoles[randomIndex] = false;

          setTimeout(() => {
            newHoles[randomIndex] = true;
            setHoles(newHoles);
          }, 1000);

          return newHoles;
        });
      }, 2000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [start]);

  const whackMole = (index: number) => {
    setHoles((prevHoles) => {
      const newHoles = [...prevHoles];
      newHoles[index] = true;

      if (!prevHoles[index]) {
        setScore((prevScore) => prevScore + 1);
      }

      return newHoles;
    });
  };

  return (
    <>
      <p
        className="score"
        style={{ fontSize: "24px", color: "black" }}
      >{`Score ${score}`}</p>
      <button className="start-button" onClick={startGame}>
        {start ? "Stop Game" : "Start Game"}
      </button>
      <div className="grid">
        {holes.map((isHole, index) => (
          <img
            key={index}
            src={isHole ? hole : mole}
            draggable={false}
            onClick={() => whackMole(index)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
