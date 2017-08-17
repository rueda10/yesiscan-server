const express = require('express');
const _ = require('lodash');

const db = require('../models');

const router = express.Router();

/*************************
 ****** USER ROUTES ******
 *************************/
router.get('/api/users/:id', function(req, res) {
    const where = {
        id: req.params.id
    };

    db.user.findOne({ where }).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.json({ error: 'NOT_FOUND' });
        }
    }).catch(err => {
        res.json({ error: 'NOT_FOUND' });
    });
});

router.post('/api/users', function(req, res) {
    const where = {
        facebook_id: req.body.facebook_id
    }

    db.user.findOne({ where }).then(user => {
        if (user) {
            res.json({ id: user.id });
        } else {
            db.user.create({ facebook_id: req.body.facebook_id }).then(user => {
                if (user) {
                    res.json({ id: user.id });
                } else {
                    res.json({ error: 'NOT_CREATED' });
                }
            }).catch(err => {
                res.json({ error: 'NOT_CREATED' });
            });
        }
    }).catch(err => {
        res.json({ error: 'NOT_FOUND' });
    });
});

/*************************
 ****** LIST ROUTES ******
 *************************/
router.get('/api/users/:id/lists', function(req, res) {
    const where = {
        userId: req.params.id
    }

    db.list.findAll({ where }).then(lists => {
        if (lists) {
            res.json(lists);
        } else {
            res.json({ error: 'NOT_FOUND '});
        }
    }).catch(err => {
        res.json({ error: 'NOT_FOUND' });
    });
});

router.get('/api/users/lists/:id', function(req, res) {
    const where = {
        id: req.params.id
    }

    db.list.findOne({ where }).then(list => {
        if (list) {
            res.json(list);
        } else {
            res.json({ error: 'NOT_FOUND '});
        }
    }).catch(err => {
        res.json({ error: 'NOT_FOUND' });
    });
});

router.post('/api/users/:id/lists', function(req, res) {
    const userId = req.params.id;
    const name = req.body.name;

    db.list.create({ name, userId }).then(list => {
        if (list) {
            res.json(list);
        } else {
            res.json({ error: 'NOT_CREATED'});
        }
    }).catch(err => {
        res.json({ error: 'NOT_CREATED'});
    });
});

router.put('/api/users/lists/:id', function(req, res) {
    const where = {
        id: req.params.id
    }
    const name = req.body.name;

    db.list.findOne({ where }).then(list => {
        if (list) {
            list.update({name}).then(newList => {
                if (newList) {
                    res.json(newList);
                } else {
                    res.json({ error: 'NOT_MODIFIED' });
                }
            }).catch(err => {
                res.json({ error: 'NOT_MODIFIED'});
            });
        } else {
            res.json({ error: 'NOT_FOUND'})
        }
    }).catch(err => {
        res.json({ error: 'NOT_FOUND'});
    });
});

router.delete('/api/users/:user_id/lists/:list_id', function(req, res) {
    const where = {
        id: req.params.list_id
    }

    db.list.destroy({ where }).then(list => {
        if (list) {
            const where = {
                userId: req.params.user_id
            }
            db.list.findAll({ where }).then(lists => {
                if (lists) {
                    res.json(lists);
                } else {
                    res.json({ error: 'NOT_FOUND '});
                }
            }).catch(err => {
                res.json({ error: 'NOT_FOUND' });
            });
        } else {
            res.json({ error: 'NOT_DESTROYED' });
        }
    }).catch(err => {
        res.json({ error: 'NOT_DESTROYED'});
    });
});

// /******************************
//  ****** LIST ITEM ROUTES ******
//  ******************************/
router.post('/api/users/lists/:id/items', function(req, res) {
    const listId = req.params.id;
    if (listId) {
        req.body.listId = listId;
    }

    db.item.create(req.body).then(item => {
        if (item) {
            res.json(item);
        } else {
            res.json({ error: 'NOT_CREATED' });
        }
    }).catch(err => {
        res.json({ error: 'NOT_CREATED'});
    });
});

router.get('/api/users/lists/:id/items', function(req, res) {
    const where = {
        listId: req.params.id
    }

    db.item.findAll({ where }).then(items => {
        if (items) {
            res.json(items);
        } else {
            res.json({ error: 'NOT_FOUND '});
        }
    }).catch(err => {
        res.json({ error: 'NOT_FOUND' });
    });
});

router.get('/api/users/lists/items/:id', function(req, res) {
    const where = {
        id: req.params.id
    }

    db.item.findOne({ where }).then(item => {
        if (item) {
            res.json(item);
        } else {
            res.json({ error: 'NOT_FOUND '});
        }
    }).catch(err => {
        res.json({ error: 'NOT_FOUND' });
    });
});

router.put('/api/users/lists/:list_id/items/:item_id', function(req, res) {
    const where = {
        id: req.params.item_id
    }

    db.item.update(req.body, { where }).then(item => {
        if (item) {
            const where = {
                listId: req.params.list_id
            }
            db.item.findAll({ where }).then(lists => {
                if (lists) {
                    res.json(lists);
                } else {
                    res.json({ error: 'NOT_FOUND '});
                }
            }).catch(err => {
                res.json({ error: 'NOT_FOUND' });
            });
        } else {
            res.json({ error: 'NOT_MODIFIED '});
        }
    }).catch(err => {
        res.json({ error: 'NOT_MODIFIED' });
    });
});

router.delete('/api/users/lists/:list_id/items/:item_id', function(req, res) {
    const where = {
        id: req.params.item_id
    }

    db.item.destroy({ where }).then(item => {
        if (item) {
            res.json(item);
        } else {
            res.json({ error: 'NOT_DESTROYED' });
        }
    }).catch(err => {
        res.json({ error: 'NOT_DESTROYED'});
    });
});

module.exports = router;