import {range} from '@core/utils';

export function shouldResize(event) {
   return event.target.dataset.resize;
}

export function isCell(event) {
return event.target.dataset.type;
}

export function matrix($target, $current) {
   const target = $target.id('true');
   const current = $current.id('true');
   const cols = range(current.col, target.col);
   const rows = range(current.row, target.row);
   return cols.reduce((acc, col) =>{
      rows.forEach(row => acc.push(`${row}-${col}`));
      return acc;
   }, []);
}

export function nextSelected(event, newID) {
   let row,
       col;
   switch (event.code) {
      case 'ArrowDown':
      case 'Enter':
         row = newID.row+1;
         col = newID.col;
         break;
      case 'ArrowRight':
      case 'Tab':
         row = newID.row;
         col = newID.col+1;
         break;
      case 'ArrowLeft':
         row = newID.row;
         col = newID.col-1;
         break;
      case 'ArrowUp':
         row = newID.row-1;
         col = newID.col;
   }
   return `[data-id="${row}-${col}"]`;
}

