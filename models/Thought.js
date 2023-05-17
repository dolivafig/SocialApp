const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
            toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

thoughtSchema.virtual('formatCreatedAt').get(function () {
    return this.createdAt.toLocaleString('en-US', { timeZone: 'UTC' });
});

// Initialize our Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
