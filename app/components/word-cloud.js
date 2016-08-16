import Ember from 'ember';

var textSizeScale = d3.scalePow()
                      .exponent(2)
                      .domain([1, 6])
                      .range([18, 96]);

export default Ember.Component.extend({
  classNames: ['word-cloud-container'],

  didInsertElement() {
    const $container = this.$(),
          width = $container.width(),
          height = $container.height();

    const data = this.get('data');

    // Calculate word cloud text placement using
    // https://github.com/jasondavies/d3-cloud
    var layout = d3.layout.cloud()
        .size([width, height])
        .words(data)
        .padding(0)
        .rotate(function() { return Math.floor((Math.random() * 6) - 3) * 10; }) 
        .font('Impact')
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
        .append('g')                // create an SVG groupe
        .attr('transform', `translate(${width / 2}, ${height / 2})`) // Center the group
        .selectAll('text')                        // Generate text placeholders
        .data(words)                              // corresponding to each item in the words array
        .enter()                                  // selects the newly created text placeholders and for each one
        .append('text')                           // creates a text element
        .style('font-size', d => `${d.size}px`)   // set the font size
        .style('font-family', 'Impact')           // set the typeface
        .style('fill', d => d.color)              // set the color
        .attr('text-anchor', 'middle')            // set the point from which to transform
        .attr('transform', d => `translate(${[d.x, d.y]}) rotate(${d.rotate})`) // ste the element position according to the calulated data
        .attr('class', 'topic-word')
        .attr('id', d => d.id)
        .text(d => d.text);                       // and finally set the actuall text
    };

    this.$('.topic-word').on('click', e => {
      console.log(e.target.id);
      this.sendAction('selected', e.target.id);
    });
  }
});
