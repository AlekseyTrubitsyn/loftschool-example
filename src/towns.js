/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
import {loadAndSortTowns} from "./index.js";

let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    // Функционал импортируется из index.html
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    // Вариант 1 - регулярки
    return !!full.match(new RegExp(chunk, 'i'));

    // Вариант 2 с приведением к одному регистру
    // return (full.toLowerCase().indexOf(chunk.toLowerCase()) != -1);
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise = loadTowns();
let townsArray;

updateTownPoromise();

function putPromiseResultIntoArray(result) {
    townsArray = result;
}

function fixLoadingError() {
    let errorPar = document.createElement('P');
    let newButton = document.createElement('BUTTON');

    errorPar.innerText = 'Не удалось загрузить города';
    newButton.innerText = 'Повторить';

    newButton.addEventListener('click', function() {
        homeworkContainer.removeChild(newButton);
        homeworkContainer.removeChild(errorPar);

        updateTownPoromise()
    });

    homeworkContainer.appendChild(errorPar);
    homeworkContainer.appendChild(newButton);

    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'none';
}

function updateTownPoromise() {
    townsPromise = loadAndSortTowns().then(putPromiseResultIntoArray, fixLoadingError);
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
}

filterInput.addEventListener('keyup', function() {
    let inputValue = filterInput.value;

    filterResult.innerHTML = '';

    if (!(inputValue !== '' && Array.isArray(townsArray))) {
        return;
    }

    let resultArray = townsArray.filter((item) => {
        return isMatching(item.name, inputValue);
    });

    resultArray.forEach((item) => {
        let newItem = document.createElement('div');

        newItem.innerText = item.name;

        filterResult.appendChild(newItem);
    });
});

export {
    loadTowns,
    isMatching
};
