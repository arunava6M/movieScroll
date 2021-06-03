import {useState} from 'react'

const ImageHolder = ({ key, src, alt }) => {
   const [loaded, setLoaded] = useState(false)
   const [error, setError] = useState(false)
   return (
      <div key={key} className="object-cover">
         <img
            src={(!loaded || error) ? 'Slices/placeholder_for_missing_posters.png' : src}
            alt={alt}
            onError={() => setError(true)}
            onLoad={() => setLoaded(true)}
         />
      </div>
   )
}

export default ImageHolder
