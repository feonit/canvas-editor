APP.namespace('APP').getTotalState = (function () {

     return function () {

        var data = {};
        var exclusion = {
            "ToolsDriver": true,
            "Mediator": true,
            "PixelsMap": true
        };

        function searchObjectOptions(obj, link) {
            var currentProperty;
            var constructorName;

            for (var propName in obj) {
                if (obj.hasOwnProperty(propName)) {
                    currentProperty = obj[propName];

                    if (typeof currentProperty === "undefined")
                        continue;

                    if (currentProperty === null)
                        continue;

                    constructorName = currentProperty.constructor.name;

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
                                //var newarr = [];
                                //selfArrLink[itemOfArrName].push(newarr);
                                processArray(itemOfArr, selfArrLink[itemOfArrName], index);
                            });
                            return;
                        }

                        // если все объекты
                        arr.forEach(function (itemOfArr) {
                            var optionsOfObject = {};
                            searchObjectOptions(itemOfArr, optionsOfObject);
                            var item = {};
                            item[itemOfArr.constructor.name] = optionsOfObject;
                            selfArrLink[propName].push(item);
                        });
                    }

                    // свойство массив
                    if (Array.isArray(currentProperty)) {
                        processArray(currentProperty, link, propName);
                    } else
                    // свойство объект не массив
                    if (typeof currentProperty === "object") {

                        if (exclusion[constructorName])
                            continue;

                        if (constructorName !== "Object") {
                            var newLink = link[currentProperty.constructor.name] = {};
                            searchObjectOptions(currentProperty, newLink);
                        } else {
                            link[propName] = currentProperty;
                        }
                    } else {
                        link[propName] = currentProperty;
                    }
                }
            }
        }

        searchObjectOptions(this, data);

        return data;
    }
})();