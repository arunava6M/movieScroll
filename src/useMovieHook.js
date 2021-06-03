import { useEffect, useState } from 'react'


const useMovieHook = ( pageNumber ) => {
   const [movies, setMovies] =useState([])
   const [categoryTitle, setCategoryTitle] = useState(null)
   const [loading, setLoading] = useState(true)
   console.log('inside useMovieHook')
   useEffect(()=> {
      console.log('fetching..')
      if(pageNumber >3) return
      fetch(`API/CONTENTLISTINGPAGE-PAGE${pageNumber}.json`
      ,{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(result => {
         setLoading(false)
         return result.json()
        })
        .then(({page}) => {
           setCategoryTitle(page.title)
           setMovies(prevMovies => [...prevMovies, ...page['content-items']?.content])
        })
        .catch(error => console.log(error))
   },[pageNumber])

   // useEffect(() => {
   //    console.log('searching..')
   //    if(!searchQuery) return
   //    console.log('searching...2')
   //    const filteredMovie = movies.filter(movie => movie.name.toLowerCase().match('pot'))
   //    console.log(filteredMovie)
   //    setMovies(filteredMovie)
   // },[searchQuery, movies])

   // if(searchQuery) {
   //    movies.filter(movie => movies.name.toLowerCase().search(searchQuery.toLowerCase()))
   // }
   return { movies, categoryTitle, loading }
}

export default useMovieHook
