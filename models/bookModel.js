import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    readingStatus: {
        type: String,
        enum: ['Not Started', 'Currently Reading', 'Completed'],
        default: 'Not Started',
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

},
    { timestamps: true }
)

const Book = mongoose.model("Book", bookSchema)

export default Book