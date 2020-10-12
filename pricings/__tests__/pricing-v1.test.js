const { pricingV1 } = require('../pricing-v1');

describe('Test Suite - Pricing V1', () => {
  it('Correct price for Non-Busy time trips and Non-Night-Shift trips', () => {
    const testEntries = [
      {
        distance: 10, duration: 3600, startTime: '2020-10-12T06:30:00.000Z', // ~> 6:30 AM -> 7:30 AM
      },
      {
        distance: 5, duration: 1800, startTime: '2020-01-15T14:08:12.000Z', // ~> 2:08 PM -> 2:38 PM
      },
      {
        distance: 40, duration: 240, startTime: '2018-12-15T15:55:00.000Z', // ~> 3:55 PM -> 3:59 PM
      },
      {
        distance: 20, duration: 1800, startTime: '2020-10-15T19:02:00.000Z', // ~> 7:02 PM -> 7:32 PM
      },
    ];

    testEntries.forEach((entry) => {
      const price = pricingV1(entry);
      expect(price.amount).toEqual(1 + 2.5 * entry.distance);
    });
  });

  it('Correct price for busy-time trips', () => {
    const testEntries = [
      {
        distance: 10, duration: 300, startTime: '2020-10-12T16:30:00.000Z', // ~> 4:30 PM -> 4:35 PM
      },
      {
        distance: 5, duration: 7200, startTime: '2020-10-02T15:55:12.000Z', // ~> 3:55 PM -> 5:55 PM
      },
      {
        distance: 40, duration: 16200, startTime: '2020-09-15T15:00:00.000Z', // ~> 3:00 PM -> 7:30 PM
      },
      {
        distance: 20, duration: 3600, startTime: '2020-10-16T18:35:00.000Z', // ~> 6:35 PM -> 7:35 PM
      },
    ];

    testEntries.forEach((entry) => {
      const price = pricingV1(entry);
      expect(price.amount).toEqual(1 + 2.5 * entry.distance + 1);
    });
  });

  it('Correct price for night-shift trips', () => {
    const testEntries = [
      {
        distance: 10, duration: 300, startTime: '2020-10-12T20:30:00.000Z', // ~> 8:30 PM -> 8:35 PM
      },
      {
        distance: 5, duration: 7200, startTime: '2020-10-15T19:55:00.000Z', // ~> 7:55 PM -> 9:55 PM
      },
      {
        distance: 40, duration: 43200, startTime: '2020-10-15T19:01:00.000Z', // ~> 7:01 PM -> 7:01 AM
      },
      {
        distance: 20, duration: 3600, startTime: '2020-10-16T05:35:00.000Z', // ~> 5:35 AM -> 6:35 PM
      },
      {
        distance: 1, duration: 7200, startTime: '2020-10-16T23:35:00.000Z', // ~> 11:35 PM -> 1:35 PM
      },
    ];

    testEntries.forEach((entry) => {
      const price = pricingV1(entry);
      expect(price.amount).toEqual(1 + 2.5 * entry.distance + 0.5);
    });
  });

  it('Correct price for Busy + Night-shift trips', () => {
    const testEntries = [
      {
        distance: 10, duration: 7200, startTime: '2020-10-12T18:30:00.000Z', // ~> 6:30 PM -> 8:30 PM
      },
      {
        distance: 5, duration: 21600, startTime: '2020-01-15T18:55:00.000Z', // ~> 6:55 PM -> 12:55 AM
      },
      {
        distance: 40, duration: 32400, startTime: '2020-10-15T15:00:00.000Z', // ~> 3:00 PM -> 12:00 PM
      },
    ];

    testEntries.forEach((entry) => {
      const price = pricingV1(entry);
      expect(price.amount).toEqual(1 + 2.5 * entry.distance + 0.5 + 1);
    });
  });
});

