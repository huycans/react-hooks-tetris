import React from 'react';
import {StyledCell} from "./styles/StyledCell";
import {TETROMINOS} from "../tetrominos";

const Cell = ({type}) => {
  return (
    <StyledCell type={type} color={TETROMINOS[type].color}>
      
    </StyledCell>
  )
}

//optimization, use React.memo to avoid rerendering cell when they are not changed
export default React.memo(Cell)
