import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';

import efficientRouteImage from './images/grocery_store.jpeg';
import houseIcon from './images/house_icon.png';
import AuchanImage from './images/auchan.jpg';
import EggsImage from './images/eggs.jpg';
import milkImage from './images/milk.jpg';
import tomatoesImage from './images/tomatoes.jpg';
import syrupImage from './images/syrup.jpg';
import kauflandImage from './images/kaufland.jpg';
import butterImage from './images/butter.jpg';
import onionImage from './images/onion.jpg';
import fishImage from './images/fish.jpg';
import beefImage from './images/beef.jpg';
import riceImage from './images/rice.jpg';
import ReactDOM from 'react-dom';

function App() {
    var [selectedList, setSelectedList] = useState('');
    var [map, setMap] = useState(null);
    const [routeLayerId] = useState('route');
    const [routeSourceId] = useState('route-source');
    var APIKEY = 'NhpffQFVsuEKicglGSJltG2aJr95GNgD';
    var HOME = [27.577771, 47.153566];
    var mapId = 'mymap';
    var [markers, setMarkers] = useState([]);

    useEffect(() => {
        const waypointsDropdown = document.getElementById('waypointsDropdown');
        waypointsDropdown.addEventListener('change', handleDropdownChange);

        return () => {
            waypointsDropdown.removeEventListener('change', handleDropdownChange);
        };
    }, []);

    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/5.x/5.53.0/maps/maps-web.min.js';
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/5.x/5.53.0/services/services-web.min.js';
        script2.async = true;
        document.body.appendChild(script2);

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);

    useEffect(() => {
        if (window.tt && window.tt.map) {
            const mapInstance = window.tt.map({
                key: APIKEY,
                container: mapId,
                center: HOME,
                zoom: 15,
                style: 'tomtom://vector/1/basic-main',
            });
            setMap(mapInstance);
            const iconElement = document.createElement('div');
            const imgElement = document.createElement('img');
            imgElement.src = houseIcon;
            imgElement.style.width = '45px';
            imgElement.style.height = '45px';
            iconElement.appendChild(imgElement);
            
            const marker = new window.tt.Marker({ element: iconElement }).setLngLat(HOME).addTo(mapInstance);
        }
    }, []);

    const createRoute = () => {
        if (!map) {
            return;
        }
        for (const marker of markers) {
            marker.remove();
        }
        const selectedWaypoints = getSelectedWaypoints();
        const routeOptions = {
            key: APIKEY,
            locations: selectedWaypoints.map(waypoint => waypoint.lnglat),
            computeBestOrder: false,
            travelMode: 'car'
        };

        const newMarkers = [];
        selectedWaypoints.forEach(waypoint => {
            if(waypoint.lnglat != HOME) {
                const marker = new window.tt.Marker().setLngLat(waypoint.lnglat).addTo(map);
                newMarkers.push(marker);
            }
        });
        setMarkers(newMarkers);

        if (map.getLayer(routeLayerId)) {
            map.removeLayer(routeLayerId);
        }

        if (map.getSource(routeSourceId)) {
            map.removeSource(routeSourceId);
        }

        window.tt.services.calculateRoute(routeOptions).go().then(routeData => {
            const geoJSON = routeData.toGeoJson();
            displayRoute(geoJSON);
        });
    };
    

    const handleDropdownChange = (event) => {
        setSelectedList(event.target.value);
        for (const marker of markers) {
            marker.remove();
        }
        createRoute();
    };

    const getSelectedWaypoints = () => {
        const waypoints = {
            waypoints1: [
                { lnglat: HOME },
                { lnglat: [27.5755972, 47.160983] },
                { lnglat: [27.594869, 47.146127] },
                { lnglat: [27.5956988, 47.145339] },
                { lnglat: HOME },
            ],
            waypoints2: [
                { lnglat: HOME },
                { lnglat: [27.574795, 47.156094] },
                { lnglat: [27.5731454, 47.1520637] },
                { lnglat: [27.5889279, 47.1555179] },
                { lnglat: HOME },
            ],
            waypoints3: [
                { lnglat: HOME },
                { lnglat: [27.573490, 47.150759] },
                { lnglat: [27.5889279, 47.1555179] },
                { lnglat: [27.594869, 47.146127] },
                { lnglat: [27.595567, 47.144717] },
                { lnglat: HOME },
            ],
        };
        return waypoints[selectedList] || [];
    };

    const displayRoute = (geoJSON) => {
        if (!map) return;

        if (map.getLayer(routeLayerId)) {
            map.removeLayer(routeLayerId);
        }

        if (map.getSource(routeSourceId)) {
            map.removeSource(routeSourceId);
        }

        map.addSource(routeSourceId, {
            'type': 'geojson',
            'data': geoJSON
        });

        map.addLayer({
            'id': routeLayerId,
            'type': 'line',
            'source': routeSourceId,
            'paint': {
                'line-color': 'purple',
                'line-width': 3
            }
        });
    };

    const [details, setDetails] = useState({
        title: '',
        images: [],
        texts: [],
        altTableContent: [],
        prices: ''
    });

    const showDetails = (title, images, texts, altTableContent, prices) => {
        const modal = document.getElementById('detailsModal');
        modal.style.display = 'block';

        setDetails({
            title,
            images,
            texts,
            altTableContent,
            prices
        });
    };

    const hideDetails = () => {
        const modal = document.getElementById('detailsModal');
        modal.style.display = 'none';
    };

    return (
        <div className="container">
            <NavBar />
            <div className="title-container">
                <img src={efficientRouteImage} alt="Efficient Route" className="title-image" />
                <div className="title"><b>Efficient Route</b></div>
            </div>
            <div className="generate-container">
                <div className="generate-header">
                    <h2><b>Generate Route for</b></h2>
                    <h2><b>Your Shopping List</b></h2>
                </div>
                <div className="generate-content">
                    <p>Choose a shopping list to generate a route:</p>
                    <select value={selectedList} onChange={handleDropdownChange} id="waypointsDropdown">
                        <option value="" disabled>Select Shopping List</option>
                        <option value="waypoints1">Shopping List 1</option>
                        <option value="waypoints2">Shopping List 2</option>
                        <option value="waypoints3">Shopping List 3</option>
                    </select>
                </div>
            </div>
            <div className="mymap" id={mapId}></div>
            <div className="store-container">
                <div className="store-card">
                    <div className="store-card-info">
                        <img src={AuchanImage} alt="Auchan Store" />
                        <h2>Auchan</h2>
                        <p> nr. 5C, Palas Mall, Strada Palas, Iași 700051</p>
                        <p>Price: 79.99 RON</p>
                    </div>
                    <div className="details-button-container">
                        <button className="details-button" onClick={() => showDetails(
                            'Auchan',
                            [EggsImage, milkImage, tomatoesImage, syrupImage],
                            ['Eggs x2', 'Milk 2L', 'Tomatoes 1kg', 'Forest fruit syrup 1L'],
                            ['4.20 RON', '10.99 RON', '34.70 RON', '30.10 RON'],
                            '79.99 RON'
                        )}>
                            Details
                        </button>
                    </div>
                </div>
                <div className="store-card">
                    <div className="store-card-info">
                        <img src={kauflandImage} alt="Kaufland Store" />
                        <h2>Kaufland</h2>
                        <p>Iasi-Alexandru cel Bun</p>
                        <p>Price: 122.91 RON</p>
                    </div>
                    <div className="details-button-container">
                        <button className="details-button" onClick={() => showDetails('Kaufland', 
                        [butterImage, onionImage, fishImage, beefImage, riceImage], 
                        ['Butter x2', 'Onion x3', 'Fish 1kg', 'Beef 1kg', 'Rice 2kg'],
                        ['8.99 RON', '10.45 RON', '33.49 RON','49.99 RON','19.99 RON' ],
                        '122.91 RON')}>
                            Details
                        </button>
                    </div>
                </div>

                {/* Add more store cards here */}
            </div>
            <div id="detailsModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={hideDetails}>&times;</span>
                    <div id="imageGallery" className="image-gallery">
                        {details.images.map((imageSrc, index) => (
                            <div key={index}>
                                <img src={imageSrc} alt={details.title} />
                                <p>{details.texts[index]}</p>
                                <p>Price: {details.altTableContent[index]}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bottom-container">
                        <button className="back-button" onClick={hideDetails}>Back to Shopping List</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
