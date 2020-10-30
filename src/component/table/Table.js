import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/component/table/table.template';
import {$} from '@core/dom';
import {tableResize} from '@/component/table/table.resize';
import {isCell, matrix, nextSelected, shouldResize} from '@/component/table/table.function';
import {TableSelection} from '@/component/table/TableSelection';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constans';
import {parse} from '@core/parse';

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
        this.$on('formula:input', value =>{
            this.selection.current.setAttribute('data-value', value).text(parse(value));
            this.updateTextInStore(value);
        });
        this.$on('formula:focus', () =>{
            this.selection.current.focus();
        });
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }));
        });
    }

    toHTML() {
        return createTable(100, this.store.getState());
    }
    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyle(styles));
    }
    async resizeTable(event) {
        try {
            const data = await tableResize(this.$root, event);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.error('Resize error', e.message);
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const cells = matrix($target, this.selection.current)
                    .map(id =>this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup(cells);
            } else {
                this.selectCell($target);
            }
        }
        if (isCell(event)) {
            this.$emit('table:mousedown', $(event.target));
        }
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
    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            text: value
        }));
    }
    onInput(event) {
        this.updateTextInStore($(event.target).text());
    }
}

