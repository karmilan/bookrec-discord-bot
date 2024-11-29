import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// const client = new Client({
//     intents: [
//         GatewayIntentBits.Guilds,
//         GatewayIntentBits.GuildMessages,
//         GatewayIntentBits.MessageContent
//     ]
// });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));

client.once('ready', () => {
    console.log('BookManagerBot is online!');
    // console.log(client);

});

client.on(Events.InteractionCreate, async interaction => {
    console.log(interaction);

})

client.on('messageCreate', (message) => {
    console.log('Message received:', message.content); // Log message content
    if (message.author.bot) return; // Ignore bot messages

    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});


// client.on('messageCreate', (message) => {
//     console.log('Message received:', message); // Debugging log
// });



// client.on('messageCreate', async (message) => {
//     console.log(message)
//     if (!message.content.startsWith('!') || message.author.bot) return;

//     const args = message.content.slice(1).trim().split(/ +/);
//     const command = args.shift().toLowerCase();

//     if (command === 'addbook') {
//         console.log('addbook command received')
//         const [title, author, genre, description, readingStatus, isFavourite] = args.join(' ').split(';');
//         const newBook = new Book({ title, author, genre, description, readingStatus, isFavourite, user: message.author.id });
//         await newBook.save();
//         message.channel.send(`Book "${title}" by ${author} added to your collection.`);
//     }

//     if (command === 'listbooks') {
//         const books = await Book.find({ user: message.author.id });
//         message.channel.send(books.map(book => `${book.title} by ${book.author} (${book.genre})`).join('\n'));
//     }

//     if (command === 'addreview') {
//         const [bookId, rating, comment] = args;
//         const newReview = new Review({ userId: message.author.id, bookId, rating, comment });
//         await newReview.save();
//         message.channel.send(`Review added to book with ID ${bookId}.`);
//     }

//     if (command === 'listreviews') {
//         const reviews = await Review.find({ userId: message.author.id });
//         message.channel.send(reviews.map(review => `Book ID: ${review.bookId}, Rating: ${review.rating}, Comment: ${review.comment}`).join('\n'));
//     }
// });

client.login(process.env.DISCORD_TOKEN).then(() => console.log('Bot logged in successfully!'))
    .catch((err) => console.error('Login error:', err))