
const elToReg=document.querySelector('.containerToRegister');
const elToLog=document.querySelector('.containerToLogin');
const elToRegBtn=document.querySelector('.toRegisterBtn');
const elToLogBtn=document.querySelector('.toLoginBtn');
const mainContainerEl=document.querySelector('.mainContainer');

const moreInfoEl=document.querySelector('.moreInfo');
const quitBtnEl=document.querySelector('.quitBtn');
const elBeforeRegLog=document.querySelector('.beforeRegLog');
const allUsersEll=document.querySelector('.allUsers');

//const aboutUsersEl=document.querySelector('.aboutUsers');

const formContainersEl=document.getElementsByClassName('formContainer');
const formPopupsEl=document.getElementsByClassName('popup');

const firstInputLogEl=document.getElementById('firstInputLog');
const secondInputLogEl=document.getElementById('secondInputLog');
const firstInputRegEl=document.getElementById('firstInputReg');
const secondInputRegEl=document.getElementById('secondInputReg');
const thirdInputRegEl=document.getElementById('thirdInputReg');
const firstInputResetEl=document.getElementById('firstInputReset');
const secondInputResetEl=document.getElementById('secondInputReset');
const thirdInputResetEl=document.getElementById('thirdInputReset');
const rootEl = document.getElementById('root');

const welcomeP=document.querySelector('.welcomeP');
const userContainerEl=document.querySelector('.userContainer');

//const infoNameEl=document.querySelector('.infoName');
//const infoAgeEl=document.querySelector('.infoAge');
//const infoAboutEl=document.querySelector('.infoAbout');

const loginFormEl = document.getElementById('loginForm');
const regFormEl = document.getElementById('regForm');
const resetInfoFormEl = document.getElementById('resetInfoForm');

//const myInfoEl=document.querySelector(".myInfo");

const ageNameEl=document.querySelector(".ageName");

elToRegBtn.addEventListener('click', showPopup,false);
elToLogBtn.addEventListener('click', showPopup, false);

moreInfoEl.addEventListener('click', showMore, false);

loginFormEl.addEventListener('submit', check, false);
regFormEl.addEventListener('submit', check, false);
resetInfoFormEl.addEventListener('submit', resetInfo, false);

quitBtnEl.addEventListener('click', quit, false);

document.addEventListener('DOMContentLoaded', contentLoad, false);

function resetInfo(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.currentTarget);
    let userEmail = JSON.parse(localStorage.getItem('logged')).email;
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users.find((user) => user.email === event.currentTarget.getAttribute('userId'));

    if(firstInputResetEl.value !== ''){
        user.name = firstInputResetEl.value;
    }
    if(secondInputResetEl.value !== ''){
        user.age = secondInputResetEl.value;
    }
    if(thirdInputResetEl.value !== ''){
        user.about = thirdInputResetEl.value;
    }

    localStorage.setItem('users', JSON.stringify(users));
    remClass(resetInfoFormEl, "showPopup");

    if(userEmail===event.currentTarget.getAttribute('userId')){
        setInfo();
    }
}
function setInfo(){

    let userEmail = JSON.parse(localStorage.getItem('logged')).email;
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users.find((user) => user.email === userEmail);

    if(user.name === undefined){
        user.name = 'no name';
    }
    if(user.age === undefined){
        user.age = 'no age';
    }
    if(user.about === undefined){
        user.about = 'no about';
    }
    ageNameEl.innerHTML='Name: '+user.name+', Age: '+user.age;
    //infoNameEl.innerHTML=user.name;
    //infoAgeEl.innerHTML=user.age
    //infoAboutEl.innerHTML=user.about;
    localStorage.setItem('users', JSON.stringify(users));
}
function showMore(event){
    event.preventDefault();
    event.stopPropagation();

   // myInfoEl.classList.toggle("hiddenEl");
}

