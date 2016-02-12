/**
 * @type {HTMLElement}
 * */
function InputColor(){

    var API = {
        userSelectColor: {
            detail: {
                color: null
            }
        }
    };


    var input = document.createElement('input');
    input.type = 'color';

    var event = function (event){
        API.userSelectColor.detail.color = event.target.value.replace('#', '');
        input.dispatchEvent(new CustomEvent("userSelectColor", API["userSelectColor"]));
    };

    input.addEventListener('change', event, false);

    return input;
}