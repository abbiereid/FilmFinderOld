window.onload = function() {
    const search = document.querySelector('#searchForm');
    const searchBar = document.querySelector('#search');
    const searchButton = document.querySelector('#searchButton');

    search.addEventListener('submit', function(event) {
        event.preventDefault();
        searchMovies(searchBar.value);
    });

    
};


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmZiYmVhNWMxODYyZTUzNDZkNTczZGU2OGEyNmEwOSIsInN1YiI6IjYwOGIyZDBlODFhN2ZjMDA3NzZhOTQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MayR82D-6DFWr6sUzSxd-ucNVO6IWkLOF4G3metbcgQ'
    }
};

function searchMovies(query) {
    const results = document.querySelector('.results');
    results.innerHTML = '';

    const openButton = document.querySelector('#openButton');
    openButton.classList.toggle('hidden');
    const menu = document.querySelector('#menu');
    menu.classList.toggle('hidden');

    openButton.addEventListener('click', function() {
        openButton.classList.toggle('hidden');
        menu.classList.toggle('hidden');
    });
      

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            response.results.map((movie) => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');
            
                const movieImage = new Image();
                movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            
                movieDiv.appendChild(movieImage);
                results.appendChild(movieDiv);

                movieImage.onload = function() {
                    flkty.resize();
                };
            });

            var flkty = new Flickity( results, {
                contain: true,
                wrapAround: true
            });

        });
}