!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').ToolsDriver = ToolsDriver;

    /**
     * Обеспечивает управление инструментами и получение доступа подключаемых инструментов к канвасу
     * @class ToolsDriver
     * @memberof CanvasEditor
     * @param {Object} appInstance
     * @param {HTMLCanvasElement} canvas
     * */
    function ToolsDriver(appInstance, canvas){
        this.appInstance = appInstance;

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
        var tool = new Constructor(this.appInstance, this._canvas);
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

}(CanvasEditor);