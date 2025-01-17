const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://krsrini7654:1998@ecommerce.lna2j.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce')
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log(error));

