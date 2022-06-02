let pagina = 1;
const btnAnt = document.getElementById('btnAnt');
const btnSig = document.getElementById('btnSig');

btnSig.addEventListener('click', () => {
    if(pagina < 500) {
        pagina += 1;
        cargarPeliculas();
    }

});

btnAnt.addEventListener('click', () => {
    if(pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
})



const cargarPeliculas = async() => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=363363479b9c114c999ab58b96862783&language=es-AR&page=${pagina}`);
        console.log(respuesta);

        if(respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                <img class="cartel" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;
        } else if(respuesta.status === 401){
			console.log('Escribiste mal la llave');
		} else if(respuesta.status === 404){
			console.log('La pelicula buscada no existe');
		} else {
			console.log('Hubo un error');
		}

    } catch(error) {
        console.log(error);
    }
}

cargarPeliculas();
