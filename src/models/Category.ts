import mongoose from 'mongoose';
import Dish from './Dish';

const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bannerImg: {
        type: String,
        required: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: "RestaurantAdminId",
        required: true
    },
    dishes:{
        type: [Dish.schema]
    }
})

const Category = mongoose.model('Category', categorySchema)

export default Category;

