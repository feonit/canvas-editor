!function(CanvasEditor, global){

    global.UtilsBarView = function (appInstance){

        var wrapper = document.createElement('div');
        wrapper.className = 'tool-bar';
        var name = document.createElement('div');
        name.innerHTML = 'Утилиты:';
        wrapper.appendChild(name);


        !function(){

            /**
             * Утилита: Задний фон для прозрачности
             * */
            var util = new CanvasEditor.ToolController.TransparentUtilController(appInstance, appInstance.canvas);
            var checkBox = new CheckBoxComponent('Фон', true);

            util.start(appInstance.canvas);

            wrapper.appendChild(checkBox);

            checkBox.addEventListener('onChange', function(data){
                data.detail.checked ? util.start() : util.stop();
            });

        }();

        /**
         * Утилита: сохранение на сервер
         * */
        !function(){
            var isEnabled = false;

            var util = new CanvasEditor.ToolController.SaveServerUtilController(appInstance, appInstance.canvas);
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
            var isEnabled = false;

            var util = new CanvasEditor.ToolController.SaveLocalUtilController(appInstance, appInstance.canvas);
            var checkBox = new CheckBoxComponent('Автосохранение локально', isEnabled);

            if (isEnabled){
                util.start(appInstance, appInstance.canvas);
            }

            wrapper.appendChild(checkBox);

            checkBox.classList.add('todo');

            checkBox.addEventListener('onChange', function(data){
                data.detail.checked ? util.start() : util.stop();
            });

        }();

        /**
         * Утилита: Рендомный значения
         * */
        !function(){
            var isEnabled = false;

            var util = new CanvasEditor.ToolController.RandomOptionsController(appInstance, appInstance.canvas);
            var checkBox = new CheckBoxComponent('Случайные значения опций', isEnabled);

            if (isEnabled){
                util.start(appInstance, appInstance.canvas);
            }

            wrapper.appendChild(checkBox);

            checkBox.addEventListener('onChange', function(data){
                data.detail.checked ? util.start() : util.stop();
            });

        }();

        /**
         * Утилита: Курсор
         * */
        !function(){
            var isEnabled = false;

            var util = new CanvasEditor.ToolController.CursorOptionsUtilController(appInstance, appInstance.canvas);
            var checkBox = new CheckBoxComponent('Курсор', isEnabled);

            if (isEnabled){
                util.start(appInstance, appInstance.canvas);
            }

            wrapper.appendChild(checkBox);

            checkBox.classList.add('todo');

            checkBox.addEventListener('onChange', function(data){
                data.detail.checked ? util.start() : util.stop();
            });

        }();


        this.nodeElement = wrapper;
    }

}(CanvasEditor, window);

