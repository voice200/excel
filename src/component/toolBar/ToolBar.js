import {ExcelComponent} from '@core/ExcelComponent';

export class ToolBar extends ExcelComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'ToolBar',
            listeners: ['click'],
            ...options
        });
    }
    toHTML() {
        return ` <span class="material-icons">
                format_bold
            </span>
                <span class="material-icons">
                format_italic
            </span>
                <span class="material-icons">
                format_underlined
            </span>
                <span class="material-icons">
                format_align_left
            </span>
                <span class="material-icons">
                format_align_center
            </span>
                <span class="material-icons">
                format_align_right
            </span>`;
    }
    onClick() {
    }
}
