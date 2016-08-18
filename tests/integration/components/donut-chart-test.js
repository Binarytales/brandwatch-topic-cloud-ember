import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('donut-chart', 'Integration | Component | donut chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('sentimentData', [
    { label: 'positive', count: 50, color: '#9F9' },
    { label: 'neutral', count: 30, color: '#AAB'},
    { label: 'negative', count: 20 || 0, color: '#F99'}
  ]);

  this.render(hbs`{{donut-chart sentimentData}}`);

  assert.equal(this.$().text().trim(), '');

});
