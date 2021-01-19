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
        
        // This is the code to create a bar chart

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
    }

    let index = 0
    graph_for_subject_id()




    // This function is to program the action that takes place after the dropdown
    // menu is changed by the user

    d3.select("#selDataset").on("change",function(){        
               
        var id_selected = d3.select("#selDataset").property("value")
        // console.log(`ID_SELECTED: ${id_selected}`);

        for(let i = 0, n = database.names.length; i<n; i++){
            if (database.names[i]===id_selected){
                index = i
                // console.log(`INDEX: ${index}`)
                break
            }
        }          

        graph_for_subject_id()

    })



})

