import { test } from 'qunit';
import moduleForAcceptance from 'brandwatch/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | show detail');

test('visiting topic detail', function(assert) {

  visit('/topics/1751295897__Berlin');

  var berlinData = server.db.topics.find('1751295897__Berlin');

  andThen(function() {
    assert.equal(currentURL(), '/topics/1751295897__Berlin');

    assert.equal(find('.detail-value-volume').text(), berlinData.volume);

    assert.equal(find('.detail-value-positive').text(), berlinData.sentiment.positive);
    assert.equal(find('.detail-value-negative').text(), berlinData.sentiment.negative);
    assert.equal(find('.detail-value-neutral').text(), berlinData.sentiment.neutral);
  });


  click('#Text1751295897Hammered');

  var hammeredData = server.db.topics.find('1751295897__Hammered');

  andThen(function() {
    assert.equal(currentURL(), '/topics/1751295897__Hammered');

    assert.equal(find('.detail-value-volume').text(), hammeredData.volume);

    assert.equal(find('.detail-value-positive').length, 0, "Positive view should have been removed");
    assert.equal(find('.detail-value-negative').text(), hammeredData.sentiment.negative);
    assert.equal(find('.detail-value-neutral').text(), hammeredData.sentiment.neutral);
  });

});
