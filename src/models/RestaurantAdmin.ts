import mongoose from 'mongoose';


const restaurantAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    restaurantType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const RestaurantAdmin = mongoose.model('RestaurantAdmin', restaurantAdminSchema)

export default RestaurantAdmin;

