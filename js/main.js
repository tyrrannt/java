function regxpText() {
    document.querySelectorAll(".src").forEach(elem => {
        let str = elem.innerHTML;
        let regexpAllPoints = new RegExp('\'', 'gm');
        let regexpReturnApostroph = /([a-zа-яё])\"([a-zа-яё])/gmi;
        let newstr = str.replace(regexpAllPoints, '"');
        newstr = newstr.replace(regexpReturnApostroph, '$1\'$2');
        elem.innerHTML = newstr;
    })
}
document.getElementById('check').addEventListener("click", regxpText);

function check(elem, event) {
    for (let el of elem) {
        if (el[1].match(el[2])) {
            field = document.getElementsByName(el[0])[0];
            field.classList.replace('invalid', 'valid');
        }
        else {
            field = document.getElementsByName(el[0])[0];
            field.classList.replace('valid', 'invalid');
            event.preventDefault();
        }
    }
}

function valideForm(event) {
    let elem = [
        ['name', document.getElementsByName('name')[0].value, /^[a-zа-яё]+$/gi],
        ['email', document.getElementsByName('email')[0].value, /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/],
        ['phone', document.getElementsByName('phone')[0].value, /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{2}){2}$/]
    ]
    check(elem, event)
    
}
document.getElementById('checkMe').addEventListener("click", valideForm);