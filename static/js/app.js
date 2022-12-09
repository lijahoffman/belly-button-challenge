// OUTLINE
// 1.  Webpage will have the following:
//     *  Dropdown that will allow selection of a name/id
//     *  Horizontal bar chart that shows data related to only the id
//     *  Bubble chart shows data related only to id
//     *  Summary section that only shows data related to id
// 2.  So every graphic needs the id and the only part that is independent is the dropdown
// 3.  The dropdown has many options so it needs created dynamically based on what is in the data file
// 4.  The page will load with a default selected id but needs to update based on the dropdown selection
//     *  This tells me that I need to run code once and then same code again with only an id change.
//     *  This sounds like a good time to use a function like  `createPlot(id)`
// 5.  Note:  The html already has several things built-in:
//     a.  you are given empty divs with ids called:
//         *  `selDataset` ==> used for the dropdown
//         *  `sample-metadata` ==> used for the summary data section
//         *  `bar` ==> used for the horizontal bar chrt
//         *  `gauge` ==> (optional) used for gauge chart
//         *  `bubble` ==> used for bubble chart
//     b.  There is an inline event handler in the html.  It looks like this:
//         `<select id="selDataset" onchange="optionChanged(this.value)"></select>`
//         This line of code is part of the dropdown, aka in html terms a `select`
//         If you look up the code for a select it is made up of options (dropdown entries)
//         and values associated with each option.  The value for the select is based on what option is selected.
//         i.e.  Dropdown has selected 'Subject 940' and maybe the value associated with this is `940`.
//               The '940' is captured by using 'this.value'... So 'this.value' captures the current selection value.
//               The 'optionChanged()' is a function that you need to make in your app.js that updates
//               some type of data filter that filters the data only related to '940' and then that 
//               data is used in all the charts.
//     c.  On Day 3 we will cover event handlers from the js file but we do not cover inline event handlers in the html.  
//         The only differene is where we call them but otherwise they work the same.
//     d.  You already have the data connected - notice the names list matches the id's used in the 
//         other data structures below.  Inspect the data - there are several sections - which one would 
//         be used for each chart?  Look at the images in the readme and matchup the data.  There is not
//         much that needs done except filtering and ordering of the existing data.



// SAMPLE STRUCTURE
// 1.  Check inspector console to see if each function is running on page load


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





// STRATEGIES
// 1.  Inside-Out:  Generate each chart by assuming an ID/name then refactor the code to 
//                  work for any ID/name coming from the function.  I typically do this practice.
// 2.  Outside-In:  Generate the control (dropdown) and how the control interacts with the other parts.
//                  I gave you the basics of how it interacts above.  You could generate the dropdown
//                  and then see in the console the ID/names update as you make a change.  Then you could
//                  make your chart code.

// Overall, the above are the two steps you need to do (1.  Make plots with data, 2. make dropdown that passes id to functions)
// You could do it in either order.