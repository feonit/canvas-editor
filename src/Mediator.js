!function(CanvasEditor){

    CanvasEditor.namespace('CanvasEditor').Mediator = Mediator;

    /**
     * Для связи между модулями
     * @memberof CanvasEditor
     * @class Mediator
     * */
    function Mediator(){
        // events
        this._topics = {};
    }

    /**
     * Подписка на событие
     * @param {string} topic — имя события
     * @param {function} callback — обработчик события
     * @param {object|null} context — контекст выполнения обработчика
     * */
    Mediator.prototype.subscribe = function ( topic, callback, context ) {
        if( ! this._topics.hasOwnProperty( topic ) ) {
            this._topics[ topic ] = [];
        }

        this._topics[ topic ].push( { callback: callback, context: context } );
        return true;
    };
    /**
     * Отписка от события
     * @param {string} topic — имя события
     * @param {function} callback — обработчик события
     * */
    Mediator.prototype.unsubscribe = function ( topic, callback ) {
        if( ! this._topics.hasOwnProperty( topic ) ) {
            return false;
        }

        if ( ! callback ){
            this._topics[ topic ] = [];
            return true;
        }

        for( var i = 0, len = this._topics[ topic ].length; i < len; i++ ) {
            if( this._topics[ topic ][ i ].callback === callback ) {
                this._topics[ topic ].splice( i, 1 );
                return true;
            }
        }

        return false;
    };
    /**
     * Публикация события
     * @param {string} topic — имя события
     * */
    Mediator.prototype.publish = function (topic) {
        var args = Array.prototype.slice.call( arguments );
        topic = args.shift();

        if( ! this._topics.hasOwnProperty( topic ) ) {
            return false;
        }

        for( var i = 0, len = this._topics[ topic ].length; i < len; i++ ) {
            this._topics[ topic ][ i ].callback.apply( this._topics[ topic ][ i ].context, args );
        }
        return true;
    };

}(CanvasEditor);