# Technical Documentation - Brajesh Gautam Website

## Table of Contents
1. [Backend (Strapi CMS)](#backend-strapi-cms)
   - [System Requirements](#system-requirements)
   - [Project Structure](#project-structure)
   - [Content Types](#content-types)
   - [Components](#components)
   - [API Endpoints](#api-endpoints)
   - [Configuration](#configuration)
   - [Database](#database)
   - [Authentication](#authentication)
   - [Media Management](#media-management)

2. [Frontend (Angular)](#frontend-angular)
   - [Project Structure](#frontend-project-structure)
   - [Components](#frontend-components)
   - [Services](#services)
   - [Routing](#routing)
   - [State Management](#state-management)
   - [Styling](#styling)
   - [Internationalization](#internationalization)

3. [Integration](#integration)
   - [API Integration](#api-integration)
   - [Authentication Flow](#authentication-flow)
   - [Data Flow](#data-flow)

## Backend (Strapi CMS)

### System Requirements
- Node.js >= 14.x
- NPM >= 6.x
- Database: SQLite (Development) / PostgreSQL (Production)

### Project Structure
```
strapi-backend/
├── config/                 # Strapi configuration files
├── database/              # Database configuration and migrations
├── public/               # Public assets
├── src/
│   ├── admin/           # Admin panel customization
│   ├── api/             # Content Types and their configurations
│   │   ├── homepage/
│   │   ├── navigation/
│   │   └── footer/
│   ├── components/      # Reusable components
│   └── extensions/      # Strapi extensions
└── types/               # TypeScript type definitions
```

### Content Types
1. **Homepage**
   - Hero Section
   - Show Section
   - Latest Class Section
   - Gemstones Section
   - Quote Section
   - YouTube Channel Section
   - Social Media Feed
   - Wisdom Podcast Section

2. **Navigation**
   - Logo
   - Contact Information
   - Social Links
   - Menu Items
   - Language Selection
   - Dropdown Menus

3. **Footer**
   - Useful Links Section
   - Other Links Section
   - Contact Us Section
   - Follow Us Section
   - Copyright Section

### Components
1. **Shared Components**
   ```
   src/components/
   ├── common/
   │   ├── meta.json
   │   ├── seo.json
   │   └── social-links.json
   ├── sections/
   │   ├── hero.json
   │   ├── show.json
   │   └── latest-class.json
   └── layout/
       ├── header.json
       └── footer.json
   ```

### API Endpoints
1. **Content API**
   - GET `/api/homepage`: Retrieve homepage data
   - GET `/api/navigation`: Retrieve navigation structure
   - GET `/api/footer`: Retrieve footer content

2. **Media API**
   - GET `/api/upload/files`: Retrieve media files
   - POST `/api/upload`: Upload media files

### Configuration
1. **Server Configuration**
   - Located in `config/server.js`
   - Environment variables for different environments

2. **Database Configuration**
   - Located in `config/database.js`
   - Connection settings for different environments

3. **Middleware Configuration**
   - CORS settings
   - Security settings
   - Custom middleware

### Database
- Development: SQLite
- Production: PostgreSQL recommended
- Database migrations
- Backup and restore procedures

### Authentication
- JWT-based authentication
- Role-based access control
- Admin panel authentication
- API token authentication

### Media Management
- Supported file types
- File size limits
- Image optimization
- Storage providers

## Frontend (Angular)

### Frontend Project Structure
```
brajesh-frontend/
├── src/
│   ├── app/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API and utility services
│   │   ├── models/        # TypeScript interfaces
│   │   └── shared/        # Shared modules and utilities
│   ├── assets/           # Static assets
│   ├── environments/     # Environment configurations
│   └── styles/          # Global styles
```

### Frontend Components
1. **Layout Components**
   - Header Component
   - Footer Component
   - Navigation Component
   - Dropdown Component

2. **Page Components**
   - Home Page
   - Media Page
   - Services Page
   - Contact Page

3. **Shared Components**
   - Button Component
   - Card Component
   - Modal Component
   - Loading Spinner

### Services
1. **API Services**
   ```typescript
   // Content service for Strapi API communication
   ContentService
   MediaService
   AuthService
   ```

2. **Utility Services**
   ```typescript
   LoaderService
   NotificationService
   LocalStorageService
   ```

### Routing
```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'media', component: MediaComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent }
];
```

### State Management
- Using Angular Services for state management
- Local Storage for persistent data
- Session Storage for temporary data

### Styling
1. **Global Styles**
   - CSS Variables
   - Typography
   - Color Palette
   - Responsive Breakpoints

2. **Component Styles**
   - Component-specific SCSS
   - Shared mixins and functions
   - Responsive designs

### Internationalization
- Using Angular i18n
- Language selection
- Translation files
- RTL support

## Integration

### API Integration
1. **Service Setup**
```typescript
@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private apiUrl = environment.strapiUrl;

  constructor(private http: HttpClient) {}

  getHomepage() {
    return this.http.get(`${this.apiUrl}/homepage`);
  }

  getNavigation() {
    return this.http.get(`${this.apiUrl}/navigation`);
  }

  getFooter() {
    return this.http.get(`${this.apiUrl}/footer`);
  }
}
```

### Authentication Flow
1. **User Authentication**
   - JWT token management
   - Token refresh mechanism
   - Secure storage of credentials

2. **API Authentication**
   - Bearer token implementation
   - HTTP interceptors
   - Error handling

### Data Flow
1. **Content Loading**
   - Initial data loading
   - Lazy loading
   - Cache management
   - Error handling

2. **Data Updates**
   - Real-time updates
   - Optimistic updates
   - Error recovery

3. **State Synchronization**
   - Backend to frontend sync
   - Frontend state management
   - Data persistence

## Development Workflow
1. **Local Development**
   ```bash
   # Backend
   cd strapi-backend
   npm run develop

   # Frontend
   cd brajesh-frontend
   ng serve
   ```

2. **Building for Production**
   ```bash
   # Backend
   cd strapi-backend
   npm run build

   # Frontend
   cd brajesh-frontend
   ng build --prod
   ```

3. **Environment Configuration**
   - Development environment
   - Staging environment
   - Production environment

## Security Considerations
1. **API Security**
   - CORS configuration
   - Rate limiting
   - Input validation
   - XSS protection

2. **Frontend Security**
   - Content Security Policy
   - HTTPS enforcement
   - Secure cookie handling
   - Input sanitization

## Performance Optimization
1. **Backend Optimization**
   - Database indexing
   - Query optimization
   - Caching strategies
   - Response compression

2. **Frontend Optimization**
   - Lazy loading
   - Code splitting
   - Image optimization
   - Bundle size optimization

## Deployment
1. **Backend Deployment**
   - Server requirements
   - Environment variables
   - Database migration
   - PM2 configuration

2. **Frontend Deployment**
   - Build optimization
   - CDN configuration
   - Cache control
   - SSL configuration 