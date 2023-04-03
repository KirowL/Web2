(function() {

    let display = undefined

    /**
     * Recherche de blagues.
     */
    function searchJoke(terms) {
        let url = "https://icanhazdadjoke.com/search" // url pour la recherche

        let options = {
            method: "GET",
            headers: { Accept: "application/json"}
        }

        
        let search = encodeURIComponent(terms)
        let params = "?term=" + search + "&limit=5&page=1"
        let request = url + params

        fetch(url, options).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    let results = data.results 
                    if (results.length > 0) {
                        display.innerHTML = results[0].joke
                    } else {
                        display.innerHTML = ""
                    }
                })
            } else {
                alert('Erreur avec la requête', response.statusText)
            } 
        }).catch(error => {
            console.log("ERREUR avec le fetch", error)
        })

    }


    document.addEventListener('DOMContentLoaded', function () {
        display = document.querySelector("#joke-05")
        
        
        let submit = document.getElementById("submit-terms")
        
        submit.addEventListener('click', function() {
            let input = document.getElementById("search-terms");
            searchJoke(input.value)
        })
    })

})()