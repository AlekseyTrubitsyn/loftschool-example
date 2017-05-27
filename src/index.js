/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve('result');
        }, seconds * 1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    return new Promise((resolve, reject) => {
        let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
        let request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.onload = function() {
            try {
                let response = request.response;

                response = JSON.parse(response);
                response = Array.from(response);
                response.sort((a, b) => {
                    return a.name > b.name;
                });

                return resolve(response);

            } catch (e) {
                return reject(e);
            }
        };

        request.send();
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
