!function(APP){

    APP.views.CursorView = function(options){
        this.canvas = options.canvas;
        this._cursorIs = this.canvas.style.cursor;
    };

    APP.views.CursorView.prototype.setGrab = function (){
        if (this._cursorIs !== 'grab'){
            this.canvas.classList.add("cursor-grab");
            this._cursorIs = 'grab';
        }
    };

    APP.views.CursorView.prototype.deleteGrab = function (){
        if (this._cursorIs === 'grab'){
            this.canvas.classList.remove("cursor-grab");
            this._cursorIs = '';
        }
    };

    APP.views.CursorView.prototype.setGrabbing = function (){
        if (this._cursorIs !== 'grabbing'){
            this.canvas.classList.add("cursor-grabbing");
            this._cursorIs = 'grabbing';
        }
    };

    APP.views.CursorView.prototype.deleteGrabbing = function (){
        if (this._cursorIs === 'grabbing'){
            this.canvas.classList.remove("cursor-grabbing");
            this._cursorIs = '';
        }
    };

}(APP);