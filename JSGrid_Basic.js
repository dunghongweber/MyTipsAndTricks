//https://css-tricks.com/snippets/css/complete-guide-grid/
import styled from styled-component

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  //using CSS REPEAT : https://developer.mozilla.org/en-US/docs/Web/CSS/repeat
  grid-template-rows: repeat(6, 1fr);
  
  column-gap: 1rem;
  row-gap: 1rem;
  gap: 1rem;
  
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
  // place-items sets both the align-items and justify-items properties in a single declaration.
  place-items: center;
  // alignment of the grid within the grid container.
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
`

/**
  make grid columns same height
*/
export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
export const Children = style.div`
  height: 100%;
`
