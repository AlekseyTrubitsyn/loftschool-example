/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дОбавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    checkInputAndCreateTable();
});

addButton.addEventListener('click', () => {
    createCookie(addNameInput.value, addValueInput.value);

    checkInputAndCreateTable();
});

function checkInputAndCreateTable() {
    let inputValue = filterNameInput.value;
    let resultArray;

    listTable.innerHTML = '';

    if (document.cookie === '') {
        return;
    }

    resultArray = getCookiesArrayOfObjects();

    if (!resultArray || resultArray.length === 0) {
        return;
    }

    if (inputValue !== '') {
        resultArray = resultArray.filter((item) => {
            return isMatching(item.value, inputValue)
                || isMatching(item.name, inputValue);
        });
    }

    createResultTable(resultArray);
}

function getCookiesArrayOfObjects() {
    let cookiesArray = document.cookie.split('; ');

    return cookiesArray.map(function (item) {
        let equalSymbolIndex = item.indexOf('=');

        return {
            name: item.substring(0, equalSymbolIndex),
            value: item.substring(equalSymbolIndex + 1)
        }
    });
}

function createResultTable(objectsArray) {
    objectsArray.forEach(function (item) {
        let newRow = document.createElement('tr');
        let nameCell = document.createElement('td');
        let valueCell = document.createElement('td');
        let deleteCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        let itemName = item.name;

        nameCell.innerHTML = itemName;
        valueCell.innerHTML = item.value;
        deleteButton.innerText = 'удалить';

        deleteButton.addEventListener('click', () => {
            deleteCookie(itemName);
            checkInputAndCreateTable();
        });

        deleteCell.appendChild(deleteButton);
        newRow.appendChild(nameCell);
        newRow.appendChild(valueCell);
        newRow.appendChild(deleteCell);

        listTable.appendChild(newRow);
    });
}

function createCookie(name, value) {
    document.cookie = name + '=' + value;
}

function deleteCookie(name) {
    document.cookie = name + '=""; expires=' + (new Date(-1));
}

function isMatching(full, chunk) {
    return !!full.match(new RegExp(chunk, 'i'));
}