const mongoose = require('mongoose');
const ListSchema = new mongoose.schema({
    title: {
        type: String,
        trim: true,
        minlength: 3
    }
});

const List = mongoose.model('List', ListSchema);

module.exports = List;