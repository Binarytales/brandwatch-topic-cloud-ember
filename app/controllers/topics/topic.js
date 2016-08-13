import Ember from 'ember';

export default Ember.Controller.extend({
  sentimentData: Ember.computed('model', function () {
    const sentiment = this.get('model.sentiment');

    let data = [
      { label: 'positive', count: sentiment.positive || 0, color: '#0F0' },
      { label: 'neutral', count: sentiment.neutral || 0, color: '#00F'},
      { label: 'negative', count: sentiment.negative || 0, color: '#F00'}
    ];

    return data;

  })
});
