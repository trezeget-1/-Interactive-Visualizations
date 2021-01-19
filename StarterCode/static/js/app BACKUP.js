d3.json("samples.json").then(function(database){
    console.log(database)

    





    for(let i = 0, n = database.names.length; i<n; i++){
        let selection = d3.select("#selDataset")
        selection.append("option").text(database.names[i]).attr("class","text-center")
    }




    var top_10_otus_unique_table = []
    var top_10_otus_sample_values = []

    var index = 0

    let otu_ids_length = database.samples[index]["otu_ids"].length

        let selected_row = database.samples[index]

        if (otu_ids_length >= 10){
            for (let i=0, n = 10; i<n; i++){
                top_10_otus_unique_table.push(`OTU ${selected_row["otu_ids"][i]}`)
                top_10_otus_sample_values.push(selected_row.sample_values[i])           
                }
        }else{
            for (let i=0, n = otu_ids_length; i<n; i++){
                top_10_otus_unique_table.push(`OTU ${selected_row["otu_ids"][i]}`)
                top_10_otus_sample_values.push(selected_row.sample_values[i])                  
                }
        }  

        let x_axis = top_10_otus_unique_table
        let y_axis = top_10_otus_sample_values
    
        let data = [
            {
              x: x_axis,
              y: y_axis,
            //   orientation: 'h',
              type: 'bar'
            }
          ];
          
          Plotly.newPlot('bar', data);









    d3.select("#selDataset").on("change",function(){
        top_10_otus_unique_table = []
        top_10_otus_sample_values = []

        var id_selected = d3.select("#selDataset").property("value")
        console.log(`ID_SELECTED: ${id_selected}`);

        for(let i = 0, n = database.names.length; i<n; i++){
            if (database.names[i]===id_selected){
                index = i
                console.log(`INDEX: ${index}`)
                break
            }
        }          

        // console.log(database.samples[index]["otu_ids"].length)

        let otu_ids_length = database.samples[index]["otu_ids"].length

        let selected_row = database.samples[index]

        if (otu_ids_length >= 10){
            for (let i=0, n = 10; i<n; i++){
                top_10_otus_unique_table.push(`OTU ${selected_row["otu_ids"][i]}`)
                top_10_otus_sample_values.push(selected_row.sample_values[i])           
                }
        }else{
            for (let i=0, n = otu_ids_length; i<n; i++){
                top_10_otus_unique_table.push(`OTU ${selected_row["otu_ids"][i]}`)
                top_10_otus_sample_values.push(selected_row.sample_values[i])                  
                }
        }  

        let x_axis = top_10_otus_unique_table
        let y_axis = top_10_otus_sample_values
    
        let data = [
            {
              x: x_axis,
              y: y_axis,
            //   orientation: 'h',
              type: 'bar'
            }
          ];
          
          Plotly.newPlot('bar', data);


        })








})





