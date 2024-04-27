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

                /*const svgNS = "http://www.w3.org/2000/svg";
                const info = document.createElementNS(svgNS, 'svg');
                info.setAttributeNS(null, 'viewBox', '0 0 512 512');
                
                const path = document.createElementNS(svgNS, 'path');
                path.setAttributeNS(null, 'd', 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z');
                
                info.appendChild(path);
                info.classList.add('info');
                //info.classList.add('hidden');
                info.classList.add('clickable');

                movieDiv.appendChild(info);*/

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
            });
        });
}