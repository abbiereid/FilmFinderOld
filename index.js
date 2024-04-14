window.onload = function() {
    const search = document.querySelector('#searchForm');
    const searchBar = document.querySelector('#search');

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
    const results = document.querySelector('.cards');

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    fetch(url, options)
        .then(response => response.json())
        .then(response => 
            response.results.map(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const movieTitle = document.createElement('h2');
                movieTitle.textContent = movie.title;

                //need to change to an image object i can check if loads. Also need to find some alt text.
                const moviePoster = document.createElement('img');
                moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

                //const movieOverview = document.createElement('p');
                //movieOverview.textContent = movie.overview;

                //movieDiv.appendChild(movieTitle);
                movieDiv.appendChild(moviePoster);
                //movieDiv.appendChild(movieOverview);

                results.appendChild(movieDiv);
            })
        );
}
