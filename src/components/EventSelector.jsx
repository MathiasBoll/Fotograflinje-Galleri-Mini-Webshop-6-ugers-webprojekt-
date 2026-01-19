/**
 * EventSelector component
 * Dropdown menu to filter photos by event
 * 
 * Props:
 * @param {Array} events - Array of event objects from API
 * @param {string} selectedEvent - Currently selected event ID (or "all")
 * @param {Function} onEventChange - Callback function when selection changes
 */
function EventSelector({ events, selectedEvent, onEventChange }) {
  return (
    <div className="event-selector">
      <label htmlFor="event-select">Vælg event:</label>
      <select 
        id="event-select"
        value={selectedEvent} 
        onChange={(e) => onEventChange(e.target.value)}
      >
        {/* Default option to show all events */}
        <option value="all">Alle events</option>
        
        {/* Map through events array and create option for each */}
        {events.map(event => (
          <option key={event._id} value={event._id}>
            {event.title && event.title.trim() ? event.title : 'Unavngivet event'}
          </option>
        ))}
      </select>
    </div>
  )
}

export default EventSelector
