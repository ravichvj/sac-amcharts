/*(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Force directed Tree Properties</legend>
				<table>
					<tr>
						<td>Color</td>
						<td><input id="styling_color" type="text" size="40" maxlength="40"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
	`;

	class ForcedirtreeStylingPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}
		
		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							color: this.color
						}
					}
			}));
		}
		
		set color(newColor) {
			this._shadowRoot.getElementById("styling_color").value = newColor;
		}

		get color() {
			return this._shadowRoot.getElementById("styling_color").value;
		}
	}

customElements.define("com-amcharts-forcedirtree-styling", ForcedirtreeStylingPanel);
}) ();

,
		{
			"kind": "styling",
			"tag": "com-ui5form-configcomp-styling",
			"url": "https://ravichvj.github.io/sac-amcharts/ConfigComp/ConfigComp_styler.js",
			"integrity": "",
			"ignoreIntegrity": true
		},
		{
			"kind": "builder",
			"tag": "com-ui5form-configcomp-builder",
			"url": "https://ravichvj.github.io/sac-amcharts/ConfigComp/ConfigComp_builder.js",
			"integrity": "",
			"ignoreIntegrity": true
		}


*/
