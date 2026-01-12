const STORAGE_KEYS = {
  PHOTO_METADATA: 'photoMetadata',
  USER_AUTH: 'userAuth',
  CART: 'cart',
  ORDERS: 'orders',
};

export const getPhotoMetadata = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PHOTO_METADATA);
  return data ? JSON.parse(data) : {};
};

export const savePhotoMetadata = (photoId, metadata) => {
  const allMetadata = getPhotoMetadata();
  allMetadata[photoId] = metadata;
  localStorage.setItem(STORAGE_KEYS.PHOTO_METADATA, JSON.stringify(allMetadata));
};

export const getUserAuth = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_AUTH);
  return data ? JSON.parse(data) : null;
};

export const saveUserAuth = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER_AUTH, JSON.stringify(user));
};

export const clearUserAuth = () => {
  localStorage.removeItem(STORAGE_KEYS.USER_AUTH);
};

export const getCart = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CART);
  return data ? JSON.parse(data) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem(STORAGE_KEYS.CART);
};

export const getOrders = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return data ? JSON.parse(data) : [];
};

export const saveOrder = (order) => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};
