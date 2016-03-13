!function(CanvasEditor, global){

    global.ToolBarView = function (appInstance){

        var wrapper = this.nodeElement = document.createElement('div');
        wrapper.className = 'tool-bar';
        var name = document.createElement('div');
        name.innerHTML = 'Инструменты:';
        wrapper.appendChild(name);

        /**
         * Переключатель инструментов
         * */

        var toolsDriver = appInstance.toolsDriver;
        var enabledToolName = 'DrawingToolController';

        toolsDriver.play(enabledToolName);

        var map = {
            "Стерка": "EraserToolController",
            "Перенести": "DraggingToolController",
            "Рисовать Линию": "DrawingToolController-cu",
            "Рисовать Эллипс": "DrawingToolController-el",
            "Рисовать Прямоугольник": "DrawingToolController-sq",
            "Рисовать Прямую": "DrawingToolController-li",
            "Рисовать Стрелку": "DrawingToolController-ar",
            "Выделить/Удалить выделенное (Del)": "SelectToolController"
        };

        var modeName = "DrawingToolController-cu";
        var radioBox = new RadioBoxComponent(map, modeName || enabledToolName);

        radioBox.addEventListener("userSelectTool", function(data){

            switch (data.detail.name){
                case 'DrawingToolController-cu':
                    toolsDriver.play("DrawingToolController");
                    appInstance.settings.drawingType = 'CURVE_TYPE';
                    break;

                case 'DrawingToolController-el':
                    appInstance.settings.drawingType = 'ELLIPSE_TYPE';
                    toolsDriver.play("DrawingToolController");
                    break;

                case 'DrawingToolController-sq':
                    appInstance.settings.drawingType = 'RECTANGLE_TYPE';
                    toolsDriver.play("DrawingToolController");

                    break;
                case 'DrawingToolController-li':
                    appInstance.settings.drawingType = 'LINE_TYPE';
                    toolsDriver.play("DrawingToolController");
                    break;
                case 'DrawingToolController-ar':
                    appInstance.settings.drawingType = 'ARROW_TYPE';
                    toolsDriver.play("DrawingToolController");
                    break;

                case 'SelectToolController':
                    toolsDriver.play("SelectToolController");
                    break;

                default :
                    toolsDriver.play(data.detail.name);
            }


        }, false);

        wrapper.appendChild(radioBox);
    }

}(CanvasEditor, window);
