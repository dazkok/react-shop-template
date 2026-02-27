# React Shop Template

A modern, fully-featured e-commerce shop template built with React, TypeScript, and Bootstrap. This template provides a complete foundation for building online stores with product catalogs, shopping cart functionality, user accounts, and checkout processes.

## 🚀 Features

- **Product Catalog**: Browse products by category with detailed product pages
- **Shopping Cart**: Add/remove items, update quantities with real-time cart management
- **User Authentication**: Login and registration system
- **Account Management**: User profiles, order history, wishlist management
- **Checkout Process**: Multi-step checkout with payment and delivery options
- **Responsive Design**: Mobile-first design using Bootstrap 5
- **State Management**: Redux for efficient state handling
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, professional interface with Swiper.js for carousels

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Bootstrap 5, SCSS
- **State Management**: Redux, React-Redux
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Icons**: Tabler Icons
- **Carousels**: Swiper.js
- **Testing**: Jest, React Testing Library
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── cart-modal/     # Shopping cart modal
│   ├── modals/         # Various modal components
│   ├── page-containers/ # Page layout containers
│   └── products/       # Product-related components
├── pages/              # Page components
│   ├── home/           # Homepage
│   ├── category/       # Category listing
│   ├── product/        # Product details
│   ├── cart/           # Shopping cart
│   ├── checkout/       # Checkout process
│   ├── account/        # User account pages
│   └── login/          # Authentication pages
├── redux/              # Redux store and slices
├── models/             # Data models and interfaces
├── types/              # TypeScript type definitions
└── styles/             # SCSS and CSS files
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-shop-template
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

### `npm start`

Runs the app in the development mode. Opens `http://localhost:3000` in your browser. The page will reload automatically when you make changes.

### `npm run build`

Builds the app for production to the `build` folder. It optimizes the build for the best performance and minifies the output.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run sass:watch`

Watches SCSS files and compiles them to CSS automatically during development.

### `npm run eject`

**Note: This is a one-way operation.** Once you eject, you can't go back! This command copies all build configuration files into your project for full customization.

## 🛒 Application Routes

- `/` - Homepage
- `/c/:category` - Category page
- `/p/:product` - Product details page
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/delivery-and-payment` - Order finalization
- `/login` - User login
- `/register` - User registration
- `/account` - User account dashboard
- `/account/wishlist` - User wishlist
- `/account/orders` - Order history
- `/account/addresses` - Address management
- `/contact` - Contact page
- `/:custom-page` - Custom content pages

## 🔧 Configuration

The project uses TypeScript for type safety. Configuration files include:

- `tsconfig.json` - TypeScript compiler options
- `package.json` - Project dependencies and scripts
- `.gitignore` - Git ignore patterns

## 🎨 Customization

### Styling

The project uses SCSS for styling. Main styles are located in:
- `src/styles/scss/` - SCSS source files
- `src/styles/css/` - Compiled CSS files

### Components

All components are modular and can be easily customized:
- Edit components in `src/components/`
- Each component has its own folder with related files
- Components use TypeScript interfaces for props

### State Management

Redux store is configured in `src/redux/`:
- Store configuration
- Redux slices for different features
- Type-safe state management

## 📱 Responsive Design

The template is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

## 🔗 Links

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Redux Documentation](https://redux.js.org/)
