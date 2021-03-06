/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */
(
  function () {
    const corejs = "https://cdn.amcharts.com/lib/4/core.js";
    const chartsjs = "https://cdn.amcharts.com/lib/4/charts.js";
    const animatedjs = "https://cdn.amcharts.com/lib/4/themes/animated.js"
    const forcedirjs = "https://cdn.amcharts.com/lib/4/plugins/forceDirected.js"
    //
    let _Color;
    let _chartTitle;
    let _chartTitleFontSize;
    let _ChartHeight;
    let _ChartWidth;
    // Template DOM
    let template = document.createElement("template");
    template.innerHTML = `
    <div id="chartTitle" style=""></div><br/>
    <div id="chartdiv"></div>
    `;

    function loadScript(src) {
      return new Promise(
        function (resolve, reject) {
          //Try Loading script
          let script = document.createElement('script');
          script.src = src;
          //resolve
          script.onload = function () { resolve(script) };
          //reject
          script.onerror = function () { reject(new Error(`Script load error for ${src}`)) };
          document.head.appendChild(script);
        }

      );
    }

    class forcedirtree extends HTMLElement {
      constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.addEventListener("click", event => {
          var event = new Event("onClick");
          this.dispatchEvent(event);
        });
        this._props = {};
        this._firstConnection = 0;
        this._ChartHeight = "";
        this._ChartWidth = "";
        console.log(`Logging in Constructor`);
      }

      connectedCallback() {
        console.log(`Logging in connectedCallback - Loadthis`);  
        this.loadthis();
      }

      onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
        console.log(`Logginginbeforeupdate`);
      }

      onCustomWidgetAfterUpdate(changedProperties) {
        console.log(`Logginginafterupdate`);
        if ("color" in changedProperties) {          
          this._Color = changedProperties["color"];
          console.log(`Logging in Logginginafterupdate(Color) - beforeloadthis`);
          this.loadthis();
        }
        if ("title" in changedProperties) {          
          this._chartTitle = changedProperties["title"];
          console.log(`Logging in Logginginafterupdate(Title) - beforeloadthis`);
          this.loadthis();
        }
        if ("titlefontsize" in changedProperties) {
          this._chartTitleFontSize = changedProperties["titlefontsize"];
          console.log(`Logging in Logginginafterupdate(Titlefontsize) - beforeloadthis`);
          this.loadthis();
        }        
        if ("datasourceString" in changedProperties) {
          this._datasourceString = changedProperties["datasourceString"];
          this._dsource = JSON.parse(this._datasourceString);
          console.log(`Logging in Logginginafterupdate(datasourceString) - beforeloadthis`);
          console.log(`The Vvalue is`+this._dsource.value);
          this.loadthis();
        }
      }

      onCustomWidgetResize(width, height){
        this._ChartHeight = height;
        this._ChartWidth = width;
        this.redraw();       
       }

      loadthis() {
//// Load Libraries first
        if (this._firstConnection == 0) {
          async function Loadlibs(that) {
            try {
              await loadScript(corejs);
              await loadScript(chartsjs);
              await loadScript(animatedjs);
              await loadScript(forcedirjs);
            } catch (e) {

            } finally {
              that._firstConnection == 1;
              console.log(`Logging in constructor - Libraries loaded`);
              that.redraw();
            }
          }          
          Loadlibs(this);
        } else { this.redraw(); }
      
      }  
      redraw() {  
        let myChart = this.shadowRoot.getElementById('chartdiv');
        if (this._ChartHeight !== "" & this._ChartWidth !== ""){
          myChart.style.height = this._ChartHeight -10  + "px";
          myChart.style.width = this._ChartWidth -10 + "px";
        } else {
          this._ChartHeight = this.shadowRoot.host.clientHeight - 20 + "px";
          this._ChartWidth = this.shadowRoot.host.clientWidth - 20 + "px";
          myChart.style.height = this._ChartHeight;
          myChart.style.width = this._ChartWidth;
        }
        var chartTitle = this.shadowRoot.getElementById('chartTitle');
        chartTitle.innerText = this._chartTitle;
        if (this._chartTitle && this._chartTitle.trim() !== "") {
          if (this._chartTitleFontSize && this._chartTitleFontSize > 0) {
            chartTitle.style.fontSize = this._chartTitleFontSize + "px";
          }
          myChart.style.height = myChart.clientHeight - chartTitle.clientHeight - 10 + "px";
          myChart.style.top = chartTitle.clientHeight - 10 + "px";
        }
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end       

        var chart = am4core.create(myChart, am4plugins_forceDirected.ForceDirectedTree);
        var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

        chart.data = [
          {
            name: "CoreB",
            children: [
              {
                name: "First",
                children: [
                  { name: "A1", value: 100 },
                  { name: "A2", value: 60 }
                ]
              },
              {
                name: "Second",
                children: [
                  { name: "B1", value: 135 },
                  { name: "B2", value: 98 }
                ]
              },
              {
                name: "Third",
                children: [
                  {
                    name: "C1",
                    children: [
                      { name: "EE1", value: 130 },
                      { name: "EE2", value: 87 },
                      { name: "EE3", value: 55 }
                    ]
                  },
                  { name: "C2", value: 148 },
                  {
                    name: "C3", children: [
                      { name: "CC1", value: 53 },
                      { name: "CC2", value: 30 }
                    ]
                  },
                  { name: "C4", value: 26 }
                ]
              },
              {
                name: "Fourth",
                children: [
                  { name: "D1", value: 415 },
                  { name: "D2", value: 148 },
                  { name: "D3", value: 89 }
                ]
              },
              {
                name: "Fifth",
                children: [
                  {
                    name: "E1",
                    children: [
                      { name: "EE1", value: 33 },
                      { name: "EE2", value: 40 },
                      { name: "EE3", value: 89 }
                    ]
                  },
                  {
                    name: "E2",
                    value: 148
                  }
                ]
              }

            ]
          }
        ];
        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.children = "children";
        networkSeries.nodes.template.tooltipText = "{name}:{value}";
        networkSeries.nodes.template.fillOpacity = 1;

        networkSeries.nodes.template.label.text = "{name}"
        networkSeries.fontSize = 10;

        networkSeries.links.template.strokeWidth = 1;

        var hoverState = networkSeries.links.template.states.create("hover");
        hoverState.properties.strokeWidth = 3;
        hoverState.properties.strokeOpacity = 1;

        networkSeries.nodes.template.events.on("over", function (event) {
          event.target.dataItem.childLinks.each(function (link) {
            link.isHover = true;
          })
          if (event.target.dataItem.parentLink) {
            event.target.dataItem.parentLink.isHover = true;
          }

        })

        networkSeries.nodes.template.events.on("out", function (event) {
          event.target.dataItem.childLinks.each(function (link) {
            link.isHover = false;
          })
          if (event.target.dataItem.parentLink) {
            event.target.dataItem.parentLink.isHover = false;
          }
        })        
      }
    }
    customElements.define("com-amcharts-forcedirtree", forcedirtree);
  }
)();

