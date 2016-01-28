/**
 * @class ToolsDriver
 * Обеспечивает управление инструментами и
 * получение доступа подключаемых инструментов к канвасу
 * */
function ToolsDriver(canvas){
    this.canvas = canvas;

    /*@arg Набор инструментов по работе с холстом (Eraser, Cursor, Draw)*/
    this.register = {};

    /*@arg {Object} Активный инструмент, ссылка на него*/
    this.activedTool = null;
}

/**
 * Метод регистрации нового инструмента
 * @param {function} Constructor — конструктор нового инструмента
 * */
ToolsDriver.prototype.plug = function(Constructor){
    var tool = new Constructor(this.canvas);
    this.register[tool.constructor.name] = tool;
};

/**
 * Метод активизации инструмента
 * @param {string} name - имя инструмента
 * */
ToolsDriver.prototype.play = function(name){
    if (name || this.register[name] || (this.activedTool && this.activedTool.constructor.name !== name)){
        if (this.activedTool){
            this.activedTool.stop();
        }
        this.activedTool = this.register[name];
        this.activedTool.start();
    }
};