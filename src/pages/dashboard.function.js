import {storage} from '@core/utils';
import {defaultTitle} from '@/constans';

function toHTML(key) {
   const model = storage(key);
   const id = key.split(':').[1];
   const date = model.date;
   return `
    <li class="db__record">
        <a href="#excel/${id}">${model.title}</a>
        <strong>${date}</strong>
    </li>`;
}


function getAllKeys() {
   const keys = [];
   for (let i = 0; i<localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key.includes('excel')) {
         continue;
      }
      keys.push(key);
   }
   return keys;
}

export function recordsTable() {
   const keys = getAllKeys();
   if (!keys.length) {
      return `<p> Пока не создано ни одной таблицы </p>`;
   }
   return `
   <div class="db__listHeader">
       <span>Название таблицы</span>
       <span>Дата открытия</span>
   </div>
        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>`;
}
