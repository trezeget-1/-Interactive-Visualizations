d3.json("samples.json").then(function(database){
    console.log(database)

    // This is the code to obtain the ID names of the Test Subjects to put them in the dropdown

    for(let i = 0, n = database.names.length; i<n; i++){
        let selection = d3.select("#selDataset")
        selection.append("option").text(database.names[i]).attr("class","text-center")
    }


    /**This function is to extract the first 10 data cells of each subject ID for making the
     * bar chart and to graph that data into a bar chart.
     * @returns Plotly Bar Chart graph
     */

    function graph_for_subject_id(){

        let top_10_otus_unique_table = []
        let top_10_otus_sample_values = []
        let top_10_otus_labels = []

        let otu_ids_length = database.samples[index]["otu_ids"].length

        let selected_row = database.samples[index]

        if (otu_ids_length >= 10){
            for (let i=0, n = 10; i<n; i++){
                top_10_otus_unique_table.push(`OTU ${selected_row["otu_ids"][i]}`)
                top_10_otus_sample_values.push(selected_row.sample_values[i])
                top_10_otus_labels.push(selected_row.otu_labels[i])              
                }
        }else{
            for (let i=0, n = otu_ids_length; i<n; i++){
                top_10_otus_unique_table.push(`OTU ${selected_row["otu_ids"][i]}`)
                top_10_otus_sample_values.push(selected_row.sample_values[i])
                top_10_otus_labels.push(selected_row.otu_labels[i])                     
                }
        }  
        
        // This is the code to create a BAR CHART

        let data = [{
              x: top_10_otus_sample_values,
              y: top_10_otus_unique_table,
              orientation: 'h',
              type: 'bar',
              mode: 'markers',
              marker: {size:16},
              text: top_10_otus_labels,
              transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'
              }]
            }];
        
        Plotly.newPlot('bar', data);

        // This is the code to create a BUBBLE CHART

        data = [{            
            x: selected_row["otu_ids"],
            y: selected_row.sample_values,
            text: selected_row["otu_labels"],
            mode: 'markers',
            marker: {
              size: selected_row.sample_values,
              color: selected_row["otu_ids"]
            }
          }];          
          
          let layout = {
            xaxis: {
                title: {
                  text: 'OTU ID',
                  font: {                
                    size: 18,
                  }
                },
              },
            hovermode: "closest",
          };
          

          Plotly.newPlot('bubble', data, layout);

        //   This is the code to add the metadata into the website

          let selection = d3.select("#sample-metadata")
          selection.selectAll("li").remove()

          metadata_info = Object.entries(database.metadata[index])

          for(x of metadata_info){            
            selection.append("li").text(`${x[0]}: ${x[1]}`).append("br")
          }
          
          

          // This is the code to create a GAUGE CHART

            data = [{
            type: "pie",
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            values: [100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100],
            text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: ["aqua", "aquamarine", "chartreuse",
                    "chocolate", "bisque", "black", "blanchedalmond", "blue",
                    "blueviolet", "white"]
            },
            }];

            let wash_freq = database.metadata[index]["wfreq"]
            var x1_value = 0
            var y1_value = 0       

                if (wash_freq <= 1){
                    x1_value = .25
                    y1_value = .55
                }else if (wash_freq <= 2){
                    x1_value = .25
                    y1_value = .65
                }else if (wash_freq <= 3){
                    x1_value = .29
                    y1_value = .76
                }else if (wash_freq <= 4){
                    x1_value = .4
                    y1_value = .76
                }else if (wash_freq <= 5){
                    x1_value = .5
                    y1_value = .76
                }else if (wash_freq <= 6){
                    x1_value = .6
                    y1_value = .76
                }else if (wash_freq <= 7){
                    x1_value = .67
                    y1_value = .73
                }else if (wash_freq <= 8){
                    x1_value = .75
                    y1_value = .65
                }else if (wash_freq <= 9){
                    x1_value = .83
                    y1_value = .55
                }


            layout = {
                    margin: { t: 0, b: 0, l: 0, r: 0 },
                shapes:[{
                    type: 'line',
                    x0: .5,
                    y0: 0.5,
                    x1: x1_value,      
                    y1: y1_value,
                    line: {
                        color: 'red',
                        width: 10
                    }
                    }],
                hovermode: false,
                };

            Plotly.newPlot("gauge", data, layout, {staticPlot: false});
    }

    var index = 0
    graph_for_subject_id()




    // This function is to program the action that takes place after the dropdown menu is changed by the user

    d3.select("#selDataset").on("change",function(){        
               
        var id_selected = d3.select("#selDataset").property("value")
        // console.log(`ID_SELECTED: ${id_selected}`);

        for(let i = 0, n = database.names.length; i<n; i++){
            if (database.names[i]===id_selected){
                index = i
                break
            }
        }          

        graph_for_subject_id()

    })



})












