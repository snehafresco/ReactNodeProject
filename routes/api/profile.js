const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {
    check,
    validationResult
} = require('express-validator/check');
const req = require('express/lib/request');


router.get('/', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({
                user: req.user.id
            })
            .popolate('user', ['name', 'avatar']);

        if (!profile) {
            res.status(400).send('There is no profile for this user')
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Somthing went wrong')
    }
});

//create or update profile
router.post('/',
    [
        auth,
        [
            check('status', 'Status is required')
            .not()
            .isEmpty(),
            check('skills', 'Skills is required')
            .not()
            .isEmpty(),

        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            company,
            website,
            location,
            boi,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        let profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (boi) profileFields.boi = boi
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;


        try {
            let profile = await Profile.findOne({
                user: req.user.id
            })

            if (profile) {
                //update
                profile = await Profile.findByIdAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                });

                return res.json(profile);
            }
            //create
            profile = new Profile(profileFields);

            await profile.save();

            res.json(profile);


        } catch (err) {
            console.error(err.message);
            res.status(500).send('something went wrong');

        }
    }
);

//get all profile api 
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find()
            .populate('user', ['name', 'avatar']);
        res.json(profiles);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('something went wrong');

    }
})
//get profile by id
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
                user: req.param.user_id
            })
            .populate('user', ['name', 'avatar'])
        if (!profile) return res.status(400).json({
            msg: 'profile not found'
        })
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('something went wrong');

    }
})
//delete profile user and posts
router.delete('/', auth, async (req, res) => {
    try { 
        //remove user posts

        //remove profile
        await Profile.findOneAndRemove({ user:  req.user.id});
        //remove user
        await User.findOneAndRemove({ _id:  req.user.id}) 
        res.json({ msg: 'User deleted'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('something went wrong');

    }
})


module.exports = router;