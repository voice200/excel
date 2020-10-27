import {$} from '@core/dom';
import {Emiter} from '@core/Emiter';
import {StoreSubscriber} from '@core/storeSubscriber';
export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.store = options.store;
        this.emiter = new Emiter();
        this.subscriber = new StoreSubscriber(this.store);
    }
    getRoot() {
        const $root = $.create('div', 'excel');
        const componentOption = {
            emiter: this.emiter,
            store: this.store
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

        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => component.init());
    }
    destroy() {
        this.components.forEach(component => component.destroy());
        this.subscriber.unsubscribeFromStore();
    }
}
