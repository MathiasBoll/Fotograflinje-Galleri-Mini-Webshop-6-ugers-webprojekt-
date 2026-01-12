import PhotoCard from './PhotoCard'

/**
 * PhotoGrid component
 * Displays an array of photos in a responsive CSS grid layout
 * Handles empty states and invalid data gracefully
 * 
 * Props:
 * @param {Array} photos - Array of photo objects to display
 */
function PhotoGrid({ photos }) {
  // Validate that photos is an array and has items
  // This prevents crashes if API returns null/undefined or empty array
  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    return (
      <div className="empty-state">
        <p>Ingen billeder fundet for det valgte event.</p>
      </div>
    )
  }

  return (
    <div className="photo-grid">
      {/* Map through photos and render a PhotoCard for each one */}
      {photos.map(photo => (
        <PhotoCard key={photo._id} photo={photo} />
      ))}
    </div>
  )
}

export default PhotoGrid
