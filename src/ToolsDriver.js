!function(APP){
    APP.namespace('APP.core');
    /**
     * Обеспечивает управление инструментами и получение доступа подключаемых инструментов к канвасу
     * @class
     * @memberof APP.core
     * @param {Object} appInstance
     * @param {HTMLCanvasElement} canvas
     * */
    APP.core.ToolsDriver = function (appInstance, canvas){
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
    APP.core.ToolsDriver.prototype = {
        constructor: APP.core.ToolsDriver,
        /**
         * Метод регистрации нового инструмента
         * @param {function} Constructor — конструктор нового инструмента
         * */
        _plug : function(Constructor){
            this._register.push(Constructor);
        },
        /**
         * Метод активизации инструмента
         * @param {ToolController} ToolController - имя инструмента
         * */
        play : function(ToolController){
            if (!ToolController){
                return;
            }

            if ((this._register.indexOf[ToolController] < 0)){
                this._plug(ToolController)
            }

            if (this._activedTool === ToolController){
                return;
            }

            if (this._instanceTool){
                this._instanceTool.stop();
            }
            this._instanceTool = new ToolController(this.appInstance, this._canvas);
            this._activedTool = ToolController;
            this._instanceTool.start();
        }
    };
}(APP);
