/////////////
// MAIN CHART
/////////////
  function setupChart(){
    // arrange colors
    var colors = ['#352c3a','#462d35','#572f30','#68302b','#783127','#9a341d','#9a341d','#ab3518','#bc3713','#cd380e','#dd390a','#ee3b05','#ff3c00'];
    colors.reverse();

    // call data from CartoDB table
    var sql = cartodb.SQL({ user: 'aureliamoser' });
      // put a LIMIT on it, otherwise too many bars
    sql.execute("SELECT * FROM meteorites mt WHERE (mass >= 15500000 AND mass <= 60000000) ORDER BY mt.mass ASC LIMIT 12")
       .done(function(data) {
      // console.log(data);

          var columns = [];
          var value, label;
              for (i in data.rows) {
                value = data.rows[i].mass;
                label = data.rows[i].place;
                columns.push([label, value]);
              }
              console.log(data);
          // create chart
            var chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: columns,
                    type:'bar'
                },
                bar: {
                    width: 100,
                },
                color: {
                  pattern: colors
                },
                axis: {
                    x: {
                        type : 'category',
                        categories: ['Places Where Largest Meteorites Seen']
                    },
                    y: {
                        label: {
                            text: 'Mass of Meteorites (1969-1970)',
                            position: 'outer-middle',
                        },
                        padding: {
                            left: 10,
                        }
                    }
                },
                size: {
                    height: 275
                },
                tooltip: {
                  // must have a function for tooltips :(
                  format: {
                      title: function (d) { return 'Place x Mass';},
                  }
                }
            });
        }) // end function setupChart()

  }; // end function main()


$(function () {
  setupChart();
});