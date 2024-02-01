document.addEventListener('DOMContentLoaded', function() {
    const btnBuscar = document.getElementById('btnBuscar');
    const txtBuscar = document.getElementById('txtBuscador');
    const pnlPeliculasContainer = document.getElementById('pnlPeliculas');

    btnBuscar.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe
        const strTitulo = txtBuscar.value;
        if (strTitulo) {
            Buscar_Pelicula_Titulo(strTitulo);
        }
    });
    // se tuvo que hacer una peticion doble para conseguir mas detalles de la pelicula y poder obtener el rating
    function Buscar_Pelicula_Titulo(strTitulo) {
        const url = `https://www.omdbapi.com/?apikey=fd552705&s=${encodeURIComponent(strTitulo)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                pnlPeliculasContainer.innerHTML = ''; // Limpia resultados anteriores
                if (data.Response === "True") {
                    const PeliculaDetailsPromises = data.Search.map(Pelicula => {
                        const detailsUrl = `https://www.omdbapi.com/?apikey=fd552705&i=${Pelicula.imdbID}`;
                        return fetch(detailsUrl)
                            .then(response => response.json());
                    });

                    Promise.all(PeliculaDetailsPromises)
                        .then(pnlPeliculasDetails => {
                            pnlPeliculasDetails.forEach(Pelicula => {
                                const PeliculaDiv = document.createElement('div');
                                PeliculaDiv.classList.add('col-lg-2', 'col-md-3', 'col-sm-4', 'Pelicula-card');
                                PeliculaDiv.innerHTML = `
                                    <img src="${Pelicula.Poster}" alt="${Pelicula.Title}">
                                    <div class="Pelicula-info">
                                        <h6>${Pelicula.Title}</h6>
                                        <p>${Pelicula.Year}</p>
                                        <p>${CrearEstrella(Pelicula.imdbRating)}</p> 
                                    </div>
                                `;
                                pnlPeliculasContainer.appendChild(PeliculaDiv);
                            });
                        });
                } else {
                    pnlPeliculasContainer.innerHTML = `<p>${data.Error}</p>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                pnlPeliculasContainer.innerHTML = `<p>Error fetching Peliculas: ${error.message}</p>`;
            });
    }

    function CrearEstrella(rating) {
        // Convierte la calificación a un número del 1 al 5, luego a estrellas
        const roundedRating = Math.round(rating) / 2;
        let stars = "";
        for (let i = 0; i < 5; i++) {
            if (i < roundedRating) {
                stars += "★"; // estrella completa
            } else {
                stars += "☆"; // estrella vacía
            }
        }
        return stars;
    }
});