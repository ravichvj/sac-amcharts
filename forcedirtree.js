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
        console.log(`LogginginConstructor`);
      }

      connectedCallback() {
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
              that.loadthis();
            }
          }
          Loadlibs(this);
        }
      }

      onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
        console.log(`Logginginbeforeupdate`);
      }

      onCustomWidgetAfterUpdate(changedProperties) {
        console.log(`Logginginafterupdate`);
        if ("color" in changedProperties) {          
          this._Color = changedProperties["color"];
          this.loadthis();
        }
        if ("title" in changedProperties) {          
          this._chartTitle = changedProperties["title"];          
          this.loadthis();
        }
        if ("titlefontsize" in changedProperties) {
          this._chartTitleFontSize = changedProperties["titlefontsize"];
          this.loadthis();
        }
        /*if (this._firstConnection === 1) {
          this.loadthis();
        }*/
      }

      /* onCustomWidgetResize(width, height){
       if (this._firstConnection === 1) {
         this.loadthis();
         }
       }*/

      loadthis() {
        let myChart = this.shadowRoot.getElementById('chartdiv');
        myChart.style.height = this.shadowRoot.host.clientHeight - 20 + "px";
        myChart.style.width = this.shadowRoot.host.clientWidth - 20 + "px";
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
            name: "CoreA",
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

