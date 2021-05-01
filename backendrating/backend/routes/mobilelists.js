const router = require('express').Router();
let Mobilelist = require('../models/mobilelist.model');

router.route('/').get((req, res) => {
  Mobilelist.find()
    .then(mobilelists => res.json(mobilelists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const mobilename = req.body.mobilename;
  const description = req.body.description;
  const price = Number(req.body.price);
  const date = Date.parse(req.body.date);
  const rating = Number(req.body.rating);
  

  const newMobilelist = new Mobilelist({
    mobilename,
    description,
    price,
    date,
    rating,
  });

  newMobilelist.save()
  .then(() => res.json('Mobile list added into Database!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Mobilelist.findById(req.params.id)
    .then(mobilelist => res.json(mobilelist))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Mobilelist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Mobilelist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Mobilelist.findById(req.params.id)
    .then(mobilelist => {
      mobilelist.mobilename = req.body.mobilename;
      mobilelist.description = req.body.description;
      mobilelist.price = Number(req.body.price);
      mobilelist.date = Date.parse(req.body.date);
      mobilelist.rating = Number(req.body.rating);

      mobilelist.save()
        .then(() => res.json('Mobilelist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;