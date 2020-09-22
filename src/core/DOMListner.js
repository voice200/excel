import {capitalize} from '@core/utils';

export class DOMListner {
    constructor($root, listeners=[]) {
        if (!$root) {
            throw new Error(`No ${$root} provided for DomListener`);
        }
        this.$root = $root;
        this.listeners = listeners;
    }
    initDOMListeners() {
       // console.log(this.listeners);
        this.listeners.forEach(listener =>{
            const method = getMethodName(listener);
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`);
            }
            // чтобы не потерть контекст
            this[method] = this[method].bind(this);
            // Тоже самое, что и addEventListener
            this.$root.on(listener, this[method]);
        });
    }
    removeDOMListeners() {
       this.listeners.forEach(listener =>{
           const method = getMethodName(listener);
           this.$root.off(listener, this[method]);
       });
    }
}
// из input в onInput
function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
