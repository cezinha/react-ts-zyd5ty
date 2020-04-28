import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { Container, Row, Form } from 'react-bootstrap';
import ZipcodeInput from './zipcode_input';
import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";
import * as ol from 'openlayers';

interface AppProps { }
interface AppState { }
class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
  }

  render() {
    let osmSource =  new ol.source.OSM({
      attributions: [
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      ],
      url: 'https://api.mapbox.com/styles/v1/cuemura/ck9jxrm010znh1iqaj49l5z5e/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3VlbXVyYSIsImEiOiJjazhqdm5yMDAwNmRmM2VzMGVobnBycjBhIn0.GWKHmJhVRikIzoo7kSvIzg'
    });

    let tileSource = new ol.source.Stamen({
      layer: 'terrain-labels'
    });

    let objGeo = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: 1,
          properties: {
            lat: -23.57556350,
            lng: -46.60644710,
            count: 1
          },
          geometry: {
            type: "Point",
            coordinates: [-23.57556350, -46.60644710]
          }
        },
        {
          type: "Feature",
          id: 2,
          properties: {
            lat: -23.57566350,
            lng: -46.60648710,
            count: 3
          },
          geometry: {
            type: "Point",
            coordinates: [-23.57556350, -46.60644710]
          }
        },
        {
          type: "Feature",
          id: 3,
          properties: {
            lat: -23.57556350,
            lng: -46.60644710,
            count: 5
          },
          geometry: {
            type: "Point",
            coordinates: [-23.57556350, -46.60644710]
          }
        }
      ]
    };

    var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(objGeo)
    });

    let heatmapSource = new ol.source.Vector({
      url: 'https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml',
      format: new ol.format.KML({
        extractStyles: false,
        blur: 5,
        radius: 15,
        weight: function(feature) {
          // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
          // standards-violating <magnitude> tag in each Placemark.  We extract it from
          // the Placemark's name instead.
          var name = feature.get('name');
          var magnitude = parseFloat(name.substr(2));
          return magnitude - 5;
        }
      })
    });

    return (
      <div>
        <Container>
          <Row>
            <ZipcodeInput />
          </Row>
        </Container>
        <Container>
          <Row>
            <Map>
              <Layers>
                <layer.Tile source={osmSource} />
                <layer.Heatmap source={vectorSource} blur={15} radius={5} />
              </Layers>
            </Map>
          </Row>
        </Container>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
