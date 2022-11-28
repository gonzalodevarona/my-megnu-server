import mongoose from 'mongoose';
import Dish from './Dish';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bannerImg: {
        type: String,
        required: true
    },
    menuId: {
        type: String,
        required: true
    },
    dishes:{
        type: [Dish.schema]
    }
})

const Category = mongoose.model('Menu', categorySchema)

export default Category;

