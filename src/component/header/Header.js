import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constans';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/activeRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header';
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }
    prepare() {
        this.onInput = debounce(this.onInput, 300);
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle;
        const $input = $.create('input', 'input').setAttribute('value', `${title}`);
        const $divButton = $.create('div', 'button');
        $divButton.append($.create('span', 'material-icons')
            .text('exit_to_app')
            .setAttribute('data-button', 'exit'));
        $divButton.append( $.create('span', 'material-icons')
            .text('delete')
            .setAttribute('data-button', 'remove'));
        return $input.html() + $divButton.html();
    }
    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(changeTitle($target.text()));
    }
    onClick(event) {
        const $target = $(event.target);
        if ($target.data.button === 'exit') {
            ActiveRoute.navigation('');
        } else if ($target.data.button === 'remove') {
            const decision = confirm('Вы действительно хотите удалить эту таблицу?');
            if (decision) {
                localStorage.removeItem('excel:'+ActiveRoute.param);
                ActiveRoute.navigation('');
            }
        }
    }
}
