import {$} from '@core/dom';
const CODES = {
    A: 65,
    Z: 90
};

function toCell(_, index) {
    const $cell = $.create('div', 'cell');
    $cell.setAttribute( 'contentEditable', 'true');
    $cell.setAttribute( 'data-cell', index);
    const cellBlock = $cell.$el.outerHTML;
    return cellBlock;
}


function toColumn(el, index) {
    const $col = $.create('div', 'column');
    const $colResize = $.create('div', 'colResize');
    $col.html(el);
    $col.setAttribute('data-type', 'resizable');
    $col.setAttribute( 'data-col', index);
    $colResize.setAttribute( 'data-resize', 'col');
    $col.append($colResize);
    const colBlock = $col.$el.outerHTML;
    return colBlock;
}

function createRow(content, number) {
    const $rowContain = $.create('div');
    const $row = $.create('div', 'row');
    const $rowInfo = $.create('div', 'rowInfo');
    const $rowData = $.create('div', 'rowData');
    const $rowResize = $.create('div', 'rowResize');
    $row.setAttribute('data-type', 'resizable');
    // $rowInfo.setAttribute('data-row', number-1);
    $rowResize.setAttribute( 'data-resize', 'row');

    if (number===0) {
        $row.append($rowInfo);
     } else {
        $rowInfo.html(number);
        $rowInfo.append($rowResize);
        $row.append($rowInfo);
    }
    $row.append($rowData.html(content));
    $rowContain.append($row);

    const rowBlock = $rowContain.$el.innerHTML;
    return rowBlock;
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


