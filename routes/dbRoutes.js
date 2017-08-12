const express = require('express');
const _ = require('lodash');

const User = require('../models/User');
const List = require('../models/List');
const ListItem = require('../models/ListItem');

const router = express.Router();

/*************************
 ****** USER ROUTES ******
 *************************/
router.get('/api/users/:id', function(req, res) {
    const _id = req.params.id;

    User.find({ _id }).exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

router.post('/api/users', function(req, res) {
    const facebook_id = req.body.facebook_id;

    User.findOne({ facebook_id }).exec(function(err, doc) {
        if (err) {
            res.send('');
        } else {
            if (doc) {
                res.send(doc._id);
            } else {
                User.create({ facebook_id }, function(err, doc) {
                    if (err) {
                        res.send('');
                    } else {
                        res.send(doc._id);
                    }
                });
            }
        }
    });
});

/*************************
 ****** LIST ROUTES ******
 *************************/
router.get('/api/users/:id/lists', function(req, res) {
    const _id = req.params.id;

    User.findOne({ _id }).populate('lists').exec(function(err, doc) {
        if (err) {
            res.send('');
        } else {
            res.send(doc.lists);
        }
    });
});

router.get('/api/users/lists/:id', function(req, res) {
    const _id = req.params.id;

    List.findOne({ _id }).populate('items').exec(function(err, doc) {
        if (err) {
            res.send('');
        } else {
            res.send(doc);
        }
    });
});

router.post('/api/users/:id/lists', function(req, res) {
    const _id = req.params.id;
    const name = req.body.name;

    User.findOne({ _id }, function(err, user) {
        if (err) {
            res.send('');
        } else {
            List.create({ name }, function(err, list) {
                if (err) {
                    res.send('');
                } else {
                    user.lists.push(list);
                    user.save();
                    res.send(list);
                }
            });
        }
    });
});

router.put('/api/users/lists/:id', function(req, res) {
    const _id = req.params.id;
    const name = req.body.name;

    List.findByIdAndUpdate({ _id }, { $set: { name }}, function(err, doc) {
        if (err) {
            res.send('');
        } else {
            res.send(doc);
        }
    });
});

router.delete('/api/users/:user_id/lists/:list_id', function(req, res) {
    const user_id = req.params.user_id;
    const list_id = req.params.list_id;

    List.findByIdAndRemove({ _id: list_id }, function(err) {
        if (err) {
            res.send('');
        } else {
            User.findOne({ _id: user_id }).populate('lists').exec(function(err, user) {
                if (err) {
                    res.send('');
                } else {
                    const index = user.lists.indexOf(list_id);
                    if (index > -1) {
                        user.lists.splice(index, 1);
                    }
                    user.save();
                    res.send(user.lists);
                }
            });
        }
    });
});

/******************************
 ****** LIST ITEM ROUTES ******
 ******************************/
router.post('/api/users/lists/:id/items', function(req, res) {
    const _id = req.params.id;
    const name = req.body.name;

    List.findOne({ _id }, function(err, list) {
        if (err) {
            res.send('');
        } else {
            ListItem.create({ name }, function(err, listItem) {
                if (err) {
                    res.send('');
                } else {
                    list.items.push(listItem);
                    list.save();
                    res.send(listItem);
                }
            });
        }
    });
});

router.get('/api/users/lists/:id/items', function(req, res) {
    const _id = req.params.id;

    List.findOne({ _id }).populate('items').exec(function(err, doc) {
        if (err) {
            res.send('');
        } else {
            res.send(doc.items);
        }
    });
});

router.get('/api/users/lists/items/:id', function(req, res) {
    const _id = req.params.id;

    ListItem.findOne({ _id }).exec(function(err, doc) {
        if (err) {
            res.send('');
        } else {
            res.send(doc);
        }
    });
});

router.put('/api/users/lists/items/:id', function(req, res) {
    const _id = req.params.id;

    ListItem.findByIdAndUpdate({ _id }, { $set: req.body }, function(err, doc) {
        if (err) {
            res.send('');
        } else {
            res.send(doc);
        }
    });
});

router.delete('/api/users/lists/:list_id/items/:item_id', function(req, res) {
    const list_id = req.params.list_id;
    const item_id = req.params.item_id;

    ListItem.findByIdAndRemove({ _id: item_id }, function(err) {
        if (err) {
            res.send('');
        } else {
            List.findOne({ _id: list_id }).populate('items').exec(function(err, list) {
                if (err) {
                    res.send('');
                } else {
                    const index = list.items.indexOf(item_id);
                    if (index > -1) {
                        list.items.splice(index, 1);
                    }
                    list.save();
                    res.send(list.items);
                }
            });
        }
    });
});

module.exports = router;