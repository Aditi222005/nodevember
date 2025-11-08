import mongoose from "mongoose";        //Package which acts as the bridge betwwen mongodb and controller

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: [100, 'Username must be at most 20 characters long'],
       
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String
    }
});

const Book = new mongoose.model('Book', bookSchema)
export default Book