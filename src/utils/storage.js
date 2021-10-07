import AsyncStorage from "@react-native-async-storage/async-storage";

// buscar os filmes salvos
export async function getMoviesSave(key){
    const myMovies = await AsyncStorage.getItem(key)
    let moviesSave = JSON.parse(myMovies) || [];
    return moviesSave;
}

// salvar um novo filme
export async function saveMovie(key, newMovie){
    let moviesStored = await getMoviesSave(key);

    // se tiver algum filme salvo com esse id ou duplicado, precisamos ignorar.
    const hasMovie = moviesStored.some( item => item.id === newMovie.id);
    
    if(hasMovie){
        return;
    }

    moviesStored.push(newMovie);

    await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
}

// deletar um filme especifico
export async function deleteMovie(id){
    let moviesStored = await getMoviesSave('@mymovies');
    let myMovies = moviesStored.filter(item => {
        return(item.id !== id)
    })
    await AsyncStorage.setItem('@prime', JSON.stringify(myMovies));
    return myMovies;
}

// filtrar algum filme se ja está salvo
export async function hasMovie(movie){
    let moviesStored = await getMoviesSave('@mymovies');

    const hasMovie = moviesStored.find(item => item.id === movie.id);

    if (hasMovie){
        return true;
    }

    return false;
}