/**
 * View of collection input-radio
 * @class RadioBox
 * @param {string[]} names — Массив имен инструментов
 * */
function RadioBox(names, selectedOf){

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
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'radio-box');
        input.setAttribute('value', name);
        wrapper.appendChild(input);

        var text = document.createElement('span');
        text.innerText = name;
        wrapper.appendChild(text);

        if (name === selectedOf) input.setAttribute('checked', 'checked');

        input.addEventListener('click', onClick, false);
    });

    return wrapper;
}