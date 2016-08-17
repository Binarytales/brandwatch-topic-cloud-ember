import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('word-cloud', 'Integration | Component | word cloud', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('wordCloudData', [{
    'id': '1751295897__Hammered',
    'text': 'Hammered',
    'size': 6,
    'sentiment': 'negative'
  }, {
    'id': '1751295897__Quantified Drunk',
    'text': 'Quantified Drunk',
    'size': 5,
    'sentiment': 'neutral'
  }, {
    'id': '1751295897__Berghain resident',
    'text': 'Berghain resident',
    'size': 4,
    'sentiment': 'negative'
  }, {
    'id': '1751295897__Amsterdam',
    'text': 'Amsterdam',
    'size': 3,
    'sentiment': 'positive'
  }, {
    'id': '1751295897__legendary nightclub',
    'text': 'legendary nightclub',
    'size': 2,
    'sentiment': 'positive'
  },{
    'id': '1751295897__D/B Presents',
    'text': 'D/B Presents',
    'size': 1,
    'sentiment': 'neutral'
  }]);

  this.set('selectedTopic', '1751295897__Amsterdam');

  this.on('changeTopic', function() {

  });

  this.render(hbs`{{word-cloud data=wordCloudData selectedTopic=selectedTopic changeTopic=(action "changeTopic")}}`);

  assert.equal(this.$().text().trim(), 'HammeredQuantified DrunkBerghain residentAmsterdamlegendary nightclubD/B Presents');

});
