/**
 * Обеспечивает управление компонентами системы
 * */

var canvas = new Canvas();

document.body.appendChild(canvas);

pxRegion = new PixelMap(canvas.width, canvas.height);

//var ctx=canvas.getContext("2d");
//ctx.fillStyle = 'red';
//ctx.fillRect(20,20,150,100);

/**
 * Переключатель инструментов
 * */
!function(RadioBox, ToolsDriver, document, Object){
    var toolsDriver = new ToolsDriver(canvas);

    toolsDriver.plug(Draw);
    toolsDriver.plug(Eraser);
    toolsDriver.plug(RegionTool);

    var enabledToolName = 'RegionTool';

    var draw = toolsDriver.getToolByName('Draw');
    var regionTool = toolsDriver.getToolByName('RegionTool');

    function newLayout(layout, point){
        var regionObject = regionTool.createRegionByPointAtCanvas(point[0], point[1], canvas);
        regionObject.layout = layout;

        regionTool.addRegion(regionObject);

        pxRegion.addRegion(regionObject);
    }

    Object.observe(draw, function(changes){
        changes.forEach(function(change) {
            if (change.name === 'lastLayout') {
                newLayout(draw.lastLayout, draw.lastLayoutExamplePoint);
            }
        });
    });

    toolsDriver.play(enabledToolName);
    //canvasToolManager.plug(File);
    //canvasToolManager.plug(History);
    //canvasToolManager.plug(Loupe);

    var radioBox = new RadioBox(toolsDriver.getKeys(), enabledToolName);

    radioBox.addEventListener("userSelectTool", function(data){
        toolsDriver.play(data.detail.name);
    }, false);

    document.body.appendChild(radioBox);
}(RadioBox, ToolsDriver, document, Object);

/**
 * Утилита: Задний фон для прозрачности
 * */
!function(Transparent, CheckBox, document){
    var transparent = new Transparent(canvas);
    var checkBox = new CheckBox('Transparent');

    document.body.appendChild(checkBox);

    checkBox.addEventListener('onChange', function(data){
        data.detail.checked
            ? transparent.start()
            : transparent.stop();
    });
    checkBox.click();
}(Transparent, CheckBox, document);

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