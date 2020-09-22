import {DOMListner} from '@core/DOMListner';

export class ExcelComponent extends DOMListner {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name;
    }
    // Возвращает шаблон компонента
    toHTML() {
        return '';
    }
    init() {
        this.initDOMListeners();
    }
    destroy() {
       this.removeDOMListeners();
    }
}
