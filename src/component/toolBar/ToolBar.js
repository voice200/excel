import {$} from '@core/dom';
import {createToolbar} from '@/component/toolBar/toolbar.template';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/constans';

export class ToolBar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'ToolBar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }
    prepare() {
        this.initState(defaultStyles);
    }

    get template() {
        return createToolbar(this.state);
    }

    toHTML() {
      return this.template;
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles);
    }

    onClick(event) {
       const $target = $(event.target);
       if ($target.data.type === 'button') {
           const value = $target.data.value;
           const valueArr = value.split(':');
           const [property, meaning] = valueArr;
           this.$emit('toolbar:applyStyle', {[property]: meaning});
       }
    }
}
