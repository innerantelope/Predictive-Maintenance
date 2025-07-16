# Predictive Maintenance of Machine

A comprehensive web-based predictive maintenance system that uses AI to analyze industrial equipment images and provide maintenance recommendations.

## Features

- **AI-Powered Image Analysis**: Uses Google's Teachable Machine and TensorFlow.js for real-time machine classification
- **Aesthetic Dark Theme**: Modern glassmorphism design with animated gradients and backdrop blur effects
- **Maintenance Dashboard**: Visual health status cards for different machine types
- **Predictive Recommendations**: Intelligent maintenance suggestions based on machine type and confidence levels
- **Real-time Statistics**: Tracks total analyses, accuracy rates, and maintenance alerts
- **Database Integration**: PostgreSQL database for storing analysis history and results
- **RESTful API**: Node.js/Express backend with file upload capabilities

## Machine Types Supported

- **Sheet Bending Machine**: Industrial sheet metal bending equipment
- **Manual Disk**: Manual disk-based machinery for cutting and grinding
- **Half Automatic Disk**: Semi-automated disk machinery
- **CNC Machine**: Computer Numerical Control precision manufacturing

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- TensorFlow.js for machine learning
- Teachable Machine for model integration
- Responsive design with CSS Grid/Flexbox

### Backend
- Node.js with Express.js
- PostgreSQL database
- Drizzle ORM for database operations
- Multer for file uploads
- CORS enabled for cross-origin requests

### Infrastructure
- Replit hosting platform
- Automated workflows for development
- Environment variable management

## Setup Instructions

1. **Environment Setup**
   ```bash
   # Install dependencies
   npm install
   
   # Set up database
   npm run db:push
   ```

2. **Environment Variables**
   - `DATABASE_URL`: PostgreSQL connection string
   - `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`: Database credentials

3. **Start the Application**
   ```bash
   # Start API server (port 3000)
   node server/server.js
   
   # Start web server (port 5000)
   python3 -m http.server 5000
   ```

## API Endpoints

- `POST /api/analyses` - Save machine analysis results
- `GET /api/analyses` - Retrieve analysis history
- `GET /api/health` - Health check endpoint
- `GET /uploads/:filename` - Serve uploaded images

## Usage

1. **Upload Machine Image**: Click "🔍 Analyze Machine" to select an image
2. **AI Analysis**: The system processes the image and provides classification results
3. **View Results**: See confidence scores and maintenance recommendations
4. **Dashboard**: Monitor system statistics and machine health status
5. **History**: Review previous analyses and trends

## Database Schema

### Users Table
- `id`: Primary key
- `username`: Unique username
- `email`: User email
- `created_at`: Registration timestamp

### Machine Analyses Table
- `id`: Primary key
- `user_id`: Foreign key to users
- `image_path`: Path to uploaded image
- `top_prediction`: Machine type prediction
- `top_confidence`: Confidence score
- `predictions`: JSON of all predictions
- `created_at`: Analysis timestamp

### Machine Types Table
- `id`: Primary key
- `name`: Machine type name
- `description`: Machine description
- `maintenance_interval`: Maintenance schedule (days)

### Maintenance Records Table
- `id`: Primary key
- `machine_type_id`: Foreign key to machine types
- `user_id`: Foreign key to users
- `maintenance_type`: Type of maintenance
- `description`: Maintenance details
- `cost`: Maintenance cost
- `performed_at`: Maintenance date

## Maintenance Recommendations

The system provides intelligent maintenance recommendations based on:

- **Machine Type**: Specific guidance for each equipment type
- **Confidence Level**: Risk assessment based on AI certainty
- **Maintenance Intervals**: Scheduled maintenance reminders

### Confidence Levels
- **High (80%+)**: Normal maintenance schedule
- **Medium (50-79%)**: Increased monitoring recommended
- **Low (<50%)**: Immediate attention required

## File Structure

```
├── index.html              # Main application interface
├── server/
│   ├── server.js           # API server
│   ├── db.ts               # Database configuration
│   ├── storage.ts          # Data access layer
│   └── api.ts              # API routes (TypeScript)
├── shared/
│   └── schema.ts           # Database schema definitions
├── drizzle/
│   └── config.ts           # Drizzle ORM configuration
├── uploads/                # Image storage directory
└── README.md               # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use and modify as needed.

## Support

For issues or questions, please check the console logs for detailed error messages and ensure all dependencies are properly installed.
