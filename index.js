window.onload = function() {
    const search = document.querySelector('#searchForm');
    const searchBar = document.querySelector('#search');
    const searchButton = document.querySelector('#searchButton');

    search.addEventListener('submit', function(event) {
        event.preventDefault();
        searchMovies(searchBar.value);
    });

    const navButton = document.querySelector('.menuButton');
    const nav = document.querySelector('.menu');
    navButton.addEventListener('click', function() {
        nav.classList.toggle('hidden');
    });

    const userMenu = document.querySelector('.user-menu');

    const userButton = document.querySelector('#user-button').addEventListener('click', function() {
        userMenu.classList.toggle('hidden');
    });

    const closeUserMenu = document.querySelector('.closeButton').addEventListener('click', function() {
        userMenu.classList.toggle('hidden');
    });

    const register = document.querySelector('#register');
    const login = document.querySelector('#login');

    const needTo = document.querySelector('#need-to-btn');
    needTo.addEventListener('click', function() {
        register.classList.toggle('hidden');
        login.classList.toggle('hidden');
        if (register.classList.contains('hidden')) {
            needTo.textContent = "Don't have an account? Click here to Register";
        } else {
            needTo.textContent = "Already have an account? Click here to Login";
        }
    });
};


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmZiYmVhNWMxODYyZTUzNDZkNTczZGU2OGEyNmEwOSIsInN1YiI6IjYwOGIyZDBlODFhN2ZjMDA3NzZhOTQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MayR82D-6DFWr6sUzSxd-ucNVO6IWkLOF4G3metbcgQ'
    }
};

let flkty;

async function searchMovies(query) {
    const results = document.querySelector('.results');
    const expanded = document.querySelector('.expanded');
    const nav = document.querySelector('.menu');

    nav.classList.add('hidden');

    if (flkty) {
        flkty.destroy();
    }

    results.innerHTML = '';
        
    flkty = new Flickity( results, {
        contain: true,
        wrapAround: true
    });

    if (query === '') {
        const error = document.createElement('p');
        error.textContent = 'Please enter a search query';
        error.classList.add('error');
        results.appendChild(error);
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    await fetch(url, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);

            if (response.results.length === 0) {
                const error = document.createElement('p');
                error.textContent = 'No results found';
                error.classList.add('error');
                results.appendChild(error);
                return;
            }

            response.results.map((movie) => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');
            
                const movieImage = new Image();
                movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                movieImage.alt = movie.title;

                const expand = document.createElement('p');
                expand.innerText = 'Double click for more information';
                expand.classList.add('expand');

                movieDiv.appendChild(expand);
                
                movieDiv.appendChild(movieImage);
                results.appendChild(movieDiv);

                movieImage.onerror = function() {
                    movieImage.src = 'https://via.placeholder.com/500x750';
                };

                movieImage.onload = function() {
                    flkty.append(movieDiv);
                    flkty.resize();
                };

                movieDiv.addEventListener('dblclick', function() {
                    expandMovie(movie);
                });

                let lastTouchTime = 0;

                movieDiv.addEventListener('touchstart', function (event) {
                    const currentTime = new Date().getTime();
                    const tapLength = currentTime - lastTouchTime;
                    lastTouchTime = currentTime;

                    if (tapLength < 500 && tapLength > 0) {
                        expandMovie(movie);
                        event.preventDefault();
                    }
                });

            });
        })
        .catch(error => {
            console.error('Error:', error);
            const errorElement = document.createElement('p');
            errorElement.textContent = 'An error occured, please try again';
            errorElement.classList.add('error');
            results.appendChild(errorElement);
        });
}

function expandMovie(movie) {
    const results = document.querySelector('.results');
    const expanded = document.querySelector('.expanded');
    results.classList.toggle('hidden');
    expanded.classList.toggle('hidden');

    const nav = document.querySelector('.menu');
    nav.classList.add('hidden');

    const header = document.querySelector('header');
    header.classList.add('hidden');

    const navButton = document.querySelector('.menuButton');
    navButton.classList.add('hidden');

    const imageSection = document.querySelector('.expandedImage');
    const textSection = document.querySelector('.expandedText');

    imageSection.innerHTML = '';
    textSection.innerHTML = '';

    const expandedImage = new Image();
    expandedImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    expandedImage.alt = movie.title;

    const expandedTitle = document.createElement('h1');
    expandedTitle.textContent = movie.title;

    const hr = document.createElement('hr');

    const expandedOverview = document.createElement('p');
    expandedOverview.textContent = movie.overview;

    const date = document.createElement('h3');
    date.textContent = `Release Date: ${movie.release_date}`;

    const rating = (Math.round(movie.vote_average * 10)).toFixed(0);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("rating");
    svg.setAttribute("viewBox", "0 0 36 36");
    svg.style.transform = "rotate(-90deg)";

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", "circle");
    circle.setAttribute("stroke", "grey");
    circle.setAttribute("fill", "transparent");
    circle.setAttribute("r", "16");
    circle.setAttribute("cx", "18");
    circle.setAttribute("cy", "18");
    circle.setAttribute("stroke-width", "3");
    svg.appendChild(circle);

    const progress = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    progress.setAttribute("class", "progress");
    progress.setAttribute("fill", "transparent");
    progress.setAttribute("r", "16");
    progress.setAttribute("cx", "18");
    progress.setAttribute("cy", "18");
    progress.setAttribute("stroke-dasharray", `${rating}, 100`);
    progress.setAttribute("stroke-width", "3");

    if (rating >= 70) {
        progress.setAttribute("stroke", "green");
    } else if (rating >= 40) {
        progress.setAttribute("stroke", "orange");
    } else {
        progress.setAttribute("stroke", "red");
    }

    svg.appendChild(progress);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "18");
    text.setAttribute("y", "20");
    text.setAttribute("text-anchor", "middle");
    text.textContent = rating + "%";
    text.style.fontSize = "40%";
    text.style.transform = "rotate(90deg)";
    text.style.transformOrigin = "center";
    svg.appendChild(text);

    expandedImage.onerror = function() {
        expandedImage.src = 'https://via.placeholder.com/500x750';
    };
    
    imageSection.appendChild(expandedImage);


    textSection.appendChild(expandedTitle);
    textSection.appendChild(hr);
    textSection.appendChild(expandedOverview);
    textSection.appendChild(date);
    textSection.appendChild(svg);

    const backButton = document.querySelector('#backButton');

    const toggleVisibility = function() {
        results.classList.toggle('hidden');
        expanded.classList.toggle('hidden');
        header.classList.remove('hidden');
        navButton.classList.remove('hidden');
        backButton.removeEventListener('click', toggleVisibility);
    };

    backButton.addEventListener('click', toggleVisibility);
}

