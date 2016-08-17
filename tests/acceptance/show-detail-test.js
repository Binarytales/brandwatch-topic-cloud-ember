import { test } from 'qunit';
import moduleForAcceptance from 'brandwatch/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | show detail');

test('visiting topic detail', function(assert) {

  //server.loadFixtures('topics');

  visit('/topics/1751295897__Berlin');

  andThen(function() {
    assert.equal(currentURL(), '/topics/1751295897__Berlin');

    assert.equal(find('.detail-value-volume').text(), 165);

    assert.equal(find('.detail-value-positive').text(), 29);
    assert.equal(find('.detail-value-negative').text(), 3);
    assert.equal(find('.detail-value-neutral').text(), 133);
  });


  click('#Text1751295897Hammered');

  andThen(function() {
    assert.equal(currentURL(), '/topics/1751295897__Hammered');

    assert.equal(find('.detail-value-volume').text(), 48);

    assert.equal(find('.detail-value-positive').length, 0, "Positive view should have been removed");
    assert.equal(find('.detail-value-negative').text(), 30);
    assert.equal(find('.detail-value-neutral').text(), 18);
  });

});
