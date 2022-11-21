import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    menuId: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('Menu', categorySchema)

export default Category;

