function CheckBox(name){

    var API = {
        onChange : {
            detail: {
                checked : null
            }
        }
    };

    var input = document.createElement('input'),
    label = document.createElement('label'),
    span = document.createElement('span'),
    onChange = function (event){
        API.onChange.detail.checked = event.target.checked;

        label.dispatchEvent(new CustomEvent("onChange", API['onChange'] ));
    };

    span.innerText = name;
    label.appendChild(input);
    label.appendChild(span);
    input.setAttribute('name', 'check-box');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', name);
    input.addEventListener('change', onChange, false);
    return label;
}