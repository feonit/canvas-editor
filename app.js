/**
 * Обеспечивает управление компонентами системы
 * */

var canvas = new Canvas();

document.body.appendChild(canvas);

layersManager = new LayersManager(canvas);

APP = {};

APP.CREATED_REGION = 'CREATED_REGION';

APP.newEvent = function(eventName, data){
    if (eventName === APP.CREATED_REGION){
        var regionObject = RegionObject.createRegion.apply(null, data);
        regionObject.layout = this.lastLayout;
        layersManager.addRegion(regionObject);
    }
};


/**
 * Переключатель инструментов
 * */
!function(RadioBox, ToolsDriver, document, Object){
    var toolsDriver = new ToolsDriver(canvas);

    toolsDriver.plug(DrawingToolController);
    toolsDriver.plug(EraserToolController);
    toolsDriver.plug(DraggingToolController);
    toolsDriver.plug(FigureToolController);

    var enabledToolName = 'FigureToolController';

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