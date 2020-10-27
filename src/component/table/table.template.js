import {$} from '@core/dom';
import {parse} from '@core/parse';
import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constans';
const CODES = {
    A: 65,
    Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}
function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(state, row) {
    return function(_, col) {
        const $cell = $.create('div', 'cell');
        const width = getWidth(state.colState, col);
        const id = `${row}-${col+1}`;
        const data = state.dataState[id];
        const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
        $cell.setAttr({
            'contentEditable': true,
            'data-cell': col,
            'data-id': `${id}`,
            'data-type': 'cell',
            'data-value': data || '',
            'spellcheck': false,
            'style': `${styles}; width: ${width}`
        });
        $cell.text(parse(data));
        return $cell.html();
    };
}


function toColumn({col, index, width}) {
    const $col = $.create('div', 'column');
    const $colResize = $.create('div', 'colResize');
    $col.text(col);
    $col.setAttr({
        'data-type': 'resizable',
        'data-col': index,
        'style': `width: ${width}`
    });
    $colResize.setAttribute( 'data-resize', 'col');
    $col.append($colResize);
    return $col.html();
}

function createRow(content, number, state) {
    const height = getHeight(state, number);
    const $rowContain = $.create('div');
    const $row = $.create('div', 'row');
    const $rowInfo = $.create('div', 'rowInfo');
    const $rowData = $.create('div', 'rowData');
    const $rowResize = $.create('div', 'rowResize');
    $row.setAttr({
        'data-type': 'resizable',
        'data-row': number,
        'style': `height: ${height}`
    });
    $rowInfo.setAttribute('data-row', number-1);
    $rowResize.setAttribute( 'data-resize', 'row');

    if (number===0) {
        $row.append($rowInfo);
     } else {
        $rowInfo.text(number);
        $rowInfo.append($rowResize);
        $row.append($rowInfo);
    }
    $row.append($rowData.html(content));
    $rowContain.append($row);
    return $row.html();
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        };
    };
}

export function createTable(rowsCount = 200, state) {
    const colsCounts = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCounts)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('');

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCounts)
            .fill('')
            .map(toCell(state, row))
            .join('');
        if (row === 0) {
            rows.push(createRow(cols, row, {}));
        } else {
            rows.push(createRow(cells, row, state.rowState));
        }
    }
    return rows.join('');
}


