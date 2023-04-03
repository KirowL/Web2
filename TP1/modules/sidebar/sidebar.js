let sidebar = document.getElementById('sidebar')

let articles = document.querySelectorAll("div#main-content section article")

for (let article of articles) {
    let title = article.childNodes[1].textContent
    
    let ancre = document.createElement('a')
    ancre.innerText = title;
    ancre.href = "#" + article.id;

    sidebar.appendChild(ancre)
}