function addAboutUsers() {
    //aboutUsersEl.innerHTML='';
    let users = JSON.parse(localStorage.getItem('users'));
    for(let user of users){
        createUserBlock(user);
    }
}
function createUserBlock(user){
    const userInfoBlock = document.createElement('div');
    userInfoBlock.classList.add("userInfo");
    userInfoBlock.classList.add("user_"+user.email);
    const userInfoTxt = document.createElement('p');
    userInfoTxt.classList.add("userInfoTxt");
    const userBtn = document.createElement('div');
    userBtn.classList.add("userBtn");
    userBtn.classList.add("user_"+user.email);
    const resetInfoBtn = document.createElement('button');
    resetInfoBtn.innerText = 'Reset';
    resetInfoBtn.classList.add("resetInfoBtn");
    resetInfoBtn.name = "resetInfoBtn";
    resetInfoBtn.setAttribute('action', 'resetInfoBtn');
    resetInfoBtn.setAttribute('userId', user.email);

    resetInfoBtn.addEventListener('click', showPopup, false);

    const deleteBtn =document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.name = "deleteBtn";
    deleteBtn.setAttribute('action', 'deleteBtn');
    deleteBtn.setAttribute('userId', user.email);

    deleteBtn.addEventListener('click', deleteAccount, false);

    let article=document.createElement('article');
    article.classList.add("article");

    userInfoBlock.append(userInfoTxt);
    article.append(userInfoBlock);
    userBtn.append(resetInfoBtn);
    userBtn.append(deleteBtn);
    article.append(userBtn);

    userInfoTxt.innerHTML = 'Email: '+user.email+', Name: '+user.name+', Age:'+user.age;

    //aboutUsersEl.append(article);
}

