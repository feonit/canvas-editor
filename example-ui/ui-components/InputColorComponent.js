!function(global){

    /**
     * @type {HTMLElement}
     * @param {string} value
     * */
    global.InputColorComponent = function (color){

        var API = {
            userSelectColor: {
                detail: {
                    color: null
                }
            }
        };


        var input = document.createElement('input');
        input.type = 'color';
        input.value = '#' + color || "#000033";

        var event = function (event){
            API.userSelectColor.detail.color = event.target.value.replace('#', '');
            input.dispatchEvent(new CustomEvent("userSelectColor", API["userSelectColor"]));
        };

        input.addEventListener('change', event, false);

        return input;
    }

}(window);