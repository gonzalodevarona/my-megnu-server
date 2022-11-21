import mongoose from 'mongoose';


const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    restaurantAdminId: {
        type: String,
        required: true
    }
})

const Menu = mongoose.model('Menu', menuSchema)

export default Menu;

