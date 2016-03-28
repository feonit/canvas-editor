APP.namespace('APP').getTotalState = function (instanse) {

    var data = {};
    var exclusion =[
        APP.core.ToolsDriver,
        APP.core.Mediator,
        APP.core.PixelsMap
    ];

    function searchObjectOptions(obj, link) {
        var propValue;
        var constructor;

        for (var propName in obj) {
            if (obj.hasOwnProperty(propName)) {
                propValue = obj[propName];

                if (typeof propValue === "undefined")
                    continue;

                if (propValue === null)
                    continue;

                constructor = propValue.constructor;

                function processArray(arr, selfArrLink, itemOfArrName) {
                    selfArrLink[itemOfArrName] = [];

                    // если пустой выходим
                    if (!arr.length)
                        return;

                    // если не объекты, присваиваем
                    if (typeof (arr[0]) !== "object") {
                        selfArrLink[itemOfArrName] = arr;
                        return;
                    }

                    // если опять массив
                    if (Array.isArray(arr[0])) {
                        arr.forEach(function (itemOfArr, index) {
                            processArray(itemOfArr, selfArrLink[itemOfArrName], index);
                        });
                        return;
                    }

                    // если все объекты
                    arr.forEach(function (itemOfArr) {
                        var optionsOfObject = {};
                        searchObjectOptions(itemOfArr, optionsOfObject);
                        selfArrLink[propName].push(optionsOfObject);
                    });
                }

                // свойство массив
                if (Array.isArray(propValue)) {
                    processArray(propValue, link, propName);
                } else
                // свойство объект не массив
                if (typeof propValue === "object") {

                    if (exclusion.indexOf(constructor) > -1)
                        continue;

                    // если его прямой родитель Object
                    if (constructor.prototype !== Object.prototype) {
                        var newLink = link[propName] = {};
                        searchObjectOptions(propValue, newLink);
                    } else {
                        link[propName] = propValue;
                    }
                } else {
                    link[propName] = propValue;
                }
            }
        }
    }

    searchObjectOptions(instanse, data);

    return data;
};