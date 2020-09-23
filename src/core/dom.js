class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'?document.querySelector(selector):selector;
}

    setAttribute(name, value) {
   // Реализовать удалить атрибуты и множественное добавление и удаление атрибутов
        this.$el.setAttribute(name, value);
    }
    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        } else if (typeof html === 'number') {
            this.$el.innerText = html;
        }
        return this.$el.outerHTML.trim();
    }
    clear() {
        this.html('');
        return this;
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }
    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }
    closest(selector) {
        return $(this.$el.closest(selector));
    }
    getCoords() {
        return this.$el.getBoundingClientRect();
    }
    get data() {
        return this.$el.dataset;
    }
    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }
    css(styles={}) {
        const keys = Object.keys(styles);
        keys.forEach(key =>{
            this.$el.style[key] = styles[key];
        });
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes='')=>{
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
};

