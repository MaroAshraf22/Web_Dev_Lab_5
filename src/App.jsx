import { useState } from 'react'
import './App.css'

function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(5)

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    onAddMovie({
      id: Date.now(),
      title,
      review,
      rating: Number(rating)
    })

    setTitle("")
    setReview("")
    setRating(5)
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3 className="sub-heading">Add New Movie</h3>
      
      <div className="input-group">
        <label className="label">Movie Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your Film..."
          className="input"
        />
      </div>

      <div className="input-group">
        <label className="label">Review / Comment:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your thoughts..."
          className="textarea"
        />
      </div>

      <div className="input-group">
        <label className="label">Rating (1 to 5 Stars):</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="select"
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>

      <button type="submit" className="add-button">
        Log Film
      </button>
    </form>
  )
}

function MovieCard({ movie, onDeleteMovie }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{movie.title}</h3>
        <button onClick={() => onDeleteMovie(movie.id)} className="delete-button">
          Remove
        </button>
      </div>
      <div className="star-rating">
        {"⭐".repeat(movie.rating)} ({movie.rating}/5)
      </div>
      {movie.review && <p className="review-text">"{movie.review}"</p>}
    </div>
  )
}

function MovieList({ movies, onDeleteMovie }) {
  if (movies.length === 0) {
    return <p className="empty-message">Your watchlist is empty!</p>
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onDeleteMovie={onDeleteMovie} 
        />
      ))}
    </div>
  )
}

export default function App() {
  const [movies, setMovies] = useState([])

  function handleAddMovie(movie) {
    setMovies([...movies, movie])
  }

  function handleDeleteMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id))
  }

  return (
    <div className="app-container">
      <h1 className="heading">Film Logger</h1>
      
      <MovieForm onAddMovie={handleAddMovie} />
      
      <h2 className="sub-heading">My Films({movies.length})</h2>
      
      <MovieList movies={movies} onDeleteMovie={handleDeleteMovie} />
    </div>
  )
}