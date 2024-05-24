import { searchMovies } from "../services/movies";
import { useState, useRef, useMemo } from 'react';

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = async () => {
    if (search === previousSearch.current) return;
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      // se va a ejecutar tanto en el try como en el catch
      setLoading(false)
    }
  };

  // const getSortedMovies = () => {
  //     const sortedMovies = sort
  //     ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //     : movies

  //     return sortedMovies
  // }

  // useMemo es para poder memorizar computaciones que hemos hecho que queremos evitar que se hagan (renderizen) a no ser que cambien las dependencias que nosotros les estamos indicando. AVISO no utilizarlo siempre, SOLO para mejorar el rendedimeinto si se necesita. 

  const sortedMovies = useMemo(() => {
    console.log('memoSortedMovies')
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}
