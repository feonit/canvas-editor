!function(APP){
    APP.namespace('APP.controllers');
    var ToolController = APP.controllers.ToolController;

    APP.controllers.SaveServerUtilController = function (appInstance, canvas){

        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        }

        function submitFile(blob){
            // Create a new FormData object.
            var formData = new FormData();
            var name = (Date.now()).toString();

            formData.append('photo', blob, name);

            var xhr = new XMLHttpRequest();

            xhr.open('POST', 'upload', true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // File(s) uploaded.
                } else {
                    //alert('An error occurred!');
                }
            };

            // Send the Data.
            xhr.send(formData);
        }

        this._saveToServer = function(){
            var blob = dataURItoBlob(canvas.toDataURL("image/png", {}));
            console.log(blob.size/1000 + ' kb');
            submitFile(blob);
        };

        this.start = function(){
            appInstance.mediator.subscribe(appInstance.UPDATE_CANVAS, this._saveToServer);
        };
        this.stop = function(){
            appInstance.mediator.unsubscribe(appInstance.UPDATE_CANVAS, this._saveToServer);
        };
    }
    APP.controllers.SaveServerUtilController.prototype = Object.create(ToolController);
    APP.controllers.SaveServerUtilController.prototype.constructor = APP.controllers.SaveServerUtilController;
}(APP);