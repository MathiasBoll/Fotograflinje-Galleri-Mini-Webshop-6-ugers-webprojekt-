const API_BASE_URL = 'https://photobooth-lx7n9.ondigitalocean.app';

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchPhotos = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/photos`);
    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const uploadPhoto = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload photo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

export const deletePhoto = async (photoId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/photos/${photoId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete photo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
};
