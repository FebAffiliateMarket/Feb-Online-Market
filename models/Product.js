const mongoose = require('mongoose');

// Regular expression for validating image URLs
const imageUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { 
        type: Number, 
        required: true, 
        min: [0, 'Price must be a positive number'] 
    },
    image: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                return imageUrlPattern.test(v);
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    category: { type: String, trim: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;