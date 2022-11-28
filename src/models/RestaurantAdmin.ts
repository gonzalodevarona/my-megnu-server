import mongoose from 'mongoose';
import Menu from './Menu';


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
    menu: {
        type: Menu.schema
    }
})

const RestaurantAdmin = mongoose.model('RestaurantAdmin', restaurantAdminSchema)

export default RestaurantAdmin;

