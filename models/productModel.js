const {Schema, model, Types} = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    productOwner: {
        type: Types.ObjectId,
        ref: "users"
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const productModel = model("products", productSchema);

module.exports = {
    productModel
}