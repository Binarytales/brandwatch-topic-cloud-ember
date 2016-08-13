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

    const uniqueVolumes = this.get('model').uniqBy('volume').sortBy('volume').map(topic => topic.get('volume'));

    let numOfBrackets = this.get('volumeLabels').length;
    const numOfVolumes = uniqueVolumes.length;

    let ranges = [];

    /*
      Calculating the modulo and removing it from calculating the size of a
      single range ensures no boundries are missed due to rounding and a more
      equal distibution
    */

    let overflow = numOfVolumes % numOfBrackets;
    const volumesPerBracket = (numOfVolumes - overflow) / numOfBrackets;

    let i = -1;

    while (numOfBrackets) {

      if (overflow) {
        i = i + volumesPerBracket + 1;
        overflow--;
      } else {
        i = i + volumesPerBracket;
      }
      ranges.push(uniqueVolumes[i]);
      numOfBrackets--;

    }
    
    return ranges;
  })
});
