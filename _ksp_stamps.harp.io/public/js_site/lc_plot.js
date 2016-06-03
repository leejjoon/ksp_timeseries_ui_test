
function plot_lc(rawDataURL) {
  // var rawDataURL = 'test.csv';
  var xField = 'obstime';
  var yField = 'src_net';
  var yerrField = 'src_error';

  var selectorOptions = {
      buttons: [{
          step: 'month',
          stepmode: 'backward',
          count: 1,
          label: '1m'
      }, {
          step: 'all',
      }],
  };

  Plotly.d3.csv(rawDataURL, function(err, rawData) {
      if(err) throw err;

      var data = prepData(rawData);
      var layout = {
          title: 'Light Curve',
          xaxis: {
              rangeselector: selectorOptions,
              rangeslider: {}
          },
          yaxis: {
              fixedrange: true
          }
      };

      var layout2 = {
          title: 'Light Curve',
      };

      Plotly.plot('tester', data, layout2);
  });

  var filenames = [];

  function prepData(rawData) {
      var x = [];
      var y = [];
      var yerr = [];

      rawData.forEach(function(datum, i) {

          x.push(new Date(datum[xField]));
          y.push(datum[yField]);
          yerr.push(datum[yerrField]);
          filenames.push(datum["filename"]);
      });

      return [{
          x: x,
          y: y,
          error_y: {
            type: 'data',
            array: yerr,
            visible: true,
            opacity:0.3
          },
          line: {
            color: 'rgb(128, 128, 128)',
            width: 1,
            opacity: 0.1
          },
          marker: {
            color: 'rgb(128, 0, 0)',
            size: 3
          },
          type: 'scatter',
          mode: 'markers+lines'
      }];
  }

  $('#tester')
      .bind('plotly_hover', function(event,data){
          var infotext = data.points.map(function(d){
              return (d.data.name+': x= '+d.x+', y= '+d.y.toPrecision(3));
          });
          var points = data.points[0], pointNum = points.pointNumber;
          var infotext = pointNum;

          // console.log(infotext);
          set_frame(pointNum);
	  $('#image_text').text(filenames[pointNum]);
          });

}
