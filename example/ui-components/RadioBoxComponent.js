!function(global){

    global.RadioBoxComponent = RadioBoxComponent;

    /**
     * View of collection input-radio
     * @type {HTMLElement}
     * @param {string[]} names — Массив имен инструментов
     * */
    function RadioBoxComponent(names, selectedOf){
        var API = {
            userSelectTool: {
                detail: {
                    name: null
                }
            }
        };

        var wrapper = document.createElement('div');
        var onClick = function (event){
            API.userSelectTool.detail.name = event.target.value;
            wrapper.dispatchEvent(new CustomEvent("userSelectTool", API["userSelectTool"]));
        };

        names.forEach(function(name, i){
            var input = document.createElement('input');
            var label = document.createElement('label');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'radio-box');
            input.setAttribute('value', name);
            label.appendChild(input);

            var text = document.createElement('span');
            text.innerText = name;
            label.appendChild(text);

            if (name === selectedOf) input.setAttribute('checked', 'checked');

            input.addEventListener('click', onClick, false);

            wrapper.appendChild(label);
        });

        return wrapper;
    }

}(window);