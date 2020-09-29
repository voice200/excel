import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/component/table/table.template';
import {$} from '@core/dom';
import {tableResize} from '@/component/table/table.resize';
import {isCell, matrix, nextSelected, shouldResize} from '@/component/table/table.function';
import {TableSelection} from '@/component/table/TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Tabel',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }
    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id="1-1"]');
        this.selectCell($cell);

        this.$on('formula:input', text =>{
            this.selection.current.text(text);
        });
        this.$on('formula:focus', () =>{
            this.selection.current.focus();
        });
    }

    toHTML() {
        return createTable(40);
    }
    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            tableResize(this.$root, event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const cells = matrix($target, this.selection.current)
                    .map(id =>this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup(cells);
            } else {
                this.selection.select($target);
            }
        }
        this.$emit('table:mousedown', $(event.target));
    }
    onKeydown(event) {
        if (isCell(event) && !event.shiftKey) {
            const $target = $(event.target);
            const newID = $target.id('true');
            const $cell = this.$root.find(nextSelected(event, newID));
            if ($cell.$el !== null) {
                event.preventDefault();
                this.selectCell($cell);
            }
        }
    }
    onInput(event) {
        this.$emit('table:input', $(event.target));
    }
}

