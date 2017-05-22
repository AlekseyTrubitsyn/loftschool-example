/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let newDiv = document.createElement('div');

    newDiv.classList.add('draggable-div');
    newDiv.style.width = getRandomPx(300);
    newDiv.style.height = getRandomPx(300);
    newDiv.style.top = getRandomPx(100);
    newDiv.style.left = getRandomPx(100);
    newDiv.style['background-color'] = getRandomColor();

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    function getRandomPx(multiplier) {
        return Math.floor(Math.random() * multiplier + 50) + 'px';
    }

    return newDiv;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {

    target.addEventListener('dragstart', function() {
        return false;
    });

    target.addEventListener('mousedown', function(event) {
        let coordinates = getCoordinates(target);
        let shiftX = event.pageX - coordinates.left;
        let shiftY = event.pageY - coordinates.top;

        target.style.position = 'absolute';
        target.style.zIndex = 1000;
        document.body.appendChild(target);

        moveAt(event);

        document.addEventListener('mousemove', mouseMoveFunction);

        target.addEventListener('mouseup', function onMouseUpFunction() {
            document.removeEventListener('mousemove', mouseMoveFunction);
            target.removeEventListener('mouseup', onMouseUpFunction);
        });

        function moveAt(event) {
            target.style.left = event.pageX - shiftX + 'px';
            target.style.top = event.pageY - shiftY + 'px';
        }

        function mouseMoveFunction(event) {
            moveAt(event);
        }

        function getCoordinates(element) {
            let bcRect = element.getBoundingClientRect();

            return { top: bcRect.top, left: bcRect.left };
        }
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
