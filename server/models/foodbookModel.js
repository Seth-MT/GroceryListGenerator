const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Food = new Schema(
	{
        name: { type: String, required: true },
        ingredient: { type: [String], required: true },
        cost: { type: String, required: true },
    },
);

module.exports = mongoose.model('food', Food);
