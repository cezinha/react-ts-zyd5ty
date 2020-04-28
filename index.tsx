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
    // https://api.mapbox.com/styles/v1/cuemura/ck9jxrm010znh1iqaj49l5z5e/wmts?access_token=pk.eyJ1IjoiY3VlbXVyYSIsImEiOiJjazhqdm5yMDAwNmRmM2VzMGVobnBycjBhIn0.GWKHmJhVRikIzoo7kSvIzg
    let osmSource =  new ol.source.OSM({
      attributions: [
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      ],
      opaque: false,
      url: 'https://api.mapbox.com/styles/v1/cuemura/ck9jxrm010znh1iqaj49l5z5e/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3VlbXVyYSIsImEiOiJjazhqdm5yMDAwNmRmM2VzMGVobnBycjBhIn0.GWKHmJhVRikIzoo7kSvIzg'
    });

    let tileSource = new ol.source.Stamen({
      layer: 'terrain-labels'
    });

    var vectorSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'rodents.json',
      /*loader: function(extent, resolution, projection) {
        var proj = projection.getCode();
        var url = 'http://bl.ocks.org/awoodruff/raw/0883d211538ed05a82fd1b82bd65bf34/f200e3b9a8db7626a1cc35433ff3b2e1185cd1d9/rodents.geojson';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        var onError = function() {
          vectorSource.removeLoadedExtent(extent);
        }
        xhr.onerror = onError;
        xhr.onload = function() {
          if (xhr.status == 200) {
            vectorSource.addFeatures(
                vectorSource.getFormat().readFeatures(xhr.responseText));
          } else {
            onError();
          }
        }
        xhr.send();
      }*/
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
          <Map view={{center:[0,0], zoom:1}}>
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
