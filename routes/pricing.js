// eslint-disable-next-line new-cap
const router = require('express').Router();
const { validatePricingV1Request, pricingV1 } = require('../pricings/pricing-v1');

// POST Price rides
// |--> Get all rides
router.post('/v1', async (req, res) => {
  try {
    // Validate Body
    const { error } = validatePricingV1Request(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const price = pricingV1(req.body);
    return res.status(200).send(price);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error on POST /pricing/v1');
  }
});

module.exports = router;
