import Ember from 'ember';

export default Ember.Controller.extend({
  sentimentData: Ember.computed('model', function () {
    const sentiment = this.get('model.sentiment');

    let data = [];

    if (sentiment) {
      data = [
        { label: 'positive', count: sentiment.positive || 0, color: '#9F9' },
        { label: 'neutral', count: sentiment.neutral || 0, color: '#AAB'},
        { label: 'negative', count: sentiment.negative || 0, color: '#F99'}
      ];
    }
    
    return data;
  })
});
