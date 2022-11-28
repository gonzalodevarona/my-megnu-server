import mongoose from 'mongoose';


const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoriesId: {
        type: [String]
    }
})

const Menu = mongoose.model('Menu', menuSchema)

export default Menu;

