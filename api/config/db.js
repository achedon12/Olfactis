const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection to MongoDB failed');
    }
}

module.exports = connectDB;

//   cours_mongo:
//     container_name: cours_mongo
//     image: mongo:latest
//     restart: always
//     environment:
//       MONGO_INITDB_ROOT_USERNAME: root
//       MONGO_INITDB_ROOT_PASSWORD: root
//     ports:
//       - "17017:27017"
//     volumes:
//       - ./mongo/data:/data/db
//     networks:
//       - cours_sql