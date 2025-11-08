import Book from "../model/book.model.js";
import cloudinary from "../config/cloud.js";

export const addBook = async (req, res) => {
    try {
        const { title, author, price, desc, stock, language  } = req.body;
        if (!title || !author || !price || !desc || !stock || !language) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        let imageUrl = undefined

        if(req.file){
            try {
                const uploadResult = await new Promise((resolve, reject) => {
                    const upload = cloudinary.uploader.upload_stream(
                        { folder: "books" },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );
                    upload.end(req.file.buffer);
                });

                imageUrl = uploadResult.secure_url;
               
            } catch (error) {
                console.error(error);
             
                return res.status(500).json({message: 'Image upload error'});
            }
        }

        const newBook = await Book.create({
            title, author, price, desc, stock, language, imageUrl
        });

        res.status(201).json({
            success: true,
            message: "Book added successful",
            newBook:{
                title: newBook.title,
                author: newBook.author,
                price: newBook.price,
                desc: newBook.desc,
                stock: newBook.stock,
                language: newBook.language,
                imageUrl: newBook.imageUrl
            }
        });

    } catch (error) {
        console.log('Error in signup controller: ', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true,
            count : books.length,
            books
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if(!book){
            return res.status(404).json({
                message: "Book not find"
            })
        }

        res.status(200).json({
            success: true,
            book
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}