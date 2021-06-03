import './App.css';
import { useState, useRef, useCallback } from 'react'
import useMovieHook from './useMovieHook'

import Button from './components/Button';
import ImageHolder from './components/ImageHolder';

function App() {
  const [pageNumber, setPageNumber] = useState(1)
  const [searchClicked, setSearchClicked] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { movies, categoryTitle, loading } = useMovieHook(pageNumber)

  const observer = useRef()
  const lastMovieRef = useCallback(node => {
    console.log(node)
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        setPageNumber(prevNumber => prevNumber+1)
      }
    })
    if(node) observer.current.observe(node)
  },[ loading])

  const containerDiv = "font-sans w-screen p-2 bg-gray-900 text-white w-full flex flex-wrap"
  const header= "w-full flex justify-between text-2xl text-gray-300 items-center sticky top-0 h-20 bg-gradient-to-t from-transparent via-gray-900 to-gray-900 px-4"
  const eachMovieBox = "flex m-0 w-1/3 h-56 px-2 py-4 flex-col"
  const movieName = "flex text-gray-400 justify-start py-1"
  const inputDiv = "bg-transparent border-0 border-b-2 w-3/4 text-xl focus:outline-none"

  const handleSearch = e => setSearchQuery(e.target.value)

  const filterData = movies => {
    if(!searchQuery) return movies
    const filteredMovie = movies.filter(movie => movie.name.toLowerCase().match(searchQuery.toLowerCase()))
    return filteredMovie
  }

  const categoryRenderer = () => (
    <>
      <div className="flex items-center">
        <Button
          onClick={() => console.log('back clicked')}
          src="Slices/Back.png"
          alt="back"
        />
        {categoryTitle}
      </div>
      <Button
        onClick={() => setSearchClicked(true)}
        src="Slices/search.png"
        alt="search"
      />
    </>
  )

  const searchRenderer = () => (
    <>
      <input className={inputDiv} placeholder="search movies" value={searchQuery} onChange={handleSearch} />
      <Button onClick={()=>{
        setSearchClicked(false)
        setSearchQuery('')
      }}>X</Button>
    </>
  )

  const handleLongName= name => {
    if(name.length > 13) {
      return `${name.substring(0,13)}..`
    } else return name
  }

  return (
    <div className={containerDiv}>
      <div className={header}>
        {searchClicked ? searchRenderer() : categoryRenderer()}
      </div>
      {filterData(movies).map((eachMovie,index) => {
        const lastMovie = index === movies.length-1
        return (
          <div key={index} ref={lastMovie ? lastMovieRef : null} className={eachMovieBox}>
            <ImageHolder
              src={`Slices/${eachMovie['poster-image']}`}
              alt="movie poster"
            />
            <div className={movieName}>{handleLongName(eachMovie.name)}</div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
