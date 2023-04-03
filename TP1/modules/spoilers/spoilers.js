


function handleClick() {
    let spoiler = this.nextElementSibling;
    spoiler.style.display = 'inline';
    this.style.display = 'none';
}

let spoilers = document.getElementsByClassName('spoiler');
for (let spoiler of spoilers) {
    let spoilerText = spoiler.textContent;

    spoiler.innerHTML = "";
    spoiler.classList.remove('spoiler');

    let btn = document.createElement('button');
    btn.classList.add('spoiler-button');
    btn.innerText = "Spoiler";
    btn.onclick = handleClick;

    spoiler.appendChild(btn);

    let span = document.createElement('span');
    span.classList.add('spoiler');
    span.innerText = " " + spoilerText;

    spoiler.appendChild(span);
}