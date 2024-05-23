import { Typography, Box, Card } from "@mui/material"


function ListOfMovies ({movies}) {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'} gap={'20px'} className="movies">
    {
      movies.map(movie => (
        <Card className="movie" key={movie.id}>
               <h3>{movie.title}</h3>
               <p>{movie.year}</p>
               {/* <p>{movie.release_date}</p> */}
               <img src={movie.img} alt={movie.title} />
             </Card>
      ))
    }
  </Box>
  )
}

function NoMoviesResults () {
    return (
        <Typography variant="body1">No movies results</Typography>
    )
}


export function Movies ({movies}) {
  const hasMovies = movies?.length > 0
  
    return  (
        hasMovies 
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResults />
    )
}