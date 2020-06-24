import React, { useState } from 'react';
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
  const [dropTime, setDroptime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player] = usePlayer();
  const [stage, setStage] = useStage(player);


  console.log("rerender");
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (<Display gameOver={gameOver} text="Game Over!" />)
            : (
              <div>
                <Display text="score" />
                <Display text="rows" />
                <Display text="level" />
              </div>
            )
          }
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
