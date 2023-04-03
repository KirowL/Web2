(function() {

    let display = undefined

    /**
     * Recherche de blagues.
     */
    function searchJoke(terms) {
        let method = "GET"
        let url = "https://icanhazdadjoke.com/search" // url pour la recherche

        
        let search = encodeURIComponent(terms)
        let params = "?term=" + search + "&limit=5&page=1"
        let request = url + params

        console.log("request", request)


        // exécution de la requête
        httpRequest.open(method, request) // ATTENTION : on a remplacé 'url' par 'request'
        httpRequest.setRequestHeader('Accept', 'application/json');
        httpRequest.send()
    }

    let httpRequest = new XMLHttpRequest()
    httpRequest.responseType = "json"
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let results = httpRequest.response.results // la listes des blagues reçues
                if(results.length > 0){
                    display.innerHTML = results[0].joke // affichage de la 1ère blague
                }else{
                    display.innerHTML = ""
                }

            } else {
                alert(`ERREUR avec la requête. Erreur: ${httpRequest.status}`);
            }
        }
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