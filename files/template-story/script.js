/////////////
// MAIN CHART
/////////////
  function setupChart(){
    // arrange colors
    var colors = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58',];
    // colors.reverse();

    // call data from CartoDB table
    var sql = cartodb.SQL({ user: 'aureliamoser' });
      // put a LIMIT on it, otherwise too many bars
    sql.execute("SELECT * FROM aureliamoser.all_month LIMIT 10")
       .done(function(data) {
      // console.log(data);

          var columns = [];
          var value, label;
              for (i in data.rows) {
                value = data.rows[i].mag;
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
                        categories: ['Quakes by Location']
                    },
                    y: {
                        label: {
                            text: 'Magnitude of impact (1969-1970)',
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
                      title: function (d) { return 'Place x Magnitude';},
                  }
                }
            });
        }) // end function setupChart()

  }; // end function main()


$(function () {
  setupChart();
});