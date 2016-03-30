var APP = {};

APP.namespace = function (nsString) {
    var parts = nsString.split('.'),
        parent = APP,
        i;
    // отбросить начальный префикс – имя глобального объекта
    if (parts[0] === 'APP') {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        // создать свойство, если оно отсутствует
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

/**
 * Глобальная область приложения
 * @namespace APP
 * */
APP.namespace('APP');
/**
 * Основные компоненты системы
 * @namespace APP.core
 * */
APP.namespace('APP.core');
/**
 * Утилиты, не имеют интерфейсов ввода конфигурационных данных,
 * получают настройки только из глобального конфигуратора приложения,
 * по умолчанию они отключены,
 * @namespace APP.utils
 * */
APP.namespace('APP.utils');
/**
 * Контроллеры инструментов, в настоящий момент времени включенным может быть только один из них,
 * поэтому находятся исключительно под управлением APP.core.ToolsDriver
 * @namespace APP.controllers
 * */
APP.namespace('APP.controllers');
/**
 * Модели данных графических изображений
 * @namespace APP.objects
 * */
APP.namespace('APP.objects');
/**
 * Область для сложных вычислений
 * @namespace APP.algorithms
 * */
APP.namespace('APP.algorithms');
