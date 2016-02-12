function DrawingToolOptionsView(defaults){

    // hex
    this.color = 'red'; //default value

    this.nodeElement = null;

    var wrapper = document.createElement('label');
    var colorComponent = InputColor();

    var text = document.createElement('span');
    text.textContent = 'Изменить цвет для drawwingToll';
    wrapper.appendChild(text);

    wrapper.appendChild(colorComponent);

    var that = this;

    colorComponent.addEventListener("userSelectColor", function(data){
        that.color = data.detail.color;
    }, false);

    this.nodeElement = wrapper;
}