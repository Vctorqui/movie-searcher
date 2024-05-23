// import responseMovies from '../mocks/with-results.json'
// import withResults from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'
import { useState } from 'react'


export function useMovies ({search}) {
  const [responseMovies, setResponseMovies] = useState([])

    const movies = responseMovies.Search
  
    const mappedMovies = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      img: movie.Poster,
      year: movie.Year
    }))

    const getMovies = async () => {
        if (search) {
            // setResponseMovies(withResults)
            const res = await fetch(`https://www.omdbapi.com/?apikey=2bd1ff2c&s=${search}`)
            const data = await res.json()
            try {
                if(res.ok) {
                    setResponseMovies(data)
                }
            } catch (error) {
                console.log('error', error)
            }

        } else {
            setResponseMovies(withoutResults)
        }
    }
  
    return { movies: mappedMovies, getMovies}
  
  }