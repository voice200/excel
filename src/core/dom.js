class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'?document.querySelector(selector):selector;
}

    setAttribute(name, value) {
        this.$el.setAttribute(name, value);
        return this;
    }
    setAttr(attributes = {}) {
        const keys = Object.keys(attributes);
        keys.forEach(key =>{
            this.$el.setAttribute(key, attributes[key]);
        });
        return this;
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
    text(text) {
        if (typeof text === 'string' || typeof text === 'number') {
            this.$el.textContent = text;
            // return this;
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
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
        return this;
    }
    find(selector) {
        return $(this.$el.querySelector(selector));
    }
    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }
    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }
    id(parse) {
        if (parse) {
            const parsed = this.id().split('-');
            return {
                row: +parsed[0],
                col: +parsed[1]
            };
        }
      return this.data.id;
    }
    focus($el) {
        this.$el.focus();
        return this;
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

