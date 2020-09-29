import {$} from '@core/dom';
const CODES = {
    A: 65,
    Z: 90
};

function toCell(row) {
    return function(_, col) {
        const $cell = $.create('div', 'cell');
        $cell.setAttr({
            'contentEditable': true,
            'data-cell': col,
            'data-id': `${row}-${col+1}`,
            'data-type': 'cell',
            'spellcheck': false
        });
        return $cell.html();
    };
}


function toColumn(el, index) {
    const $col = $.create('div', 'column');
    const $colResize = $.create('div', 'colResize');
    $col.text(el);
    $col.setAttr({
        'data-type': 'resizable',
        'data-col': index
    });
    $colResize.setAttribute( 'data-resize', 'col');
    $col.append($colResize);
    return $col.html();
}

function createRow(content, number) {
    const $rowContain = $.create('div');
    const $row = $.create('div', 'row');
    const $rowInfo = $.create('div', 'rowInfo');
    const $rowData = $.create('div', 'rowData');
    const $rowResize = $.create('div', 'rowResize');
    $row.setAttribute('data-type', 'resizable');
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

export function createTable(rowsCount = 200) {
    const colsCounts = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCounts)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCounts)
            .fill('')
            .map(toCell(row))
            .join('');
        if (row === 0) {
            rows.push(createRow(cols, row));
        } else {
            rows.push(createRow(cells, row));
        }
    }
    return rows.join('');
}


