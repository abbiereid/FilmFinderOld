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
    const expanded = document.querySelector('.expanded');
    results.innerHTML = '';

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    fetch(url, options)
        .then(response => response.json())
        .then(response => {

            var flkty = new Flickity( results, {
                contain: true,
                wrapAround: true
            });

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

                movieImage.onload = function() {
                    flkty.append(movieDiv);
                    flkty.resize();
                };

                movieDiv.addEventListener('dblclick', function() {
                    results.classList.toggle('hidden');
                    expanded.classList.toggle('hidden');

                    const searchDiv = document.querySelector('.searchDiv');
                    searchDiv.classList.toggle('hidden');

                    const expandedImage = new Image();
                    expandedImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                    expandedImage.alt = movie.title;

                    expanded.appendChild(expandedImage);

                    const backButton = document.querySelector('#backButton');
                    backButton.addEventListener('click', function() {
                        expandedImage.remove();
                        results.classList.toggle('hidden');
                        expanded.classList.toggle('hidden');
                        searchDiv.classList.toggle('hidden');
                    });

                });
            });
        });
}