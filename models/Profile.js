const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    location: {
        type: String
    },
    skills: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    boi: {
        type: String,
        default: ""
    },
    githubusername: {
        type: String,
        default: ""
    },
    experience: [{
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    education: [{
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    social: {
        youtube: {
            type: String,
            default: ""
        },
        facebook: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
        }
    },
    date: {
        type: Date,
        default: Date.now
    }


});

module.exports = Profile = mongoose.model('profile', ProfileSchema);