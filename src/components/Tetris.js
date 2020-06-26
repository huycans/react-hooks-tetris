import React, { useState } from 'react';
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

import { createStage, checkCollision } from '../gameHelpers';

import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';

const Tetris = () => {
  const [dropTime, setDroptime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);


  console.log("rerender");
  //this func responsible to moving the player left and right only
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    //reset everything
    setStage(createStage());
    resetPlayer();
    setDroptime(1000);
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //game over
      if (player.pos.y < 1) {
        console.log("game over");
        setGameOver(true);
        setDroptime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("Interval on");
        setDroptime(1000);
      }
    }
  };

  const dropPlayer = () => {
    console.log("Interval off");
    setDroptime(null);
    drop();

  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      }
      else if (keyCode === 39) {
        movePlayer(1);
      }
      else if (keyCode === 40) {
        dropPlayer();
      }
      else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      onKeyUp={keyUp}
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}>
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
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
