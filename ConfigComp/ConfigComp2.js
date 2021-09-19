(function() {
  let _shadowRoot;
  let _id;
  let _password;

  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
      <style>
      </style>
      <div id="ui5_content" name="ui5_content">        
        <slot name="content"></slot>
      </div>
      <script id="oView" name="oView" type="sapui5/xmlview">
          <mvc:View
              controllerName="myView.Template"
              xmlns:l="sap.ui.layout"
              xmlns:mvc="sap.ui.core.mvc"
              xmlns="sap.m">
              <Input
                        id="passwordInput"
                        type="Password"
                        placeholder="Enter password ..." liveChange="onButtonPress"/>  
                <Input
                        id="NormalInput"                        
                        placeholder="Enter Input ..."/>              
            </mvc:View>
        </script> 
        
  `;

  class ConfigComp extends HTMLElement {

      constructor() {
          super();

          _shadowRoot = this.attachShadow({
              mode: "open"
          });
          _shadowRoot.appendChild(tmpl.content.cloneNode(true));
          
          _id = createGuid();
          _shadowRoot.querySelector("#oView").id = _id + "_oView";
          
          this.addEventListener("click", event => {
              console.log('click');
          });
      }

      connectedCallback() {
        loadthis(this);
      }

      disconnectedCallback() {
          
      }

      onCustomWidgetBeforeUpdate(changedProperties) {
          if ("designMode" in changedProperties) {
              this._designMode = changedProperties["designMode"];
          }
      }

      onCustomWidgetAfterUpdate(changedProperties) {
          loadthis(this);
      }

      _firePropertiesChanged() {
          this.password = "";
          this.dispatchEvent(new CustomEvent("propertiesChanged", {
              detail: {
                  properties: {
                      password: this.password
                  }
              }
          }));
      }
      
      attributeChangedCallback(name, oldValue, newValue) {
          if (oldValue != newValue) {
              this[name] = newValue;
          }
      }

  }
  customElements.define("com-ui5form-configcomp", ConfigComp);

  // UTILS
  function loadthis(that) {
    let content = document.createElement('div');
    content.slot = "content";
    content.innerHTML = "Testing contents";
    that.appendChild(content);

    sap.ui.getCore().attachInit(function() {
        "use strict";

        //### Controller ###
        sap.ui.define([
            "jquery.sap.global",
            "sap/ui/core/mvc/Controller"
        ], function(jQuery, Controller) {
            "use strict";

            return Controller.extend("myView.Template", {
                onButtonPress: function(oEvent) {
                    _password = oView.byId("passwordInput").getValue();
                    that._firePropertiesChanged();
                    console.log(_password);

                    this.settings = {};
                    this.settings.password = "";

                    that.dispatchEvent(new CustomEvent("onStart", {
                        detail: {
                            settings: this.settings
                        }
                    }));
                } 
            });
        });

        //### THE APP: place the XMLView somewhere into DOM ###
        var oView  = sap.ui.xmlview({
            viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
        });
        oView.placeAt(content);
    });

  }

  function createGuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
          let r = Math.random() * 16 | 0,
              v = c === "x" ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  }  
})();