
// function that contains instructions at page load/refresh
// function does not run until called

function init(){
    // code that runs once (only on page load or refresh)

    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(url).then(function(data) {
     console.log(data);
     for (let i = 0; i < data["names"].length; i++) {
        let opt = d3.select("#selDataset").append("option");
        opt.text(data["names"][i]);
    // let metadata = data["metadata"];
    // let samples = data["samples"];

     }
    });

    createScatter('940');
    createBar('940');
    createSummary('940');

    // this checks that our initial function runs.
    console.log("The Init() function ran")
}



// function that runs whenever the dropdown is changed
// this function is in the HTML and is called with an input called 'this.value'
// that comes from the select element (dropdown)
function optionChanged(newID){
    // code that updates graphics
    // one way is to recall each function
    createScatter(newID)
    createBar(newID)
    createSummary(newID)

}



function createScatter(id){
    // code that makes scatter plot at id='bubble'
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(url).then(function(data) {
        console.log(data);

        let samples = data["samples"];

        let x = [],
            y = [],
            s = [],
            c = [],
            t = [];

        for (let i = 0; i < samples.length; i++) {
            if (samples[i]["id"] === id) {
                row = samples[i]

                x.push(row["otu_ids"]);
                y.push(row["sample_values"]);
                s.push(row["sample_values"]);
                c.push(row["otu_ids"]);
                t.push(row["otu_labels"])

                console.log(x[0], y[0])

                Plotly.newPlot('bubble',
                    {data: [
                      {
                        type: "scatter",
                        mode: "markers",
                        x: x[0],
                        y: y[0],
                        text: t[0],
                        marker: { 
                            size: s[0], 
                            color: c[0]
                        },
                     
                      }
                    ],
                    layout: {
                      title: "Higher Risk of Job Automation in Lower Paying Jobs",
                      hovermode: "closest",
                      hoverlabel: { bgcolor: "#FFF" },
                      legend: {orientation: 'h', y: -0.3},
                      xaxis: {
                        tickformat: ".0%",
                        title: "Automation Probability",
                        zeroline: false
                      },
                      yaxis: {
                        title: "Income",
                        zeroline: false
                      }
                    },
                    config: { responsive: true }
                });

            }
        }
     

        

    })
        


    // checking to see if function is running
    console.log(`This function generates scatter plot of ${id} `)
}



function createBar(id){

    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(url).then(function(data) {
        console.log(data);

        let samples = data["samples"];

        for (let i = 0; i < samples.length; i++) {
            if (samples[i]["id"] === id) {

                let otuID = samples[i]["otu_ids"].slice(0,10).map(i => `otu_id ${i}`).reverse();
                let sampleValues = samples[i]["sample_values"].slice(0,10).reverse();
                let otuLabels = samples[i]["otu_labels"].slice(0,10).reverse();
    
                let trace1 = {
                    x: sampleValues,
                    y: otuID,
                    type: 'bar', 
                    orientation: 'h'
                };

                let traceData = [trace1]
    
                let layout = {
                    title: "title"
                }; 
    
                Plotly.newPlot("bar", traceData, layout)

               };
        }
        })

    // checking to see if function is running
    console.log(`This function generates bar chart of ${id} `)
}



function createSummary(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(url).then(function(data) {
     console.log(data);

    let samples = data["metadata"];

    console.log("test2", samples[0])

    d3.select("ul").html("");

        for (let i = 0; i < samples.length; i++) {
            if (samples[i]["id"] == id) {

                console.log("test", samples[i])

                let item1 = d3.select("ul").append("li");
                item1.text("id: " + samples[i]["id"]);

                let item2 = d3.select("ul").append("li");
                item2.text("ethnicity: " + samples[i]["ethnicity"]);

                let item3 = d3.select("ul").append("li");
                item3.text("gender: " + samples[i]["gender"]);

                let item4 = d3.select("ul").append("li");
                item4.text("age: " + samples[i]["age"]);

                let item5 = d3.select("ul").append("li");
                item5.text("location: " + samples[i]["location"]);

                let item6 = d3.select("ul").append("li");
                item6.text("bbtype: " + samples[i]["bbtype"]);

                let item7 = d3.select("ul").append("li");
                item7.text("wfreq: " + samples[i]["wfreq"]);

               };
        }


    });

    // checking to see if function is running
    console.log(`This function generates summary info of ${id} `)
}




// function called, runs init instructions
// runs only on load and refresh of browser page
init()


