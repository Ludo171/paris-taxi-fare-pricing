const Joi = require('joi');

const validatePricingV1Request = (body) => {
  const schema = Joi.object({
    duration: Joi.number().min(0).required(),
    distance: Joi.number().min(0).required(),
    startTime: Joi.date().required(),
  });
  const validate = schema.validate(body);
  return validate;
};


const pricingV1 = (body) => {
  const price = { cur: 'EUR' };

  // 1) Initial charge 1 EUR (as soon as the taxi starts moving)
  price.amount = 1;

  // 2) + .50 EUR per 1/5 th of a mile (~ +2.5€/mile)
  price.amount += 2.5 * body.distance;

  const startHour = (new Date(body.startTime.substr(0, 19))).getHours();
  const endHour = (new Date(Date.parse(body.startTime.substr(0, 19)) + body.duration * 1000)).getHours();

  const temp = new Date(body.startTime.substr(0, 19));
  const temp2 = new Date(Date.parse(body.startTime.substr(0, 19)) + body.duration * 1000);
  const isRoundClockTrip = temp2 - temp > 24 * 60 * 60 * 1000;

  // 3) + .50 additional EUR between 8PM and 6AM
  if (
    (isRoundClockTrip) ||
    (startHour > endHour && startHour < 20 && endHour >= 6) ||
    (startHour >= 20 || startHour < 6) ||
    (endHour >= 20 || endHour < 6)
  ) {
    price.amount += 0.5;
  }

  // 4) + 1 additional EUR for busy periods between 4PM and 7PM
  if (
    (isRoundClockTrip) ||
    (startHour < 16 && endHour >= 19) ||
    (startHour > endHour && (startHour < 16 || endHour > 19)) ||
    (startHour >= 16 && startHour < 19) ||
    (endHour >= 16 && endHour < 19)
  ) {
    price.amount += 1;
  }

  return price;
};


module.exports = { validatePricingV1Request, pricingV1 };
