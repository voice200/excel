import {DOMListner} from '@core/DOMListner';

export class ExcelComponent extends DOMListner {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name;
        this.emitter = options.emiter;
        this.subscribe = options.subscribe || [];
        this.store = options.store;
        this.unsubscribers = [];

        this.prepare();
    }
    // Настраиваем компонент до init
    prepare() {
    }
    // Возвращает шаблон компонента
    toHTML() {
        return '';
    }
    // Уведомляем слушателей про событие
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }
    // Подписываемся на события event
    $on(event, fn) {
       const unsub = this.emitter.subscribe(event, fn);
       this.unsubscribers.push(unsub);
    }
    $dispatch(action) {
      this.store.dispatch(action);
    }
    isWatching(key) {
       return this.subscribe.includes(key);
    }
    storeChanged() {

    }

    // Инициализируем компоненты
    // Добавляем слушателей
    init() {
        this.initDOMListeners();
    }
    // Удаляем компоненты
    // Удаляем слушателей
    destroy() {
       this.removeDOMListeners();
       this.unsubscribers.forEach(unsub => unsub());
    }
}
