const Button = ({ children = null, onClick, src, alt }) => {
   return (
      <button className="text-xl focus:outline-none" onClick={onClick}>
         {src && <img className="h-4 mr-2 mb-0 focus:outline-none" src={src} alt={alt}/>}
         {children}
      </button>
   )
}

export default Button
