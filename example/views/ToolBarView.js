function ToolBarView(appInstance){

    var wrapper = document.createElement('div');

    /**
     * Переключатель инструментов
     * */

    var toolsDriver = appInstance.toolsDriver;
    var enabledToolName = 'DrawingToolController';

    toolsDriver.play(enabledToolName);

    var radioBox = new RadioBoxComponent(toolsDriver.getKeys(), enabledToolName);

    radioBox.addEventListener("userSelectTool", function(data){
        toolsDriver.play(data.detail.name);

        if (data.detail.name === 'EraserToolController'){
            appInstance.layersManager.dropLayersData();
        }

    }, false);

    wrapper.appendChild(radioBox);

    /**
     * Утилита: Задний фон для прозрачности
     * */
    var transparent = new App.tools.TransparentTool(appInstance, canvas);
    var checkBox = new CheckBoxComponent('TransparentTool');

    wrapper.appendChild(checkBox);

    checkBox.checked = true;
    transparent.start();

    checkBox.addEventListener('onChange', function(data){
        data.detail.checked
            ? transparent.start()
            : transparent.stop();
    });

    this.nodeElement = wrapper;
}