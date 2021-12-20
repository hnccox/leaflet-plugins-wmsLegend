L.Control.WMSLegend = L.Control.extend({
	options: {
		// topright, topleft, bottomleft, bottomright
		position: 'bottomleft',
		url: '',
		maxWidth: '100',
		maxHeight: '20'
	},
	initialize: function (options) {
		// constructor
		L.Util.setOptions(this, options);
	},
	onAdd: function (map) {
		map.wmsLegend = this;
		// happens after added to map
		// We want a big + which expands a form upon click
		// layer name + JSON
		this.container = L.DomUtil.create('div', 'leaflet-control-legends leaflet-control');
		this.container.setAttribute('aria-haspopup', 'true');
		this.container.style.maxWidth = `calc(${this.options.maxWidth}vw - 20px)`;
		this.container.style.maxHeight = `${this.options.maxHeight}vh`;
		this.link = L.DomUtil.create('a', 'leaflet-control-legends-toggle', this.container)
		this.link.href = '#';
		this.link.title = 'Legends';
		this.section = L.DomUtil.create('section', 'leaflet-control-legends-list', this.container);
		L.DomEvent.addListener(this.link, 'click', this.legend, this);
		L.DomEvent.disableClickPropagation(this.container);
		L.DomEvent.disableScrollPropagation(this.container);
		return this.container;
	},
	onRemove: function (map) {
		delete map.wmsLegend;
	},
	addLegend: function (layer) {
		// console.log(layer)
		// console.log(`${layer}`)
		let url = `${layer.layerParams.url}?`;
		for (const [key, paramvalue] of Object.entries(layer.legendOptions)) {
			url = url + `${key}=${paramvalue}&`
		}
		url = url.substring(0, url.length - 1);
		let section = this.container.querySelector('section');
		let label = L.DomUtil.create('label', null, section);
		label.setAttribute('data-layer', layer)
		let div = L.DomUtil.create('div', null, label);
		let legend = L.DomUtil.create('img', null, div);
		legend.src = url;
		legend.alt = 'Legend';
	},
	removeLegend: function (layer) {
		
	},
	keyup: function () { },
	legend: function (e) {
		L.DomEvent.preventDefault(e)
		this.container.classList.toggle('leaflet-control-legends-expanded')
	},
});

L.control.wmsLegend = function (id, options) {
	return new L.Control.WMSLegend(id, options);
}
