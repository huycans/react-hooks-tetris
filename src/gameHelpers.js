export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(//create an array...
    Array(STAGE_HEIGHT), //...from this array
    () => //run this func for every element in the above array; for every row, add a array of STAGE_WIDTH cells
      new Array(STAGE_WIDTH).fill([0, 'clear'])
    );