import Ember from 'ember';

export default Ember.Controller.extend({
  sentimentData: Ember.computed('model', function () {
    const sentiment = this.get('model.sentiment');

    let data = [
      { label: 'positive', count: sentiment.positive || 0, color: '#696' },
      { label: 'neutral', count: sentiment.neutral || 0, color: '#778'},
      { label: 'negative', count: sentiment.negative || 0, color: '#966'}
    ];

    return data;

  })
});
