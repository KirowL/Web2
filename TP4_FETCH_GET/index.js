(function () {

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
        let options = {
            method: 'GET',
            headers: { Accept: 'application/json' }
        }
        fetch(request, options).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    let container = document.getElementById('jokes-container')
                    container.innerHTML = ''
                    if (data.results.length === 0) {
                        let noResultsDiv = document.createElement('div')
                        noResultsDiv.id = "no-results"
                        noResultsDiv.textContent = "Pas de résultat !"
                        
                        container.appendChild(noResultsDiv, container.firstChild)
                    } else {
                        let controlsContainer = document.createElement('div')
                        controlsContainer.id = "controls-container"
                        let prev = document.createElement('button')
                        let next = document.createElement('button')
                        let currentPageDisplay = document.createElement('p')

                        prev.textContent = "Précédent"
                        if (data.current_page === 1) {
                            prev.disabled = true;
                        } else {
                            prev.disabled = false;
                        }
                        prev.addEventListener('click', function () {
                            searchJokes(currentTerms, data.current_page - 1)
                        })

                        next.textContent = "Suivant"
                        if (data.current_page === data.total_pages) next.disabled = true;
                        else next.disabled = false;
                        next.addEventListener("click", function () {
                            searchJokes(currentTerms, data.current_page + 1)
                        })

                        currentPageDisplay.textContent = data.current_page + " / " + data.total_pages;

                        controlsContainer.appendChild(prev)
                        controlsContainer.appendChild(currentPageDisplay)
                        controlsContainer.appendChild(next)

                        container.appendChild(controlsContainer)


                        let jokesList = document.createElement('div')
                        jokesList.id = "jokes-list"
                        for (let blague of data.results) {
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
                })
            } else {
                alert('ERREUR avec la requete', response.statusText)
            }
        })
    }

    document.addEventListener('DOMContentLoaded', function () {
        let submit = document.getElementById('search-terms-submit');
        let inputTerms = document.getElementById('search-terms-input');

        submit.addEventListener('click', function () {
            searchJokes(inputTerms.value);
        });
    })

})();
