!function(App){

    App.namespace('App').ToolsDriver = ToolsDriver;

    /**
     * @class ToolsDriver
     * Обеспечивает управление инструментами и
     * получение доступа подключаемых инструментов к канвасу
     * */
    function ToolsDriver(app, canvas){
        this.app = app;

        this._canvas = canvas;

        /*@arg Набор инструментов по работе с холстом (Eraser, Cursor, Draw)*/
        this._register = {};

        /*@arg {Object} Активный инструмент, ссылка на него*/
        this._activedTool = null;
    }

    /**
     * Метод регистрации нового инструмента
     * @param {function} Constructor — конструктор нового инструмента
     * */
    ToolsDriver.prototype.plug = function(Constructor){
        var tool = new Constructor(this.app, this._canvas);
        this._register[tool.constructor.name] = tool;
    };

    /**
     * Метод активизации инструмента
     * @param {string} name - имя инструмента
     * */
    ToolsDriver.prototype.play = function(name){
        if (name || this._register[name] || (this._activedTool && this._activedTool.constructor.name !== name)){
            if (this._activedTool){
                this._activedTool.stop();
            }
            this._activedTool = this._register[name];
            this._activedTool.start();
        }
    };

    ToolsDriver.prototype.getToolByName = function(name){
        return this._register[name];
    };

    ToolsDriver.prototype.getKeys = function(){
        return Object.keys(this._register);
    };

}(App);