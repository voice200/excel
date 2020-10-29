export function capitalize(string) {
    if ( typeof string !== 'string') {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end];
    }
    return new Array(end-start+1)
        .fill('')
        .map((_, index) =>start+index);
}

export function storage(key, data= null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
    if (typeof a === 'object' && b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}
export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map(key =>`${camelToDashCase(key)}: ${styles[key]}`)
        .join(';');
}

export function debounce(fn, wait) {
    let timout;
    return function(...args) {
        const later = () => {
            clearTimeout(timout);
            // eslint-disable-next-line no-invalid-this
            fn.apply(this, args);
        };
        clearTimeout(timout);
        timout = setTimeout(later, wait);
    };
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function dateLocal(date) {
    return date.toLocaleString('ru');
}
