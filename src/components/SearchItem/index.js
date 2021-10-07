import React from 'react';
import {Container, Banner, Title, RateContainer, Rate} from './styles'
import {Ionicons} from '@expo/vector-icons'

function SearchItem({data, navigatePage}){

    function detailMovie(){
        if (data.release_date === ''){
            alert('Filme ainda não lançado');
            return;
        }

        navigatePage(data);
    }

    return(
        <Container activeOpacity={0.7} onPress={() => detailMovie()}>
            {data?.poster_path ? (
                <Banner
                    resizeMethod='resize'
                    source={{uri: `https://image.tmdb.org/t/p/w500/${data?.poster_path}`}}
                />
            ) : (
                <Banner
                    resizeMethod='resize'
                    source={require('../../assets/semfoto.png')}
                /> 
            )}
            
            <Title numberOfLines={1}> {data?.title} </Title>
            <RateContainer>
                <Ionicons name="md-star" size={12} color="#E7A74e" />
                <Rate>{data?.vote_average}/10</Rate>
            </RateContainer>
        </Container>
    )
}

export default SearchItem;