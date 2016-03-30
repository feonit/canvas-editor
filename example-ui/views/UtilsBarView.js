!function(global){

    global.UtilsBarView = function (appInstance, APP){

        var wrapper = document.createElement('div');
        wrapper.className = 'tool-bar';
        var name = document.createElement('div');
        name.innerHTML = 'Утилиты:';
        wrapper.appendChild(name);

        /**
         * Утилита: сохранение на сервер
         * */
        !function(){
            var isEnabled = false;

            var util = new APP.utils.SaveServerUtilController(appInstance, appInstance.canvas);
            var checkBox = new CheckBoxComponent('Автосохранение на сервер', isEnabled);

            if (isEnabled){
                util.start(appInstance, appInstance.canvas);
            }

            wrapper.appendChild(checkBox);

            checkBox.addEventListener('onChange', function(data){
                data.detail.checked ? util.start() : util.stop();
            });

        }();

        /**
         * Утилита: Сохранение локально
         * */
        !function(){
            var isEnabled = appInstance.configuration.storageEnabled;

            var util = new APP.utils.SaveLocalUtilController(appInstance, appInstance.canvas);
            var checkBox = new CheckBoxComponent('Автосохранение локально', isEnabled);

            if (isEnabled){
                util.start(appInstance, appInstance.canvas);
            }

            wrapper.appendChild(checkBox);

            checkBox.addEventListener('onChange', function(data){
                data.detail.checked ? util.start() : util.stop();
            });

        }();


        this.nodeElement = wrapper;
    }

}(window);

