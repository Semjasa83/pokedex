
function onload() {
    load();
    renderAll();
}

// posts

function renderAll() {
    document.getElementById('article-cmpl').innerHTML = '';
    
    for (let i = 0; i < posts.length; i++) {
        console.log(posts[i].comments);
        document.getElementById('article-cmpl').innerHTML += templateArticles(posts[i], i);
    }
}

// comment Section

function postComment(index) {
    let com = document.getElementById(`comment-input-${index}`);

    if (com.value.length == 0) {
        alert ('bitte Text eingeben');
    } else {
        posts[index].comments.push(com.value);
        save(); 
        com.value = ``;
    }
    renderAll();
}

function generateComments(index) {
    let htmlCode = '';
    
    for (let i = 0; i < posts[index].comments.length; i++) {
        htmlCode += `
        <div class="article-direction">
        <span><b>${loggedAuthor}</b></span>  <span>${posts[index].comments[i]}</span>
        </div>
        `
    }
    return htmlCode;

}

// save at local storage

function save() {
    let postsAsText = JSON.stringify(posts); // komplette json speichern
    localStorage.setItem('comments', postsAsText);
}

// load from local Storage

function load() {
    // let postsAsText = localStorage.getItem(posts[comments]);
    let postsAsText = localStorage.getItem('comments', posts);
    if(postsAsText)
        {posts = JSON.parse(postsAsText);}
}

// Article Render

function templateArticles(post, index) {
    return /*html*/`
    <div class="article-spacer">
        <div class="article-headline">
            <div class="article-info">
                <img src="${post['pimage']}" class="middle-profile pointer">
                <div class="article-additional">
                    <span class="author-name"><b>${post['author']}</b></span>
                    <span class="author-location">${post['location']}</span>
                </div>
            </div>
            <button class="article-delete"><b>•••</b></button>
        </div>

        <div class="article-content">
            <img src="${post['image']}" class="article-main-picture">
            <div class="article-menu">
                <div class="article-menu-spacer">
                    <img class="icons" src="img/icons/favorite.png">
                    <img class="icons" src="img/icons/comments.png">
                    <img class="icons" src="img/icons/telegram.png">
                </div>
                <img class="icons" src="img/icons/bookmark.png">
            </div>
            <div class="article-text">
             ${post['description']}
            </div>
        </div>

        <div class="article-comment-section">
            <div class="article-comments" id="gen-com">
                ${generateComments(index)}
            </div>
            <div class="article-comment-post">
                <input id="comment-input-${index}" class="comment-spacer" type="text" placeholder="kommentieren ...">
                <button class="comment-submit pointer" onclick=postComment(${index})>senden</button>
            </div>
        </div>
    </div>
`}

let images = ['img/01.jpg', 'img/02.jpg', 'img/03.jpg', 'img/04.jpg', 'img/05.jpg', 'img/06.jpg', 'img/07.jpg', 'img/08.jpg', 'img/09.jpg', 'img/10.jpg', 'img/11.jpg', 'img/12.jpg', 'img/13.jpg', 'img/14.jpg',
    'img/15.jpg', 'img/16.jpg', 'img/17.jpg', 'img/18.jpg', 'img/19.jpg', 'img/20.jpg', 'img/21.jpg', 'img/22.jpg', 'img/23.jpg', 'img/24.jpg', 'img/25.jpg', 'img/26.jpg', 'img/27.jpg', 'img/28.jpg', 'img/29.jpg', 'img/30.jpg',];


function load() {
    let img = document.getElementById('fotogalerie');
    img.innerHTML = '';
    for (let i = 0; i < images.length; i++) {        
        img.innerHTML += /*html*/`
            <div class="img-box">
                <img src="${images[i]}" id="foto" onclick=openImg(${i})>
            </div>
        `;
}}


//Overlay öffnen
function openImg(i) { 
    
    let overlay = document.getElementById('overlay');
    let body = document.body;
    overlay.classList.remove('d-none'); // Overlay BGR einblenden
    body.classList.add('overflow');
    overlay.innerHTML = templateOverlay(i); // template siehe unten    
}


//Overlay schliessen
function closeImg() { 
    let overlay = document.getElementById('overlay');
    let body = document.body;
    overlay.classList.add('d-none');
    body.classList.remove('overflow');
}


//Bild vorwärts
function imgForeward(i) { 
    if (i < images.length - 1) {
        i++
    } else {
        i = 0
    }
    document.getElementById('overlay').innerHTML = ``;
    openImg(i);
}


//Bild zurück
function imgBackward(i){
    if (i !== 0) {
        i-- 
    } else {
        i = images.length -1
    }
    document.getElementById('overlay').innerHTML = ``;
    openImg(i);
}


// HTML Template - Overlay
function templateOverlay(i){ // "images" muss nicht rein, ist oben Global definiert
    return /*html*/ `
            <div class="overlay-bgr">
                <div class="zoom-layout">
                    <img class="icons switch-icons" onclick="imgBackward(${i})" src="icons/left.svg">
                    <img class="zoom-img" src="${images[i]}"> 
                    <img class="icons switch-icons" onclick="imgForeward(${i})" src="icons/right.svg">
                </div>
                    <div class="cancel-container">
                        <img class="icons close-icon" onclick="closeImg()" src="icons/cancel.svg">
                    </div>
            </div>
    `} // i = Um das jeweilige Bild im Overlay anzeigen zu lassen
