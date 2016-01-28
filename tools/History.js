function HistoryRecords(){

    var cloneObject = function(obj){
        return JSON.parse((JSON.stringify(obj)));
    };

    var isUndefined = function(src){
        return typeof src === "undefiend";
    };

    var _index = undefined;
    var _history = [];

    /**
     * Добавить новую кривую
     * */
    this.add = function(item){
        _history.push(item);

        if (!isUndefined(_index)){
            _history.splice(_index, _history.length);
            _index = undefined;
        }
    };

    /**
     * Удалить последнюю кривую
     * */
    this.deleteLastRecord = function(){
        _history.pop();
    };

    /**
     * Сместить указатель назад
     * */
    this.undo = function(){
        if (isUndefined(_index)){
            _index = _history.length;
        }
        if (_index !== 0){
            return _index;
        } else {
            return false;
        }
    };

    /**
     * @return {Number|Boolean} current index or false if no change has happened
     * */
    this.redo = function(){
        if (_index < _history.length){
            return _index++;
        } else {
            return false;
        }
    };

    /**
     * return {Array}
     * */
    this.get = function(){
        return cloneObject( !isUndefined(_index)
            ? _history
            : _history.slice(0, _index));
    }
}

//
//document.getElementById('cancel').addEventListener('click', function(event){
//    canvasDecorator.clear();
//
//    var xhr = new XMLHttpRequest();
//    xhr.open('GET', '/clear', true);
//    xhr.send();
//}, false);
//document.getElementById('undo').addEventListener('click', function(event){
//    historyRecords.undo();
//    var images = historyRecords.get().map(function(record){ return record.image });
//}, false);
//
//document.getElementById('redo').addEventListener('click', function(event){
//    historyRecords.redo();
//}, false);

//historyRecords.add({
//    pointsCollection: pointsCollection,
//});