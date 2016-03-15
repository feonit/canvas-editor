!function(APP){
    APP.namespace('APP');
    /**
     * Обеспечивает управление инструментами и получение доступа подключаемых инструментов к канвасу
     * @class ToolsDriver
     * @memberof APP
     * @param {Object} appInstance
     * @param {HTMLCanvasElement} canvas
     * */
    APP.ToolsDriver = function (appInstance, canvas){
        this.appInstance = appInstance;
        this._canvas = canvas;
        /*@arg Набор инструментов по работе с холстом (Eraser, Cursor, Draw)*/
        this._register = [];
        /* текущий */
        this._instanceTool = null;
        /*@arg {Object} Активный инструмент, ссылка на него*/
        this._activedTool = null;
    };
    /** @lends ToolsDriver.prototype */
    APP.ToolsDriver.prototype = {
        constructor: APP.ToolsDriver,
        /**
         * Метод регистрации нового инструмента
         * @param {function} Constructor — конструктор нового инструмента
         * */
        plug : function(Constructor){
            this._register.push(Constructor);
        },
        /**
         * Метод активизации инструмента
         * @param {Object} Tool - имя инструмента
         * */
        play : function(Tool){
            if (!Tool){
                return;
            }
            if ((this._register.indexOf[Tool] < 0)){
                this.plug(Tool)
            }

            if (this._activedTool === Tool){
                return;
            }

            if (this._instanceTool){
                this._instanceTool.stop();
            }
            this.plug(Tool);
            this._instanceTool = new Tool(this.appInstance, this._canvas);
            this._activedTool = Tool;
            this._instanceTool.start();
        }
    };
}(APP);