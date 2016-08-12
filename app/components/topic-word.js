import Ember from 'ember';

const TopicWordComponent = Ember.Component.extend({
  classNames: ['topic-word'],
  classNameBindings: ['sentimentClass'],

  sentimentClass: Ember.computed('topic.sentimentScore', function () {
    const score = this.get('topic.sentimentScore');
    let sentiment = 'neutral';

    if (score > 60) {
      sentiment = 'positive';
    } else if (score < 40) {
      sentiment = 'negative';
    }

    return `sentiment-${sentiment}`;
  })
});

TopicWordComponent.reopenClass({
  positionalParams: ['topic']
});

export default TopicWordComponent;
