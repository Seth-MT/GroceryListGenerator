const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Recipe = new Schema(
    {
        name: { type: String, required: true },
        ingredient: { type: [String], required: true },
        cost: { type: String, required: true },
    },
    { timestamps: true },
);



module.exports = mongoose.model('recipe', Recipe);
