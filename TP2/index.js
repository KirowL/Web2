let images = [];

let thumbs = [];
let currentThumb = -1;
let state = 0;
let interval;

images.push("images/610747.jpg");
images.push("images/888509.jpg");
images.push("images/695524.jpg");
images.push("images/600918.jpg");
images.push("images/216856.jpg");

const createThumbs = () => {
    let thumbsList = document.getElementById("thumbs-list");
    for (let imageUrl of images) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("thumb");
        let newImage = document.createElement("img");
        newImage.src = imageUrl;

        newDiv.appendChild(newImage);

        thumbsList.appendChild(newDiv);
        thumbs.push(newDiv);
    }
};

const getSrc = (thumb) => thumb.firstChild.src;

const clearActiveThumbs = () => {
    for (let thumb of thumbs) {
        thumb.classList.remove("active");
    }
};

const displayThumb = (thumb) => {
    let displayImage = document.getElementById("display-image");
    displayImage.src = getSrc(thumb);
    clearActiveThumbs();
    thumb.classList.add("active");
};

const displayNextThumb = () => {
    if (currentThumb == thumbs.length - 1) currentThumb = 0;
    else currentThumb += 1;
    thumbs[currentThumb].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
    });
    displayThumb(thumbs[currentThumb]);
};

const fadeInDisplay = () => {
    setTimeout(() => {
        let disp = document.getElementById('display')
        let op = 1;
        let increment = 0.1;
        let timer = setInterval(function () {
            op -= increment;
            disp.style.opacity = op;
            if (op <= 0) {
                clearTimeout(timer);
            }
        }, 100)
    }, 2000)
}

const fadeOutDisplay = () => {
    let disp = document.getElementById('display')
    let op = 0;
    let increment = 0.1;
    let fadeOut = setInterval(function () {
        op += increment;
        disp.style.opacity = op;
        if (op >= 1) {
            clearTimeout(fadeOut);
        }
    }, 100);
}

const play = (timer) => {
    return setInterval(() => {
        fadeInDisplay()
        displayNextThumb()
        fadeOutDisplay()
    }, timer);
};

const stop = (interval) => {
    clearInterval(interval);
};

const togglePlay = () => {
    setNewPlayingIcon();

    if (state) {
        state = 0;
        stop(interval);
    } else {
        state = 1;
        interval = play(3000);
    }
};

const setNewPlayingIcon = () => {
    let playIcon = document.getElementById("play-icon");
    let element;
    if (!state) {
        element = `<svg width="4em" height="4em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi bi-pause-fill"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path></svg>`;
    } else {
        element = `<svg width="4em" height="4em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="bi bi-play-fill"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg>`;
    }
    playIcon.innerHTML = element.trim();
};

document.addEventListener("DOMContentLoaded", function () {
    createThumbs();
    displayNextThumb();
    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].onclick = function () {
            currentThumb = i;
            displayThumb(thumbs[i]);
        };
    }

    let playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function () {
        togglePlay();
    });
});

