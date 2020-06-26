import {useState, useEffect, useCallback} from 'react';

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40,100,300,1200];

  const calcScore = useCallback(() => {
    //we have score
    if (rowsCleared > 0){
      //formula for score
      setScore(prev => linePoints[rowsCleared-1]* (level + 1));
      setRows(prev => prev + rowsCleared);

    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [score, calcScore, rowsCleared])

  return [score, setScore, rows, setRows, level, setLevel]
}