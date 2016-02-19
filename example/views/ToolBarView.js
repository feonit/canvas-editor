function ToolBarView(appInstance){

    var wrapper = document.createElement('div');

    /**
     * Переключатель инструментов
     * */

    var toolsDriver = appInstance.toolsDriver;
    var enabledToolName = 'DrawingToolController';

    toolsDriver.play(enabledToolName);

    var map = {
        "Рисовать линию": "DrawingToolController",
        "Стерка": "EraserToolController",
        "Перенести": "DraggingToolController",
        "Фигура Эллипс": "FigureToolController-el",
        "Фигура Прямоугольник": "FigureToolController-sq",
    };

    var radioBox = new RadioBoxComponent(map, enabledToolName);

    radioBox.addEventListener("userSelectTool", function(data){

        if (data.detail.name === 'EraserToolController'){
            appInstance.layersManager.dropLayersData();
        }

        if (data.detail.name === 'FigureToolController-el'){
            appInstance.options.figureType = 'ELLIPSE_TYPE';
            return toolsDriver.play("FigureToolController");
        }

        if (data.detail.name === 'FigureToolController-sq'){
            appInstance.options.figureType = 'RECTANGLE_TYPE';
            return toolsDriver.play("FigureToolController");
        }

        toolsDriver.play(data.detail.name);

    }, false);

    wrapper.appendChild(radioBox);

    /**
     * Утилита: Задний фон для прозрачности
     * */
    var transparent = new CanvasEditor.ToolController.TransparentToolController(appInstance, canvas);
    var checkBox = new CheckBoxComponent('Фон', true);

    transparent.start();

    wrapper.appendChild(checkBox);

    checkBox.addEventListener('onChange', function(data){
        data.detail.checked
            ? transparent.start()
            : transparent.stop();
    });

    this.nodeElement = wrapper;
}