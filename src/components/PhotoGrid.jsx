import PhotoCard from './PhotoCard'

/**
 * PhotoGrid component
 * Displays photos in a responsive grid layout
 */
function PhotoGrid({ photos }) {
  // Ensure photos is an array
  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    return (
      <div className="empty-state">
        <p>Ingen billeder fundet for det valgte event.</p>
      </div>
    )
  }

  return (
    <div className="photo-grid">
      {photos.map(photo => (
        <PhotoCard key={photo._id} photo={photo} />
      ))}
    </div>
  )
}

export default PhotoGrid
