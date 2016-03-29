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
        var enabledTool = appInstance.settings.defaultToolConstructor || APP.controllers.DrawCurveController;

        toolsDriver.play(enabledTool);

        var map = {
            "Стерка": "EraserToolController",
            "Перенести": "DraggingToolController",
            "Рисовать Линию": "DrawCurveController",
            "Рисовать Эллипс": "-el",
            "Рисовать Прямоугольник": "-sq",
            "Рисовать Прямую": "-li",
            "Рисовать Стрелку": "-ar",
            "Рисовать Ломанную линию": "DrawBrokenVectorController",
            "Выделить/Удалить выделенное (Del)": "SelectToolController"
        };

        var modeName = "DrawCurveController";
        var radioBox = new RadioBoxComponent(map, modeName);

        radioBox.addEventListener("userSelectTool", function(data){

            switch (data.detail.name){
                case "DrawBrokenVectorController":
                    toolsDriver.play(APP.controllers.DrawBrokenVectorController);
                    break;

                case "DrawCurveController":
                    toolsDriver.play(APP.controllers.DrawCurveController);
                    break;

                case '-el':
                    appInstance.settings.drawingType = 'ELLIPSE_TYPE';
                    toolsDriver.play(APP.controllers.DrawSimpleVectorController);
                    break;

                case '-sq':
                    appInstance.settings.drawingType = 'RECTANGLE_TYPE';
                    toolsDriver.play(APP.controllers.DrawSimpleVectorController);

                    break;
                case '-li':
                    appInstance.settings.drawingType = 'LINE_TYPE';
                    toolsDriver.play(APP.controllers.DrawSimpleVectorController);
                    break;
                case '-ar':
                    appInstance.settings.drawingType = 'ARROW_TYPE';
                    toolsDriver.play(APP.controllers.DrawSimpleVectorController);
                    break;

                case 'SelectToolController':
                    toolsDriver.play(APP.controllers.SelectToolController);
                    break;

                case 'DraggingToolController':
                    toolsDriver.play(APP.controllers.DraggingToolController);
                    break;

                case 'EraserToolController':
                    toolsDriver.play(APP.controllers.EraserToolController);
                    break;

                default :
                    toolsDriver.play(data.detail.name);
            }


        }, false);

        wrapper.appendChild(radioBox);
    }

}(APP.CanvasEditor, window);
