import {$} from '@core/dom';
import {Emiter} from '@core/Emiter';
export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.emiter = new Emiter();
    }
    getRoot() {
        const $root = $.create('div', 'excel');
        const componentOption = {
            emiter: this.emiter
        };

        this.components = this.components.map(Component =>{
            const $el = $.create('div', Component.className);
            const component = new Component($el, componentOption);
            // // debug
            // if (component.name){
            //     window['c' + component.name] = component;
            // }
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });
        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
        this.components.forEach(component => component.init());
    }
    destroy() {
        this.components.forEach(component => component.destroy());
    }
}
