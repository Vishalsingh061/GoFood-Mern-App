const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.iss4hdx.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);

        // Create a Mongoose model for the "food_items" collection
        const FoodItem = mongoose.models.food_items || mongoose.model('food_items', new mongoose.Schema({}));

        // Fetch all documents from the "food_items" collection
        const data = await FoodItem.find({});

        // Explicitly specify the collection name for "Categories"
        const Category = mongoose.models.foodCategory || mongoose.model('foodCategory', new mongoose.Schema({}), 'foodCategory');

        // Fetch all documents from the "Categories" collection
        const catData = await Category.find({});

        // Set global variables
        global.food_items = data;
        global.foodCategory = catData;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = mongoDB;
