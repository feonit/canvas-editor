/**
 * Обеспечивает управление компонентами системы
 * */

var canvas = new Canvas();

document.body.appendChild(canvas);

layersManager = new LayersManager(canvas);

/**
 * Переключатель инструментов
 * */
!function(RadioBox, ToolsDriver, document, Object){
    var toolsDriver = new ToolsDriver(canvas);

    toolsDriver.plug(DrawingToolController);
    toolsDriver.plug(EraserToolController);
    toolsDriver.plug(DraggingToolController);

    var enabledToolName = 'DrawingToolController';

    toolsDriver.play(enabledToolName);

    var radioBox = new RadioBox(toolsDriver.getKeys(), enabledToolName);

    radioBox.addEventListener("userSelectTool", function(data){
        toolsDriver.play(data.detail.name);

        if (data.detail.name === 'EraserToolController'){
            layersManager.dropLayersData();
        }

    }, false);

    document.body.appendChild(radioBox);
}(RadioBox, ToolsDriver, document, Object);

/**
 * Утилита: Задний фон для прозрачности
 * */
!function(TransparentTool, CheckBox, document){
    var transparent = new TransparentTool(canvas);
    var checkBox = new CheckBox('TransparentTool');

    document.body.appendChild(checkBox);

    checkBox.addEventListener('onChange', function(data){
        data.detail.checked
            ? transparent.start()
            : transparent.stop();
    });
    checkBox.click();
}(TransparentTool, CheckBox, document);

/**
 * Утилита: Контрольные точки мыши
 * */
!function(Mouse, CheckBox, document){
    var mouse = new Mouse(canvas);

    var checkBox = new CheckBox('Look mouse event point');

    document.body.appendChild(checkBox);

    checkBox.addEventListener('onChange', function(data){
        data.detail.checked
            ? mouse.start()
            : mouse.stop();
    });
}(Mouse, CheckBox, document);