import {$} from '@core/dom';
const CODES = {
    A: 65,
    Z: 90
};

function toCell() {
    const $cell = $.create('div', 'cell');
    $cell.setAttribute( 'contentEditable', 'true');
    const $cellBlock = $cell.$el.outerHTML;
    return $cellBlock;
}


function toColumn(el) {
    const $col = $.create('div', 'column');
    $col.html(el);
    const $colBlock = $col.$el.outerHTML;
    return $colBlock;
}

function createRow(content, number) {
    const $rowContain = $.create('div');
    const $row = $.create('div', 'row');
    const $rowInfo = $.create('div', 'rowInfo');
    const $rowData = $.create('div', 'rowData');
    const contentInfo = number + 1;
    $rowInfo.html(contentInfo);
    $row.append($rowInfo);
    $row.append($rowData.html(content));
    $rowContain.append($row);

    const $rowBlock = $rowContain.$el.innerHTML;
    return $rowBlock;
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
    // rows.push(createRow());
    const cells = new Array(colsCounts)
        .fill('')
        .map(toCell)
        .join('');

    for (let i = 0; i < rowsCount; i++) {
        if (i===0) {
            rows.push(createRow(cols, i));
        } else {
            rows.push(createRow(cells, i));
        }
    }
    return rows.join('');
}


