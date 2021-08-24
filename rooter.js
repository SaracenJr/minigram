
const linkAboutEl = document.querySelector('#linkAbout');
const linkContactsEl = document.querySelector('#linkContacts');

const centerContainerEl = document.querySelector('.centerContainer');
const rightSideEl = document.querySelector('.rightSidebar');

//const myInfoEl = linkAboutEl.querySelector('.myInfo');
//const aboutUsersEl = linkContactsEl.querySelector('.aboutUsers');
let url = 'about.html';
fetch(url)
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        centerContainerEl.innerHTML=data;
    })

const routes = {
    '/' : 'home',
    '/contacts' : 'contact',
    '/about' : 'about',
};

const rootDiv = document.getElementById('rootDiv');
rootDiv.innerHTML = routes[window.location.pathname];

const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    )
    rootDiv.innerHTML = routes[pathname];
}
window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname]
}
window.onload = event => {
    window["home"].addEventListener("click", onNavigate('home'));
    window["about"].addEventListener("click", onNavigate('about'));
    window["contacts"].addEventListener("click", onNavigate('contacts'));
}



function select_tab(id) {
    document.querySelectorAll(".route").forEach(
        item => item.classList.remove('selected'));
    document.querySelectorAll("#" + id).forEach(
        item => item.classList.add('selected'));
}
function load_content(id) {
    console.log("Loading content for {" + id + "}");
}
function push(event) {
    let id = event.target.id;

    select_tab(id);
    window.history.pushState({id},`${id}`,
        `/page/${id}/#/${id}`);

    load_content(id);


    //routes[location.hash]();
}
window.onload = event => {
    //window["home"].addEventListener("click", push)
    window["about"].addEventListener("click", push)
    window["contact"].addEventListener("click", push)
}

window.addEventListener("popstate", event => {

    let stateId = event.state.id;
    console.log(stateId);

    select_tab(stateId);

    load_content(stateId);
});
function showPage(page){

}
/*
const routes = {
    '#/about': () => linkAboutEl,
    '#/contacts': () => linkContactsEl,
    //'#home': () => showPage('home'),
}*/
