import React, { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../../reactjs/src/Components/NavBar/NavBar';

import efficientRouteImage from '../../reactjs/src/images/grocery_store.jpeg';
import houseIcon from '../../reactjs/src/images/house_icon.png';
import icon from '../../reactjs/src/images/icon.png';
import AuchanImage from '../../reactjs/src/images/auchan.jpg';
import EggsImage from '../../reactjs/src/images/eggs.jpg';
import milkImage from '../../reactjs/src/images/milk.jpg';
import tomatoesImage from '../../reactjs/src/images/tomatoes.jpg';
import syrupImage from '../../reactjs/src/images/syrup.jpg';
import kauflandImage from '../../reactjs/src/images/kaufland.jpg';
import butterImage from '../../reactjs/src/images/butter.jpg';
import onionImage from '../../reactjs/src/images/onion.jpg';
import fishImage from '../../reactjs/src/images/fish.jpg';
import beefImage from '../../reactjs/src/images/beef.jpg';
import DedemanImage from '../../reactjs/src/images/dedeman.jpg';
import broomImage from '../../reactjs/src/images/broom.jpg';
import gloveImage from '../../reactjs/src/images/glove.jpg';
import glueImage from '../../reactjs/src/images/glue.jpg';
import LidlImage from '../../reactjs/src/images/lidl.jpg';
import cheeseImage from '../../reactjs/src/images/cheese.jpg';
import potatoImage from '../../reactjs/src/images/potato.jpg';
import carrotImage from '../../reactjs/src/images/carrot.jpg';
import yogurtImage from '../../reactjs/src/images/yogurt.jpg';
import PennyImage from '../../reactjs/src/images/penny.jpg';
import celeryImage from '../../reactjs/src/images/celery.jpg';
import cucumberImage from '../../reactjs/src/images/cucumber.jpg';
import breadImage from '../../reactjs/src/images/bread.jpg';
import lemonImage from '../../reactjs/src/images/lemon.jpg';
import MegaImage from '../../reactjs/src/images/mega.jpg';
import cherryImage from '../../reactjs/src/images/cherry.jpg';
import pastaImage from '../../reactjs/src/images/pasta.jpg';
import chickenImage from '../../reactjs/src/images/chicken.jpg';
import garlicImage from '../../reactjs/src/images/garlic.jpg';
import ProfiImage from '../../reactjs/src/images/profi.jpg';
import spinachImage from '../../reactjs/src/images/spinach.jpg';
import pumpkinImage from '../../reactjs/src/images/pumpkin.jpg';
import peaImage from '../../reactjs/src/images/pea.jpg';
import broccoliImage from '../../reactjs/src/images/broccoli.jpg';
import riceImage from '../../reactjs/src/images/rice.jpg';
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

    //zoom in zoom out
    useEffect(() => {
        if (map) {
            /*event listener pt zoom in */
            document.getElementById('zoomInBtn').addEventListener('click', handleZoomIn);
            /*event listener pt zoom out */
            document.getElementById('zoomOutBtn').addEventListener('click', handleZoomOut);
        }
    }, [map]);

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

    const handleZoomIn = () => {
        if (map) {
            const currentZoom = map.getZoom();
            map.setZoom(currentZoom + 1);
        }
    };

    const handleZoomOut = () => {
        if (map) {
            const currentZoom = map.getZoom();
            map.setZoom(currentZoom - 1);
        }
    };

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
    const fetchData = () => {
        fetch('http://localhost:8080/api/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ /* Data to be sent */ })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Handle the response data here
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    };

    // Call fetchData function when component mounts or whenever necessary
    useEffect(() => {
        fetchData();
    }, []);

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
            <div className="mymap" id={mapId}>
                <div className="map-controls">
                <button id="zoomInBtn"><FontAwesomeIcon icon={faPlus} /></button>
                <button id="zoomOutBtn"><FontAwesomeIcon icon={faMinus} /></button>
            </div>
            </div>
            <div className='titlu'>
                <h2> Store route order:  </h2>
            </div>
            <div className="store-container">
                <div className="store-card">
                <div className='store-card-img'> <img src={AuchanImage} alt="Auchan Store" /> </div>
                    <div className="store-card-info">
                        <h2>Auchan</h2>
                        <div className='locatie'><img src={icon}/></div>
                        <p className='p1'>nr. 5C, Palas Mall, Strada Palas, Iași 700051</p>
                        <hr></hr>
                        <p className='price'>Price: <b>79.99 RON</b></p>
                    </div>
                    <div className="details-button-container">
                        <button className="details-button" onClick={() => showDetails(
                            'Auchan',
                            [EggsImage, milkImage, tomatoesImage, syrupImage],
                            ['Eggs x2', 'Milk 2L', 'Tomatoes 1kg', 'Forest fruit syrup 1L'],
                            [<b>4.20 RON</b>, <b>10.99 RON</b>, <b>34.70 RON</b>, <b>30.10 RON</b>],
                            '79.99 RON'
                        )}>
                            Details
                        </button>
                    </div>
                </div>
               <div className="store-card">
               <div className='store-card-img'><img src={kauflandImage} alt="Kaufland Store" /></div>
                    <div className="store-card-info">
                        <h2>Kaufland</h2>
                        <div className='locatie'><img src={icon}/></div>
                        <p className='p1'>Iasi-Alexandru cel Bun</p>
                        <hr></hr>
                        <p className='price'>Price: <b>122.91 RON</b></p>
                    </div>
                    <div className="details-button-container">
                        <button className="details-button" onClick={() => showDetails('Kaufland', 
                        [butterImage, onionImage, fishImage, beefImage, riceImage], 
                        ['Butter x2', 'Onion x3', 'Fish 1kg', 'Beef 1kg', 'Rice 2kg'],
                        [<b>8.99 RON</b>, <b>10.45 RON</b>,<b>33.49 RON</b>,<b>49.99 RON</b>,<b>19.99 RON</b> ],
                        '122.91 RON')}>
                            Details
                        </button>
                    </div>
                </div>
                <div className="store-card">
                 <div className='store-card-img'> <img src={DedemanImage} alt="Dedeman Store" /> </div>
                    <div className="store-card-info">
                        <h2>Dedeman</h2>
                        <div className='locatie'><img src={icon}/></div>
                        <p className='p1'>Bulevardul Primăverii nr. 2, Iași 700264</p>
                        <hr></hr>
                        <p className='price'>Price: <b>29.47 RON</b></p>
                    </div>
                    <div className="details-button-container">
                        <button className="details-button" onClick={() => showDetails('Dedeman', 
                        [broomImage, gloveImage, glueImage], 
                        ['Broom x1', 'Glove x1', 'Glue X1'],
                        [<b>14.99 RON</b>,<b>9.49 RON</b>,<b>4.99 RON</b> ],
                        '29.47 RON')}>
                            Details
                        </button>
                    </div>
                </div>
                 <div className="store-card">
                 <div className='store-card-img'> <img src={LidlImage} alt="Lidl Store" /> </div>
                    <div className="store-card-info">
                        <h2>Lidl</h2>
                        <div className='locatie'><img src={icon}/></div>
                        <p className='p1'>Strada Pantelimon Halipa 3C, Iași 700612</p>
                        <hr></hr>
                        <p className='price'>Price: <b>153.92 RON</b></p>
                    </div>
                    <div className="details-button-container">
                        <button className="details-button" onClick={() => showDetails('Lidl', 
                        [cheeseImage, potatoImage, carrotImage, yogurtImage], 
                        ['Cheese 1kg', 'Potato 2kg', 'Carrot 2kg', 'Yogurt 1kg'],
                        [<b>29.99 RON</b>, <b>59.99 RON</b>, <b>39.49 RON</b>,<b>24.45 RON</b>],
                        '153.92 RON')}>
                            Details
                        </button>
                    </div>
                </div>
                <div className="store-card">
                <div className='store-card-img'> <img src={PennyImage} alt="Penny Store" /> </div>
                    <div className="store-card-info">
                        <h2>Penny</h2>
                        <div className='locatie'><img src={icon}/></div>
                        <p className='p1'> Strada Pantelimon Halipa 12A, Iași 700614</p>
                        <hr></hr>
                        <p className='price'>Price: <b>63.26 RON</b></p>
                    </div>
                    <div className="details-button-container">
                        <button className="details-button" onClick={() => showDetails('Penny', 
                        [celeryImage, cucumberImage, breadImage, lemonImage], 
                        ['Celery 1kg', 'Cucumber x3', 'Bread x1', 'Lemon 1kg'],
                        [<b>23.99 RON</b>, <b>14.49 RON</b>, <b>7.49 RON</b>,<b>17.29 RON</b> ],
                        '63.26 RON')}>
                            Details
                        </button>
                    </div>
                </div>
                <div className="store-card">
                <div className='store-card-img'> <img src={MegaImage} alt="Mega Store" /> </div>
                    <div className="store-card-info">
                        <h2>Mega</h2>
                        <div className='locatie'><img src={icon}/></div>
                        <p className='p1'>Strada Cerna 1, Iași</p>
                        <hr></hr>
                        <p className='price'>Price:<b> 254.78 RON</b></p>
                    </div>
                    <div className="details-button-container">
                        <button className="details-button" onClick={() => showDetails('Mega', 
                        [cherryImage, pastaImage, chickenImage, garlicImage], 
                        ['Cherry 2kg', 'Pasta 1kg', 'Chicken 3kg', 'Garlic x5'],
                        [<b>79.99 RON</b>, <b>22.31 RON</b>, <b>119.99 RON</b>,<b>32.49 RON</b> ],
                        '254.78 RON')}>
                            Details
                        </button>
                    </div>
                </div>
                <div className="store-card">
                <div className='store-card-img'> <img src={ProfiImage} alt="Profi Store" /> </div>
                    <div className="store-card-info">
                        <h2>Profi</h2>
                        <div className='locatie'><img src={icon}/></div>
                        <p className='p1'>Bulevardul Nicolae Iorga nr. 236, Iași 700721</p>
                        <hr></hr>
                        <p className='price'>Price: <b>178.46 RON</b></p>
                    </div>
                    <div className="details-button-container">
                        <button className="details-button" onClick={() => showDetails('Profi', 
                        [spinachImage, pumpkinImage, peaImage, broccoliImage], 
                        ['Spinach 1kg', 'Pumpkin x2', 'Pea 1kg', 'Broccoli 1kg'],
                        [<b>49.99 RON</b>, <b>65.49 RON</b>, <b>35.99 RON</b>,<b>26.99 RON</b> ],
                        '178.46 RON')}>
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
