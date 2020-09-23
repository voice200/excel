import {$} from '@core/dom';

export function tableResize($root, event) {
    let size;
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sidePro = type === 'col' ? 'bottom' : 'right';

    $resizer.css({
        opacity: 1,
        [sidePro]: '-5000px'
    });
    const cellsForCol = $root.findAll(`[data-cell="${$parent.data.col}"]`);

    document.onmousemove = e => {
        if (type === 'col') {
            console.log(type);
            const delta = e.pageX - coords.right;
            size = coords.width + delta;
            $resizer.css({right: -delta + `px`});
        } else {
            const delta = e.pageY - coords.bottom;
            $resizer.css({bottom: -delta + `px`});
            size = coords.height + delta;
        }
    };
    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (type==='col') {
            $parent.css({width: `${size}px`});
            cellsForCol.forEach(el => el.style.width = `${size}px`);
        } else {
            $parent.css({height: `${size}px`});
        }
        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        });
    };
}
