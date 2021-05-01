const router = require('express').Router();
let Mobile = require('../models/mobile.model');

router.route('/').get((req, res) => {
  Mobile.find()
    .then(mobiles => res.json(mobiles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const mobilename = req.body.mobilename;
  const description = req.body.description;
  const price = Number(req.body.price);
  const date = Date.parse(req.body.date);
  const rating = Number(req.body.rating);
  

  const newMobile = new Mobile({
    mobilename,
    description,
    price,
    date,
    rating,
  });

  newMobile.save()
  .then(() => res.json('Mobile added into Database!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Mobile.findById(req.params.id)
    .then(mobile => res.json(mobile))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Mobile.findByIdAndDelete(req.params.id)
    .then(() => res.json('Mobile deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Mobile.findById(req.params.id)
    .then(mobile => {
      mobile.mobilename = req.body.mobilename;
      mobile.description = req.body.description;
      mobile.price = Number(req.body.price);
      mobile.date = Date.parse(req.body.date);
      mobile.rating = Number(req.body.rating);

      mobile.save()
        .then(() => res.json('Mobile updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;