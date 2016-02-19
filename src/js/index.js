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
    lat: 31.5258541,
    lng: -0.08040660000006028
};

const regex = new RegExp('^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$')

var result;

const App = React.createClass({

    getInitialState(){
        return {domain: undefined, myLocation: undefined, domainDisabled: 'disabled'}
    },

    domainChanged(){
        var domainname = this.refs.domain.value
        var domainDisabled = 'disabled'
        if (result = regex.exec(domainname)) {
            console.log(result)
            domainDisabled = ''

        }
        this.setState({domainDisabled: domainDisabled})
    },
    locate: function () {

        var _this = this

        var domainname = this.refs.domain.value
        if (result = regex.exec(domainname)) {
            $.ajax({
                type: 'GET',
                url: 'http://ip-api.com/json/' + domainname,
                success: function (response) {
                    response.domainname = domainname
                    _this.setState({domain: response})
                }
            })
        }
    },

    locateMe(){
        var _this = this
        $.ajax({
            type: 'GET',
            url: 'http://ip-api.com/json/',
            success: function (response) {
                _this.setState({myLocation: response})
            }
        });
    },

    reset(){
        this.setState({myLocation: undefined})
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

        var example = {
            "as": "AS7922 Comcast Cable Communications, Inc.",
            "city": "Oakland",
            "country": "United States",
            "countryCode": "US",
            "isp": "Comcast Cable",
            "lat": 37.8309,
            "lon": -122.2196,
            "org": "Comcast Cable",
            "query": "98.210.29.69",
            "region": "CA",
            "regionName": "California",
            "status": "success",
            "timezone": "America/Los_Angeles",
            "zip": "94611"
        }
        var markers = []
        if (this.state.domain) {

            var content =
                '<div><b>' + this.state.domain.domainname +'</b></div>'+
                '<table align="center" class="empty">'+
                '<tbody>'+
                '<tr>'+
                '<td class="field_name">IP</td>'+
                '<td id="location_query" class="location_value">' + this.state.domain.query+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">Country</td>'+
                '<td id="location_country" class="location_value">' + this.state.domain.country+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">Region</td>'+
                '<td id="location_regionName" class="location_value">'+this.state.domain.regionName+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">City</td>'+
                '<td id="location_city" class="location_value">'+this.state.domain.city+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">Time Zone</td>'+
                '<td id="location_timezone" class="location_value">'+this.state.domain.timezone+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">Latitude</td>'+
                '<td id="location_lat" class="location_value">'+this.state.domain.lat+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">Longitude</td>'+
                '<td id="location_lon" class="location_value">'+this.state.domain.lon+'</td>'+
                '</tr>'+
                '</tbody>'+
                '</table>'

            markers.push(<InfoWindow title='domain' content={content}
                                     lat={this.state.domain.lat}
                                     lng={this.state.domain.lon}
            />)
        }

        if (this.state.myLocation) {

            var content =
                '<div><b>My location</b></div>'+
                '<table align="center" class="empty">'+
                '<tbody>'+
                '<tr>'+
                '<td class="field_name">IP</td>'+
                '<td id="location_query" class="location_value">' + this.state.myLocation.query+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">Country</td>'+
                '<td id="location_country" class="location_value">' + this.state.myLocation.country+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">Region</td>'+
                '<td id="location_regionName" class="location_value">'+this.state.myLocation.regionName+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">City</td>'+
                '<td id="location_city" class="location_value">'+this.state.myLocation.city+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">Time Zone</td>'+
                '<td id="location_timezone" class="location_value">'+this.state.myLocation.timezone+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">Latitude</td>'+
                '<td id="location_lat" class="location_value">'+this.state.myLocation.lat+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td class="field_name">Longitude</td>'+
                '<td id="location_lon" class="location_value">'+this.state.myLocation.lon+'</td>'+
                '</tr>'+
                '</tbody>'+
                '</table>'


            markers.push(<InfoWindow title='Home' label='Home' content={content}
                                     lat={this.state.myLocation.lat}
                                     lng={this.state.myLocation.lon}
            />)
        }

        return (
            <div>
                <Gmaps className="map"
                       lat={coords.lat}
                       lng={coords.lng}
                       zoom={2}
                       params={{v: '3.exp'}}
                       onMapCreated={this.onMapCreated}>

                    {markers}

                </Gmaps>


            <span className="controls">
                <input onChange={this.domainChanged} ref="domain" autofocus="autofocus" className="search bu"
                       type="text" placeholder="website"/>
                    <button onClick={this.locate} className={"btn bg-primary btn-responsive bu " + this.state.domainDisabled}>Locate
                    </button>

                    <button onClick={this.locateMe} className="btn btn-responsive bg-info bu">My location</button>
                    <button onClick={this.reset} className="btn btn-primary btn-responsive ">Reset</button>
            </span>
                <button class="btn btn-primary btn-lg btn-responsive">Large Button</button>
            </div>


        );
    }

});

ReactDOM.render(<App />, document.getElementById('app'));