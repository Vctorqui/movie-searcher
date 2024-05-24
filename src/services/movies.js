const API_KEY = '2bd1ff2c'

export const searchMovies = async ({search}) => {
    if (search === '') return null
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const data = await res.json()

        const movies = data.Search
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            img: movie.Poster,
            year: movie.Year
        }))
      
    } catch (error) {
        console.log('Error searching movies', error)
    }
} 
    