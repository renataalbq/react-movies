import React, {useEffect, useState} from 'react';
import Header from '../../components/Header'
import {Container, ListMovies} from './styles';
import {getMoviesSave, deleteMovie} from '../../utils/storage';
import FavItem from '../../components/FavItem'
import {useNavigation, useIsFocused} from '@react-navigation/native'

function Movies(){
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let isActive = true;
        async function getFavMovies(){
            const result = await getMoviesSave('@mymovies');

            if (isActive){
                setMovies(result);
            }
        }

        if (isActive){
            getFavMovies();
        }

        return () => {
            isActive = false;
        }

    }, [isFocused]);

    async function handleDelete(id){
        const result = await deleteMovie(id);
        setMovies(result);
    }

    function navigateDetailsPage(item){
        navigation.navigate('Detail', {id: item.id})
    }

    return(
        <Container>
            <Header title="Minha lista" />
            <ListMovies
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={item => String(item.id)}
                renderItem={ ({item}) => (
                    <FavItem 
                        data={item}
                        deleteMovie={handleDelete}
                        navigatePage={() => navigateDetailsPage(item)}
                    />
                ) }
            />
        </Container>
    )
}

export default Movies;