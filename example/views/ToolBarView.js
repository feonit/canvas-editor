function ToolBarView(appInstance){

    var wrapper = document.createElement('div');
    wrapper.className = 'tool-bar';
    var name = document.createElement('div');
    name.innerHTML = 'Tool Bar';
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
        "Рисовать Стрелка": "DrawingToolController-ar",
        "Выделить/Удалить выделенное (Del)": "SelectToolController"
    };

    var modeName = "DrawingToolController-cu";
    var radioBox = new RadioBoxComponent(map, modeName || enabledToolName);

    radioBox.addEventListener("userSelectTool", function(data){

        if (data.detail.name === 'DrawingToolController-cu'){
            appInstance.options.drawingType = 'CURVE_TYPE';
            return toolsDriver.play("DrawingToolController");
        }

        if (data.detail.name === 'DrawingToolController-el'){
            appInstance.options.drawingType = 'ELLIPSE_TYPE';
            return toolsDriver.play("DrawingToolController");
        }

        if (data.detail.name === 'DrawingToolController-sq'){
            appInstance.options.drawingType = 'RECTANGLE_TYPE';
            return toolsDriver.play("DrawingToolController");
        }

        if (data.detail.name === 'DrawingToolController-li'){
            appInstance.options.drawingType = 'LINE_TYPE';
            return toolsDriver.play("DrawingToolController");
        }

        if (data.detail.name === 'DrawingToolController-ar'){
            appInstance.options.drawingType = 'ARROW_TYPE';
            return toolsDriver.play("DrawingToolController");
        }

        if (data.detail.name === 'SelectToolController'){
            return toolsDriver.play("SelectToolController");
        }

        toolsDriver.play(data.detail.name);

    }, false);

    wrapper.appendChild(radioBox);

    /**
     * Утилита: Задний фон для прозрачности
     * */
    var transparent = new CanvasEditor.ToolController.TransparentToolController(appInstance, appInstance.canvas);
    var checkBox = new CheckBoxComponent('Фон', true);

    transparent.start(appInstance.canvas);

    wrapper.appendChild(checkBox);

    checkBox.addEventListener('onChange', function(data){
        data.detail.checked
            ? transparent.start()
            : transparent.stop();
    });

    this.nodeElement = wrapper;
}