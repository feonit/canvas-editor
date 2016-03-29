!function(global){

    /**
     * @type {HTMLElement}
     * @param {number} value
     * */
    global.InputSliderComponent = function (value){

        var API = {
            userSelectWidth: {
                detail: {
                    width: null
                }
            }
        };


        var input = document.createElement('input');
        input.type = 'range';
        input.min = 3;
        input.max = 30;
        input.value = value;

        var event = function (event){
            API.userSelectWidth.detail.width = parseInt(event.target.value, 10);
            input.dispatchEvent(new CustomEvent("userSelectWidth", API["userSelectWidth"]));
        };

        input.addEventListener('change', event, false);

        return input;
    }

}(window);