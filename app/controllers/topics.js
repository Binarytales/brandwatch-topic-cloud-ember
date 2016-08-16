import Ember from 'ember';

export default Ember.Controller.extend({

  volumeRanges: Ember.computed('model', function () {

    const uniqueVolumes = this.get('model').uniqBy('volume').sortBy('volume').map(topic => topic.get('volume'));

    let numOfBrackets = 6;
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
  }),

  wordCloudData: Ember.computed('model', 'volumeRanges', function () {
    return this.get('model').map(topic => {

      let size = 1;

      this.get('volumeRanges').some((rangeCeiling, index) => {
        if (topic.get('volume') <= rangeCeiling) {
          return size = index + 1;
        } else {
          return false;
        }
      });

      const score = topic.get('sentimentScore');

      let sentiment = 'neutral';

      if (score > 60) {
         sentiment = 'positive';
      } else if (score < 40) {
         sentiment = 'negative';
      }

      return {
        id: topic.get('id'),
        text: topic.get('label'),
        size,
        sentiment
      };
    })
  }),

  actions: {
    changeTopic(id) {
      this.transitionToRoute('topics.topic', id);
      return false;
    }
  }

});
