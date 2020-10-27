import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        });
    }

    toHTML() {
        const $divInfo = $.create('div', 'info');
        const $divInput = $.create('div', 'input');
        $divInput.setAttr({
                contenteditable: true,
                spellcheck: false
            });
        $divInfo.text('fx');
        return $divInfo.html() + $divInput.html();
    }
    init() {
        super.init();
        this.$formula = this.$root.find('.input');
        this.$on('table:select', $cell =>{
            this.$formula.text($cell.text());
        });
        this.$on('table:mousedown', $cell =>{
            this.$formula.text($cell.data.value);
        });
    }
    storeChanged({currentText}) {
        this.$formula.text(currentText);
    }

    onInput(event) {
        const text = $(event.target).text();
        this.$emit('formula:input', text);
    }
    onKeydown(event) {
        if (event.code ==='Enter' || event.code === 'Tab') {
            event.preventDefault();
            this.$emit('formula:focus');
        }
    }
}
