document.addEventListener('DOMContentLoaded', () => {
    const NO_VALUE = '...'

    let form = document.getElementById('user-infos')

    let iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="bi bi-emoji-sunglasses"><path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z"></path><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z"></path></svg>`
    icon = document.createElement('svg')
    icon.innerHTML = iconSvg.trim()
    icon.id = 'card-icon'

    let nicknameDisplay = document.createElement('p')
    nicknameDisplay.id = 'card-top-right-text'
    nicknameDisplay.innerText = NO_VALUE
    form.nickname.addEventListener('input', () => {
        let value = form.nickname.value 
        if (value.length > 0) nicknameDisplay.innerText = value
        else nicknameDisplay.innerText = NO_VALUE
    })

    let fullNameDisplay = document.createElement('p')
    fullNameDisplay.id = 'card-centered-text'
    fullNameDisplay.innerText = NO_VALUE + ' ' + NO_VALUE

    form.fullname.addEventListener('input', () => {
        let value = form.fullname.value 
        if (value.length > 0) {
            value = value.split(' ')
            if (value[1]) {
                let text = value[0] + ' '
                //fullNameDisplay.innerText = value[0] + ' ' + value[1].toUpperCase()
                for (let i = 1; i < value.length; i++) {
                    text += value[i].toUpperCase() + ' '
                }
                fullNameDisplay.innerText = text
            }
            else fullNameDisplay.innerText = value[0] + ' ' + NO_VALUE
        }
        else fullNameDisplay.innerText = NO_VALUE
    })

    let phoneNumber = document.createElement('p')
    phoneNumber.id = 'card-bottom-centered-text'
    phoneNumber.innerText = `+(${NO_VALUE}) ${NO_VALUE}`

    form.country.addEventListener('change', () => {
        let countryValue = form.country.value
        let phoneValue = form.phonenumber.value

        if (countryValue) {
            if (phoneValue) {
                phoneNumber.innerText = `+(${countryValue}) ${phoneValue}`
            } else {
                phoneNumber.innerText = `+(${countryValue}) ${NO_VALUE}`
            }
        }
    })

    form.phonenumber.addEventListener('input', () => {
        let countryValue = form.country.value
        let phoneValue = form.phonenumber.value

        if (countryValue) {
            if (phoneValue) {
                phoneNumber.innerText = `+(${countryValue}) ${phoneValue}`
            } else {
                phoneNumber.innerText = `+(${countryValue}) ${NO_VALUE}`
            }
        } else {
            phoneNumber.innerText = `+(${NO_VALUE}) ${phoneValue}`
        }
    })

    // Ajout de l'icône en haut à gauche
    let card = document.getElementById('card')
    card.appendChild(icon)
    card.appendChild(nicknameDisplay)
    card.appendChild(fullNameDisplay)
    card.appendChild(phoneNumber)

    form.addEventListener('submit', (event) => {

        event.preventDefault()

        let nickname = form.nickname.value 
        console.log(nickname)
        let fullName = form.fullname.value 
        let country = form.country.value 
        let phoneNumber = form.phonenumber.value 

        let buttonContainer = document.getElementById('buttons-container')

        let errorDiv = document.getElementById('error-div')

        let error = false;
        if (nickname === '') {
            error = true;
            form.nickname.classList.add('error')
            errorDiv.innerText = "Le nickname ne doit pas être vide."
        }
        if (fullName === '') {
            error = true;
            form.fullname.classList.add('error')
            errorDiv.innerText = "Le nom ne doit pas être vide."
        }
        if (error) errorDiv.style.display = 'block'
    })
})

