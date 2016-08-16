import Ember from 'ember';

const textSizeScale = d3.scalePow()
                      .exponent(2)
                      .domain([1, 6])
                      .range([24, 120]);

const makeSafeID = function (string) {
  // D3 and jQuery don't like some characters in ID's
  return `text-${string}`.classify().replace(/['/]/g, '');
};

export default Ember.Component.extend({
  classNames: ['word-cloud-container'],

  didInsertElement() {
    const selectedTopic = this.get('selectedTopic');

    const $container = this.$(),
          width = $container.width();

    const height = Math.min(width, window.innerHeight);

    $container.height(height);

    const data = this.get('data');

    const fontFamily = 'Lalezar';

    // Calculate word cloud text placement using
    // https://github.com/jasondavies/d3-cloud
    var layout = d3.layout.cloud()
        .size([1024, 1024])
        .words(data)
        .padding(5)
        .rotate(function() { return Math.floor((Math.random() * 10) - 5) * 2; })
        .font(fontFamily)
        .fontSize(d => textSizeScale(d.size))
        .on('end', draw);

    layout.start();

    function draw(words) {
      // words = the original data array now with layout positioning data
      // calculated from d3.layout.cloud

      d3.select($container[0])      // Find components container
        .append('svg')              // Create am SVG element within
        .attr('width', width)       // Give it a width
        .attr('height', height)     // And a height
        .attr('viewBox', '0 0 1024 1024')
        .append('g')                // create an SVG groupe
        .attr('transform', `translate(512, 512)`) // Center the group
        .selectAll('text')                        // Generate text placeholders
        .data(words)                              // corresponding to each item in the words array
        .enter()                                  // selects the newly created text placeholders and for each one
        .append('text')                           // creates a text element
        .style('font-size', d => `${d.size}px`)   // set the font size
        .style('font-family', fontFamily)           // set the typeface
        .attr('text-anchor', 'middle')            // set the point from which to transform
        .attr('transform', d => `translate(${[d.x, d.y]}) rotate(${d.rotate})`) // ste the element position according to the calulated data
        .attr('class', d => `topic-word sentiment-${d.sentiment}`)
        .attr('data-id', d => d.id)               // data-id is used for navigation - id is used for D3 selected
        .attr('id', d => makeSafeID(d.id))
        .text(d => d.text);                       // and finally set the actuall text
    };

    this.$('.topic-word').on('click', e => {
      this.sendAction('changeTopic', this.$(e.target).data('id'));
    });
  },

  didRender() {
    const selectedTopic = this.get('selectedTopic');
    const previouslySelectedTopic = this.get('previouslySelectedTopic');

    $(`#${makeSafeID(selectedTopic)}`).addClass('selected-topic');
    $(`#${makeSafeID(previouslySelectedTopic)}`).removeClass('selected-topic');

    this.set('previouslySelectedTopic', selectedTopic);
  }
});
