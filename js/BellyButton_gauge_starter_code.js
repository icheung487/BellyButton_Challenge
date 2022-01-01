// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultsArray = samples.filter(obj => obj.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var result = resultsArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaResult = metadataArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = result.otu_ids;
    var otuLabs = result.otu_labels;
    var sampleVals = result.sample_values; 

    // 3. Create a variable that holds the washing frequency.
    var washingFreq = parseInt(metaResult.wfreq);

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", [barData], barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bubble", [bubbleData], bubbleLayout);   
   
    console.log("time to trace")
    // 4. Create the trace for the gauge chart.
    var gaugeData = {
      value: washingFreq,
      title: {text: "Belly Button Washing Frequency<br>Scrubs per Week"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [0,10]},
        steps: [
          {range: [0,2], color:"#ea2c2c"},
          {range: [2,4], color:"#ea822c"},
          {range: [4,6], color:"#ee9c00"},
          {range: [6,8], color:"#eecc00"},
          {range: [8,10], color:"#d4ee00"}
        ]
      }
    };
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width: 600, height: 450, margin: {t: 0, b: 0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", [gaugeData], gaugeLayout);
  });
}
