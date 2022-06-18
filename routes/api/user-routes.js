const router = require('express').Router();
const { User,Thought } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({})
        .populate({
            path: ['thoughts', 'friends'],
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.get(':/id', ({ params }, res) => {
    User.findOne({ _id: params.id })
        .populate({
            path: ['thoughts', 'friends'],
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.post('/', ({ body }, res) => {
    User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
});


















module.exports = router;