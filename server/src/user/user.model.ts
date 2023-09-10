import mongoose from 'mongoose';

interface Links {
    platform: string;
    url: string;
}

interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    bio: string;
    links: Array<{ platform: string; url: string }>;
}

const LinkSchema = new mongoose.Schema<Links>(
    {
        platform: String,
        url: String
    },
    { _id: false }
);

const UserSchema = new mongoose.Schema<User>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: [100, 'Email should not exceed 100 characters'],
            match: [
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                'Invalid email format'
            ]
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            maxlength: [30, 'Max length 30 characters'],
            trim: true,
            default: ''
        },
        lastName: {
            type: String,
            maxlength: [30, 'Max length 30 characters'],
            trim: true,
            default: ''
        },

        bio: {
            type: String,
            maxlength: [255, 'Max length 30 characters'],
            trim: true,
            default: ''
        },
        profileImage: {
            type: String,
            default: ''
        },
        links: {
            type: [LinkSchema],
            validate: [
                {
                    validator: function (links: Array<Links>) {
                        return links.length <= 20;
                    },
                    message: 'Max length for links array is 20'
                }
            ]
        }
    },

    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export { User };
