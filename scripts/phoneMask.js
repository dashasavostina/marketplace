    let phoneInput = document.querySelector('.content__input_phone');

    function onPhoneInput(e) {
        const input = e.target;
        let inputValue = inputNumberValue(input);
        let formatedInput = "";
        let selectionStart = input.selectionStart;
        if (!inputValue) {
            return input.value = "";
        }
        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputValue[0]) > -1) {
         if (inputValue[0] == "9") inputValue = "7" + inputValue;
        let firstSymbol = (inputValue[0] == "8") ? "8" : "+7";
        formatedInput = firstSymbol + " ";
        if (inputValue.length > 1) {
            formatedInput += "(" + inputValue.substring(1,4);
        }
        if (inputValue.length >= 5) {
            formatedInput += ") " + inputValue.substring(4,7);
        }
        if (inputValue.length >= 8) {
            formatedInput += "-" + inputValue.substring(7,9);
        }
        if (inputValue.length >= 10) {
            formatedInput += "-" + inputValue.substring(9,11);
        }
        } else {
            formatedInput = "+" + inputValue;
        }
        input.value = formatedInput;
    }

    function inputNumberValue(input) {
return input.value.replace(/\D/g, "");
    }

function onPhoneKeydown(e) {
    const input = e.target;
if (e.keyCode == 8 && inputNumberValue(input).length == 1) {
    input.value = "";
}
}

function onPhonePaste(e) {
    const pasted = e.clipboardData || window.clipboardData;
    const input = e.target;
    const inputValue = inputNumberValue(input);
    if (pasted) {
        const pastedText = pasted.getData("Text");
        if (/\D/g.test(pastedText)) {
            input.value = inputValue;
        }
    }
}

    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener('keydown', onPhoneKeydown);
    phoneInput.addEventListener('paste', onPhonePaste);


    


