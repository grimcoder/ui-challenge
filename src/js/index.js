/**
 * Created by taraskovtun on 2/18/16.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Gmaps = require('react-gmaps').Gmaps
var Marker = require('react-gmaps').Marker
var InfoWindow = require('react-gmaps').InfoWindow
var Circle = require('react-gmaps').Circle
var $ = require('jquery')


const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
};

const App = React.createClass({

    locate(){
        $.ajax({
            type : 'GET',
            url : 'http://ip-api.com/json/',
            success : function(response){
                console.log(response)
            }
        });
    },

    locateMe(){

    },

    reset(){

    },

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  },

  onDragEnd(e) {
    console.log('onDragEnd', e);
  },

  onCloseClick() {
    console.log('onCloseClick');
  },

  onClick(e) {
    console.log('onClick', e);
  },

  render() {
    return (
        <div>
        <Gmaps
            width={'800px'}
            height={'600px'}
            lat={coords.lat}
            lng={coords.lng}
            zoom={12}
            loadingMessage={'Be happy'}
            params={{v: '3.exp'}}
            onMapCreated={this.onMapCreated}>

          <Marker title="My address" label="asasa" content="sdfsdfsdfsdsdf"
                  lat={coords.lat}
                  lng={coords.lng}
                  draggable={false}
                  onDragEnd={this.onDragEnd} />



        </Gmaps>
            <span className="controls" >
                <input autofocus="autofocus" className="search bu" type="text" placeholder="website" />
                    <button onClick={this.locate} className="btn bg-primary bu">Locate</button>
                    <button onClick={this.locateMe}  className="btn bg-info bu">My location</button>
                    <button onClick={this.reset}  className="btn bg-info bu">Reset</button>
            </span>
      </div>
    );
  }

});

ReactDOM.render(<App />, document.getElementById('app'));