function deleteAccount(event){
    event.preventDefault();
    event.stopPropagation();

    let userEmail = JSON.parse(localStorage.getItem('logged')).email;
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users.find((user) => user.email === event.currentTarget.getAttribute('userId'));
    const filteredUsers = users.filter((item) => item.email !== user.email);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    if(userEmail===event.currentTarget.getAttribute('userId')){
        quit();
    } else {
        addAboutUsers();
        console.log('delete');
    }
}
function allUsers(){
    let usersLog = JSON.parse(localStorage.getItem('users'));
    allUsersEll.innerHTML='';
    for (let userLog of usersLog) {
        let li = document.createElement("li");
        li.innerText = userLog.email;
        allUsersEll.append(li);
    }
}
function contentLoad(event) {
    event.preventDefault();
    event.stopPropagation();
    let logData = JSON.parse(localStorage.getItem('logged'));
    allUsers();
    if (logData !== null) {
        addClass(elToReg, "hiddenEl");
        addClass(elToLog, "hiddenEl");
        addClass(elBeforeRegLog, "hiddenEl");
        addClass(welcomeP, "hiddenEl");

        remClass(userContainerEl, "hiddenEl");
       // remClass(aboutUsersEl, "hiddenEl");
        remClass(rootEl, "hiddenEl");
        setInfo();
        addAboutUsers();

    }
}
function showPopup(event){
    event.preventDefault()
    event.stopPropagation();
    console.log(event.currentTarget);

    addClass(elBeforeRegLog, "hiddenEl");
    for(const formPopupEl of formPopupsEl){
        formPopupEl.reset();
    }
    if(event.currentTarget===elToLogBtn){
        addClass(loginFormEl, "showPopup");
        remClass(regFormEl, "showPopup");
        addClass(mainContainerEl, "blurContainer");
    } else if(event.currentTarget===elToRegBtn){
        addClass(regFormEl, "showPopup");
        remClass(loginFormEl, "showPopup");
        addClass(mainContainerEl, "blurContainer");
    } else if(event.currentTarget.getAttribute('action')==="resetInfoBtn"){
        addClass(resetInfoFormEl, "showPopup");
        resetInfoFormEl.setAttribute('userId', event.currentTarget.getAttribute('userId'));
    }
    removeErrors();

}
function removeErrors(){
    for(const formContainer of formContainersEl){
        remClass(formContainer, "has-error");
    }
}
function remClass(element, $class){
    element.classList.remove($class);
}
function addClass(element, $class){
    element.classList.add($class);
}
function quit(){
    localStorage.removeItem('logged');
    allUsers();

    remClass(welcomeP, "hiddenEl");
    //addClass(myInfoEl,"hiddenEl");
    addClass(rootEl, "hiddenEl");
    addClass(userContainerEl, "hiddenEl");
    //addClass(aboutUsersEl, "hiddenEl");
    remClass(elToReg, "hiddenEl");
    remClass(elToLog, "hiddenEl");
    remClass(elBeforeRegLog, "hiddenEl");
}
function check(event) {
    event.preventDefault();

    const form = event.target;
    let isFormValid = checkForm(form);
    if (isFormValid) {
        if (form === loginFormEl) {
            remClass(loginFormEl, "showPopup");
            addClass(elToReg, "hiddenEl");
            addClass(elToLog, "hiddenEl");
            addClass(welcomeP, "hiddenEl");
            remClass(rootEl, "hiddenEl");
            remClass(userContainerEl, "hiddenEl");
            remClass(mainContainerEl,"blurContainer");
            //remClass(aboutUsersEl, "hiddenEl");


            let email = firstInputLogEl.value;
            let logData = {
                email: email,
            }
            localStorage.setItem('logged', JSON.stringify(logData));
            firstInputLogEl.value = '';
            secondInputLogEl.value = '';

            setInfo();
            addAboutUsers();

        } else if (form === regFormEl) {
            let email = firstInputRegEl.value;
            let password = secondInputRegEl.value;
            let users = localStorage.getItem('users');
            users === null ? (users = []) : (users = JSON.parse(users));
            let isDubble = isNotDublicate(users, email);
            if(isDubble){
                users.push({
                    email: email,
                    password: password,
                })
                alert("registration completed successfully");
            }
            localStorage.setItem('users', JSON.stringify(users));
            secondInputRegEl.value = '';
            firstInputRegEl.value = '';
            thirdInputRegEl.value = '';

            addClass(loginFormEl, "showPopup");
            remClass(regFormEl, "showPopup");

        }
    }else {
        console.log('not valid');
    }
}
function checkForm(form){
    let valid = true;
    const inputs = form.querySelectorAll('.formInput');
    inputs.forEach((input) => {
        if (input.dataset.validators) {
            input.validators = createValidators(input);
        }
    });
    inputs.forEach((input) => {
        let isInputValid = checkInput(input);
        if(!isInputValid){
            valid = false;
        }
    })
    return valid;
}
function checkInput(input) {
    let inputMessage = 'valid';
    const container = input.closest('.formContainer');
    const value = input.value;
    remClass(container, "has-error");
    //container.classList.remove('has-error');

    if (input.dataset.validators) {
        input.validators.forEach((validator) => {
            remClass(container, `error--${validator.name}`);
            //container.classList.remove();
            if (validate[validator.name](value, validator.param)
                &&
                inputMessage === 'valid') {
                inputMessage = `error--${validator.name}`;
                addClass(container, 'has-error');
                addClass(container, inputMessage);
                //container.classList.add();
                //container.classList.add();
            }
        })
    }
    return inputMessage === 'valid';
}
function createValidators(input) {
    const validators = [];
    input.dataset.validators.split(',').map((validator) => {
        let validatorStr = validator.trim();
        const name = validatorStr.split('(')[0];
        const param = validatorStr.split(/[()]/)[1];
        validators.push({
            name,
            param,
        })
    })
    return validators;
}
function checkEmailPassword() {
    let usersLog = JSON.parse(localStorage.getItem('users'));
    for (let userLog of usersLog) {
        if (firstInputLogEl.value === userLog.email
            &&
            secondInputLogEl.value === userLog.password) {
            return false;
        }
    }
    return true;
}
function isNotDublicate(items, email){
    let valid = true;
    let user = items.find((user) => user.email === email);
    if(user!==undefined){
        valid = false;
        alert('there is already an account with this name');
    }
    return valid;
}
const validate = {
    'required': (value) => !!(value.length===0),
    'min-length': (value, param) => !!(value.length < param && value.length !== 0),
    'confirm-password': (value, param) => !!(value !== document.querySelector(param).value),
    'check-email-password': (value) => !!checkEmailPassword(),
}

