/**
 * EventSelector component
 * Dropdown to filter photos by event
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
        <option value="all">Alle events</option>
        {events.map(event => (
          <option key={event._id} value={event._id}>
            {event.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default EventSelector
