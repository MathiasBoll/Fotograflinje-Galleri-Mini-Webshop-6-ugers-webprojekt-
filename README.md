# Photography Gallery & Mini Webshop

A React + Vite web application for a Photography School Gallery and Mini Webshop. This application allows users to browse photography events, view photos, and purchase them through an integrated shopping cart and checkout system. Admin users can upload and manage photos.

## Features

- **Responsive Photo Gallery**: Browse photos from different photography events
- **Shopping Cart**: Add photos to cart with quantity management
- **Checkout Flow**: Complete purchase process (demo mode - no real payment)
- **Order Confirmation**: Receive order confirmation with email notification (simulated)
- **User Authentication**: Simple login system with admin role support
- **Protected Admin Pages**: Upload and manage photos (admin only)
- **Local Storage**: Cart, orders, and photo metadata stored locally
- **Clean CSS**: Fully responsive design with modern styling

## API Integration

The application is designed to work with the API at `https://photobooth-lx7n9.ondigitalocean.app`. In cases where the API is unavailable, the application falls back to demo data with placeholder images.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### User Features

1. **Browse Gallery**: View photos from different events on the home page
2. **Login**: Use any email and password to login (include "admin" in email for admin access)
3. **Add to Cart**: Click "Add to Cart" on any photo
4. **Manage Cart**: View cart, adjust quantities, or remove items
5. **Checkout**: Complete the checkout form to place an order
6. **Order Confirmation**: View order details and receive confirmation

### Admin Features

1. **Upload Photos**: Navigate to `/admin/upload` to upload new photos with title and price
2. **Manage Photos**: Navigate to `/admin/manage` to view and delete photos

### Demo Credentials

- **Regular User**: any email without "admin" + any password
- **Admin User**: admin@example.com + any password

## Technology Stack

- **React 19**: UI library
- **Vite**: Build tool and dev server
- **React Router DOM**: Client-side routing
- **Context API**: State management (Auth & Cart)
- **localStorage**: Data persistence
- **CSS**: Styling (no external CSS libraries)
- **Fetch API**: HTTP requests

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── Header.jsx     # Navigation header
│   ├── PhotoCard.jsx  # Photo display card
│   └── ProtectedRoute.jsx  # Route protection
├── contexts/          # React Context providers
│   ├── AuthContext.jsx     # Authentication state
│   └── CartContext.jsx     # Shopping cart state
├── pages/             # Page components
│   ├── Gallery.jsx           # Main gallery page
│   ├── Login.jsx            # Login page
│   ├── Cart.jsx             # Shopping cart page
│   ├── Checkout.jsx         # Checkout page
│   ├── OrderConfirmation.jsx # Order confirmation
│   ├── AdminUpload.jsx      # Admin photo upload
│   └── AdminManage.jsx      # Admin photo management
├── services/          # API services
│   └── api.js        # API calls
├── utils/            # Utility functions
│   └── storage.js    # localStorage helpers
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## Features in Detail

### Authentication
- Simple email/password login system
- Admin role detected by "admin" in email address
- User state persisted in localStorage
- Protected routes for cart, checkout, and admin pages

### Shopping Cart
- Add photos with automatic quantity management
- Update quantities or remove items
- Real-time total calculation
- Cart state persisted across sessions

### Checkout & Orders
- Multi-step form for shipping information
- Order summary display
- Simulated order processing
- Order history stored locally
- Email confirmation (simulated)

### Admin Panel
- Photo upload with title and price metadata
- Photo management with delete functionality
- Metadata stored in localStorage
- Protected by admin-only routes

## Notes

- This is a demo application - no real payment processing
- Photo metadata is stored locally (in production, would use API)
- Images use placeholder service when API is unavailable
- Email confirmations are simulated (no actual emails sent)

## License

This project is part of a 6-week web development course project.
