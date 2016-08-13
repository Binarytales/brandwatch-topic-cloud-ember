import Ember from 'ember';

export default Ember.Controller.extend({
  volumeLabels: [
    'verylow',
    'low',
    'medium',
    'high',
    'veryhigh',
    'epic'
  ],

  volumeRanges: Ember.computed('model', function () {

    const topics = this.get('model').sortBy('volume');
    const labels = this.get('volumeLabels');
    const numRanges = labels.length;

    const max = topics.get('lastObject.volume');
    const min = topics.get('firstObject.volume');
    const delta = max - min;

    let ranges = [];

    /*
      Calculating the modulo and removing it from calculating the size of a
      single range ensures no boundries are missed due to rounding
    */

    let margin = delta % numRanges;
    const singleRange = (delta - margin) / numRanges;

    let nextRangeCeiling = min;

    console.log(nextRangeCeiling);

    while (nextRangeCeiling < max) {
      nextRangeCeiling = nextRangeCeiling + singleRange;

      // If any margin remains distribute evenly across the ranges
      if (margin) {
        nextRangeCeiling++;
        margin--;
      }
      ranges.push(nextRangeCeiling);
    }
    
    return ranges;
  })
});
