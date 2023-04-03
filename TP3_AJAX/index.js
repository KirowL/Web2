(function() {

    let display;
    let currentTerms;
    let currentPage;

    const searchJokes = (terms, page) => {
        currentTerms = terms;
        currentPage = page;
        let url = "https://icanhazdadjoke.com/search" // search URL
        let limitPerPage = 5; 

        if (!page) page = 1;

        let formatedTerms = encodeURIComponent(terms);

        let request = url + "?term=" + formatedTerms + "&limit=" + limitPerPage + "&page=" + page;

        httpRequest.open("GET", request)
        httpRequest.setRequestHeader('Accept', 'application/json')
        httpRequest.send()
    }
    
    let httpRequest = new XMLHttpRequest();
    httpRequest.responseType = "json";
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = httpRequest.response
                let container = document.getElementById('jokes-container')
                if (response.results.length === 0) {
                    let noResultsDiv = document.createElement('div')
                    noResultsDiv.id = "no-results"
                    noResultsDiv.textContent = "Pas de résultat !"

                    container.replaceChild(noResultsDiv, container.firstChild)
                } else {
                    container.innerHTML = ''
                    let controlsContainer = document.createElement('div')
                    controlsContainer.id = "controls-container"
                    let prev = document.createElement('button')
                    let next = document.createElement('button')
                    let currentPageDisplay = document.createElement('p')

                    prev.textContent = "Précédent"
                    if (response.current_page === 1) {
                        prev.disabled = true;
                    } else {
                        prev.disabled = false;
                    }
                    prev.addEventListener('click', function() {
                        searchJokes(currentTerms, response.current_page - 1)
                    })

                    next.textContent = "Suivant"
                    if (response.current_page === response.total_pages) next.disabled = true;
                    else next.disabled = false;
                    next.addEventListener("click", function() {
                        searchJokes(currentTerms, response.current_page + 1)
                    })

                    currentPageDisplay.textContent = response.current_page + " / " +  response.total_pages;

                    controlsContainer.appendChild(prev)
                    controlsContainer.appendChild(currentPageDisplay)
                    controlsContainer.appendChild(next)

                    container.appendChild(controlsContainer)


                    let jokesList = document.createElement('div')
                    jokesList.id = "jokes-list"
                    for (let blague of response.results) {
                        let joke = document.createElement('p')
                        joke.textContent = blague.joke
                        joke.classList.add("joke")
                        jokesList.appendChild(joke)
                    }
                    container.appendChild(jokesList)

                    let motsCles = document.createElement('p')
                    motsCles.textContent = "Mots clés : \"" + currentTerms + "\""
                    motsCles.classList.add("mots-cles")
                    container.appendChild(motsCles)
                }
            } 
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        let submit = document.getElementById('search-terms-submit');
        let inputTerms = document.getElementById('search-terms-input');

        submit.addEventListener('click', function() {
            searchJokes(inputTerms.value);
        });
    })

})();
