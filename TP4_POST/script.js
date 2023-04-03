document.addEventListener('DOMContentLoaded', function (){

    const handleSubmit = () => {
        let display = document.querySelector("#fetch-post-01")
        display.style.display = "none"
        let url = "http://web.gregory-bourguin.fr/teaching/php/requests/ajax/02_generateUserID.php"
    
        // préparation des données à envoyer
        let data = new FormData()
        let firstName = document.getElementById('firstname')
        let lastName = document.getElementById('lastname')
        
        if (firstName.value.length != 0 && lastName.value.length != 0) {
            data.append('firstname', firstName.value)
            data.append('lastname', lastName.value)
        
        
            let options = {
                method: 'POST',
                body: data // ajout des données pour le POST
            }
        
            fetch(url, options).then(response => {
                if (response.ok) {
                    response.json().then(data => { // json() parse les données
                        display.innerHTML = data.id
                        display.style.display = "block"
                    })
                } else {
                    alert("ERREUR avec la requête.", response.statusText);
                }
            }).catch(error => {
                console.log("ERREUR avec le fetch.", error)
            })
        }
    } 

    let form = document.getElementById('user-infos')
    
    form.addEventListener('submit', function(event){
        event.preventDefault();
        handleSubmit()
    })



})