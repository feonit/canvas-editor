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

    toolsDriver.plug(DrawingTool);
    toolsDriver.plug(EraserTool);
    toolsDriver.plug(DraggingTool);

    var enabledToolName = 'DrawingTool';

    var draw = toolsDriver.getToolByName('DrawingTool');
    var regionTool = toolsDriver.getToolByName('DraggingTool');

    function newLayout(layout, point){
        var regionObject = RegionObject.createRegion(point[0], point[1], canvas);
        regionObject.layout = layout;

        layersManager.addRegion(regionObject);
    }

    Object.observe(draw, function(changes){
        changes.forEach(function(change) {
            if (change.name === 'lastLayout') {
                newLayout(draw.lastLayout, draw.lastLayoutExamplePoint);
            }
        });
    });

    toolsDriver.play(enabledToolName);

    var radioBox = new RadioBox(toolsDriver.getKeys(), enabledToolName);

    radioBox.addEventListener("userSelectTool", function(data){
        toolsDriver.play(data.detail.name);

        if (data.detail.name === 'EraserTool'){
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