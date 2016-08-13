import Ember from 'ember';

const TopicWordComponent = Ember.Component.extend({
  tagName: 'span',
  classNameBindings: ['sentimentClass', 'volumeClass'],

  sentimentClass: Ember.computed('topic.sentimentScore', function () {
    const score = this.get('topic.sentimentScore');
    let sentiment = 'neutral';

    if (score > 60) {
      sentiment = 'positive';
    } else if (score < 40) {
      sentiment = 'negative';
    }

    return `sentiment-${sentiment}`;
  }),

  volumeClass: Ember.computed('topic.volume', function () {
    const volume = this.get('topic.volume');
    const ranges = this.get('ranges');
    const labels = this.get('labels');

    var label = 'unknown';

    ranges.some((rangeCeiling, index) => {
      if (volume <= rangeCeiling) {
        return label = labels[index];
      } else {
        return false;
      }
    });

    return `volume-${label}`;

  })

});

TopicWordComponent.reopenClass({
  positionalParams: ['topic', 'ranges', 'labels']
});

export default TopicWordComponent;
