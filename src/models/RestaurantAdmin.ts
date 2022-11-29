import mongoose from 'mongoose';

const Schema = mongoose.Schema;


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
    nit: {
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
    },
    menu: [{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }]
})

const RestaurantAdmin = mongoose.model('RestaurantAdmin', restaurantAdminSchema)

export default RestaurantAdmin;

