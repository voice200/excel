import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/component/table/table.template';
import {$} from '@core/dom';
import {tableResize} from '@/component/table/table.resize';
import {shouldResize} from '@/component/table/table.function';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(40);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            tableResize(this.$root, event);
        }
    }
}

