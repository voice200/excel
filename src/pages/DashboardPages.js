import {Page} from '@core/Page';
import {$} from '@core/dom';
import {recordsTable} from '@/pages/dashboard.function';

export class DashboardPages extends Page {
    getRoot() {
        const newId = Date.now().toString();
        return $.create('div', 'db').html(`
                <div class="db__header">
            <h1>Excel Панель управения</h1>
        </div>
        <div class="db__new">
            <div class="db__view">
                <a href="#excel/${newId}" class="db__create">
                    Новая Таблица +
                </a>
            </div>
        </div>
        <div class="db__table db__view">
            ${recordsTable()}
        </div>
        `);
    }
}
