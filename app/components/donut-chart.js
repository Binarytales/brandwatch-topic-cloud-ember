import Ember from 'ember';

const DonutChartComponent = Ember.Component.extend({
  tagName: 'svg',

  didInsertElement() {
    const width = 960,
          height = 500,
          radius = Math.min(width, height) / 2;

    var chart = d3.select(this.$()[0])
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    var arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - 30);

    var pie = d3.pie()
      .value(function(d) { return d.count; })
      .sort(null);

    this.set('chart', chart);
    this.set('pie', pie);
    this.set('arc', arc);
  },

  didRender() {
    this._super(...arguments);

    const data = this.get('data');
    const chart = this.get('chart');
    const pie = this.get('pie');
    const arc = this.get('arc');

    const chartUpdates = chart.selectAll('path')
      .data(pie(data))

    chartUpdates.exit().remove()

    chartUpdates.enter()
      .append('path')
      .each(function(d){ this._current = d; })
      .merge(chartUpdates)
      .attr('fill', data => data.data.color)
      .transition()
      .attrTween("d", arcTween);

      // Help Tween the arcs come from the below code found at
      //  http://jonsadka.com/blog/how-to-create-adaptive-pie-charts-with-transitions-in-d3/
      // Store the displayed angles in _current.
      // Then, interpolate from _current to the new angles.
      // During the transition, _current is updated in-place by d3.interpolate.
      function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
        return arc(i(t));
        };
      }

  }
});


DonutChartComponent.reopenClass({
  positionalParams: ['data']
});

export default DonutChartComponent;
