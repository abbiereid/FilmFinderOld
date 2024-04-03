window.onload = function() {
    const search = document.querySelector('#searchForm');

    search.addEventListener('submit', function(event) {
        event.preventDefault();
        searchMovies(search.value);
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
    const results = document.querySelector('#results');
    results.textContent = '';

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    fetch(url, options)
        .then(response => response.json())
        .then(response => 
            response.results.map(movie => {
                const movieDiv = document.createElement('div');
                const movieTitle = document.createElement('h2');
                movieTitle.textContent = movie.title;
                movieDiv.appendChild(movieTitle);
                results.appendChild(movieDiv);
            })
        );
}
