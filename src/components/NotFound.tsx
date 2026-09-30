import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h2>404</h2>
      <h3>Page Not Found</h3>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link to="/library" className="nav-btn active">
        Back to Library
      </Link>
    </div>
  )
}
