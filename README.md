# wanderlust

Wanderlust 🏡

A full-stack Airbnb clone built with Node.js, Express, and EJS. Users can explore, list ,delete with authentication, image uploads, and maps.

🔗 Live Demo : https://wanderlust-x2v9.onrender.com/listings

🌟 Features

User Authentication – Secure signup and login with Passport.js.

Add/Edit Listings – Users can create and manage their own listings.

Image Uploads – Upload property images using Cloudinary.

Maps & Location – Map integration for property locations.

Responsive Design – Built with Bootstrap for desktop and mobile.

🛠 Tech Stack

| Frontend        | Backend    | Database      | Others            |
| --------------- | ---------- | ------------- | ----------------- |
| EJS Templates   | Node.js    | MongoDB Atlas | Cloudinary        |
| Bootstrap       | Express.js | Mongoose      | Passport.js       |
| HTML / CSS / JS |            |               | Render Deployment |


⚡ Installation

Clone the repository

git clone https://github.com/adnanis78612/wanderlust.git
cd wanderlust


Install dependencies

npm install


Set up environment variables
Create a .env file in the root directory with:

PORT=3000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAPBOX_TOKEN=your_mapbox_token
SESSION_SECRET=your_session_secret


Run the application

npm start


Open in browser
Visit http://localhost:8080/listings

📂 Project Structure
wanderlust/
├── models/         # MongoDB schemas
├── routes/         # Express routes
├── controllers/    # Route logic
├── public/         # CSS, JS, images
├── views/          # EJS templates
├── .env            # Environment variables
├── app.js          # Main server file
├── package.json
└── README.md


🚀 Future Enhancements

Payment integration (Stripe/PayPal)

Advanced search & filters

Wishlist & favorites

Notifications system

📄 License

Open-source under the MIT License.
