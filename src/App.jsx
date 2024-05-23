import { Box, Container, Typography } from "@mui/material"
import './App.css'
import { useEffect, useState, useRef } from "react"
import { useMovies } from "./hooks/useMovies"
import { Movies } from "./components/Movies"

// https://moviedatabase8.p.rapidapi.com/Search/avengers?rapidapi-key=cfdd3ffc21mshb67a6d360128239p1e1cd3jsncaf8b7cf5486


// hook useRef: es un hook que te permite crear un referencia mutable que persiste durante todo el ciclo de vida de tu componente. Para guardar cualquier valor que puedas mutar como un identificador, como un elemento del DOM. Y cada vez que cambia no renderiza otra vez el componente.

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(()=> {
    // si es la primera vez que se renderiza, si es el primer input del usuario
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.length <= 1) {
      setError('La busqueda debe tener al menos 2 caracteres')
      return
    }
      
    setError(null)
  }, [search])

  return {search, setSearch, error}
}


function App() {
  const {search, setSearch, error} = useSearch()
  const { movies, getMovies } = useMovies({search})
  // const movies = responseMovies.Search
  // const hasMovies = movies?.length > 0
  // const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log({search})
    getMovies()
  }

  const handleChange = (event) => {
   setSearch(event.target.value)
  }

 
  // const mappedMovies = movies?.map(movie => ({
  //   id: movie.imdbID,
  //   title: movie.Title,
  //   img: movie.Poster,
  //   year: movie.Year
  // }))



  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const fields = Object.fromEntries(
  //     new window.FormData(event.target)
  //   )
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   console.log({query})
  // }

  // const handleChange = (event) => {
  //   const newQuery = event.target.value
  //   if (newQuery.startsWith(' ')) return
  //   setQuery(newQuery)
  //   if (newQuery === '') {
  //     setError('No se puede buscar una pelicula vacia')
  //     return
  //   }
  //   if (newQuery.length <= 1) {
  //     setError('La busqueda debe tener al menos 2 caracteres')
  //     return
  //   }
  //     setError(null)
  // }

 

  return (
    <Container maxWidth='lg'>
     <Box display={'flex'} flexDirection={'column'} alignItems={'center'}justifyContent={'center'}>
        <Typography textAlign={'center'} variant="h1" color='initial'>Movies Searcher</Typography>
      <form className='form' onSubmit={handleSubmit}>
        <input style={{
          border: '2px solid transparent', borderColor: error ? 'red' : 'transparent'
          }} 
          onChange={handleChange} 
          value={search} 
          name="query" 
          placeholder='Ej: Avengers, Spideram...' />
        <button>Search</button>
      </form>
      {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
      </Box>
      <main>
       
       <Movies movies={movies} />
      </main>
    </Container>

      
  )
}

export default App





//<main>
//{hasMovies ? (
//<Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'} gap={'20px'} className="movies">
  //{
   // mappedMovies.map(movie => (
      //<Box className="movie" key={movie.id}>
      //  <h3>{movie.title}</h3>
     //   <p>{movie.year}</p>
      //  {/* <p>{movie.release_date}</p> */}
     //   <img src={movie.img} alt={movie.title} />
     // </Box>
   // ))
  // }
//</Box>
//) : (
// <Typography variant="body1">No movies results</Typography>
//)}
//{/* <Movies movies={movies} /> */}
//</main>