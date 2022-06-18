const { Schema, model, Types } = require('mongoose');
const dateTimeFormat = require('../utils/dateTimeFormat');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        validate: [({ length }) => length <= 280, 'Maximum 280 characters!']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateTimeFormat(createdAtVal)
    }
});


module.exports = reactionSchema;