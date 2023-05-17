const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought' 
        }
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User' 
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
    const friendCount = this.friends.length;
    return friendCount;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
