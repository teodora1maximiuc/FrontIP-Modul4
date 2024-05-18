import React, { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Header from './header/Header/Header';
import Footer from './footer/Footer/Footer';

import efficientRouteImage from './images/grocery_store.jpeg';
import houseIcon from './images/house_icon.png';
import icon from './images/icon.png';
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
import DedemanImage from './images/dedeman.jpg';
import broomImage from './images/broom.jpg';
import gloveImage from './images/glove.jpg';
import glueImage from './images/glue.jpg';
import LidlImage from './images/lidl.jpg';
import cheeseImage from './images/cheese.jpg';
import potatoImage from './images/potato.jpg';
import carrotImage from './images/carrot.jpg';
import yogurtImage from './images/yogurt.jpg';
import PennyImage from './images/penny.jpg';
import celeryImage from './images/celery.jpg';
import cucumberImage from './images/cucumber.jpg';
import breadImage from './images/bread.jpg';
import lemonImage from './images/lemon.jpg';
import MegaImage from './images/mega.jpg';
import cherryImage from './images/cherry.jpg';
import pastaImage from './images/pasta.jpg';
import chickenImage from './images/chicken.jpg';
import garlicImage from './images/garlic.jpg';
import ProfiImage from './images/profi.jpg';
import spinachImage from './images/spinach.jpg';
import pumpkinImage from './images/pumpkin.jpg';
import peaImage from './images/pea.jpg';
import broccoliImage from './images/broccoli.jpg';
import riceImage from './images/rice.jpg';

const storeData = [
    {
        name: 'Auchan',
        imgSrc: AuchanImage,
        address: 'nr. 5C, Palas Mall, Strada Palas, Iași 700051',
        price: '79.99 RON',
        details: {
            images: [EggsImage, milkImage, tomatoesImage, syrupImage],
            texts: ['Eggs x2', 'Milk 2L', 'Tomatoes 1kg', 'Forest fruit syrup 1L'],
            altTableContent: ['4.20 RON', '10.99 RON', '34.70 RON', '30.10 RON'],
            prices: '79.99 RON'
        }
    },
    {
        name: 'Kaufland',
        imgSrc: kauflandImage,
        address: 'Iasi-Alexandru cel Bun',
        price: '122.91 RON',
        details: {
            images: [butterImage, onionImage, fishImage, beefImage, riceImage],
            texts: ['Butter x2', 'Onion x3', 'Fish 1kg', 'Beef 1kg', 'Rice 2kg'],
            altTableContent: ['8.99 RON', '10.45 RON', '33.49 RON', '49.99 RON', '19.99 RON'],
            prices: '122.91 RON'
        }
    },
    {
        name: 'Dedeman',
        imgSrc: DedemanImage,
        address: 'Bulevardul Primăverii nr. 2, Iași 700264',
        price: '29.47 RON',
        details: {
            images: [broomImage, gloveImage, glueImage],
            texts: ['Broom x1', 'Glove x1', 'Glue X1'],
            altTableContent: ['14.99 RON', '9.49 RON', '4.99 RON'],
            prices: '29.47 RON'
        }
    },
    {
        name: 'Lidl',
        imgSrc: LidlImage,
        address: 'Strada Pantelimon Halipa 3C, Iași 700612',
        price: '153.92 RON',
        details: {
            images: [cheeseImage, potatoImage, carrotImage, yogurtImage],
            texts: ['Cheese 1kg', 'Potato 2kg', 'Carrot 2kg', 'Yogurt 1kg'],
            altTableContent: ['29.99 RON', '59.99 RON', '39.49 RON', '24.45 RON'],
            prices: '153.92 RON'
        }
    },
    {
        name: 'Penny',
        imgSrc: PennyImage,
        address: 'Strada Pantelimon Halipa 12A, Iași 700614',
        price: '63.26 RON',
        details: {
            images: [celeryImage, cucumberImage, breadImage, lemonImage],
            texts: ['Celery 1kg', 'Cucumber x3', 'Bread x1', 'Lemon 1kg'],
            altTableContent: ['23.99 RON', '14.49 RON', '7.49 RON', '17.29 RON'],
            prices: '63.26 RON'
        }
    },
    {
        name: 'Mega',
        imgSrc: MegaImage,
        address: 'Strada Cerna 1, Iași',
        price: '254.78 RON',
        details: {
            images: [cherryImage, pastaImage, chickenImage, garlicImage],
            texts: ['Cherry 2kg', 'Pasta 1kg', 'Chicken 3kg', 'Garlic x5'],
            altTableContent: ['79.99 RON', '22.31 RON', '119.99 RON', '32.49 RON'],
            prices: '254.78 RON'
        }
    },
    {
        name: 'Profi',
        imgSrc: ProfiImage,
        address: 'Bulevardul Nicolae Iorga nr. 236, Iași 700721',
        price: '178.46 RON',
        details: {
            images: [spinachImage, pumpkinImage, peaImage, broccoliImage],
            texts: ['Spinach 1kg', 'Pumpkin x2', 'Pea 1kg', 'Broccoli 1kg'],
            altTableContent: ['49.99 RON', '65.49 RON', '35.99 RON', '26.99 RON'],
            prices: '178.46 RON'
        }
    },

];

function App() {
    const [selectedList, setSelectedList] = useState('');
    const [map, setMap] = useState(null);
    const [routeLayerId] = useState('route');
    const [routeSourceId] = useState('route-source');
    const APIKEY = 'NhpffQFVsuEKicglGSJltG2aJr95GNgD';
    const HOME = [27.577771, 47.153566];
    const mapId = 'mymap';
    const [markers, setMarkers] = useState([]);
    const [details, setDetails] = useState({
        title: '',
        images: [],
        texts: [],
        altTableContent: [],
        prices: ''
    });
    const storeNames = []; 
    const [stores, setStores] = useState([]);
    useEffect(() => {
        setStores([]);
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
        if (map) {
            document.getElementById('zoomInBtn').addEventListener('click', handleZoomIn);
            document.getElementById('zoomOutBtn').addEventListener('click', handleZoomOut);

            return () => {
                document.getElementById('zoomInBtn').removeEventListener('click', handleZoomIn);
                document.getElementById('zoomOutBtn').removeEventListener('click', handleZoomOut);
            };
        }
    }, [map]);

    const fetchData = async () => {
        if (selectedList === '') {
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: selectedList})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData);
            if (responseData.message) {
                const coordinates = Object.values(responseData.message);

                const waypoints = coordinates.map(coordinate => ({ lnglat: coordinate }));
                waypoints.unshift({ lnglat: HOME });
                waypoints.push({ lnglat: HOME });

                let storeNames = Object.keys(responseData.message);
                const filteredStoreData = storeData.filter(store => storeNames.includes(store.name));
                setStores(filteredStoreData);
    
                createRoute(waypoints);
            } else {
                console.error('Message data is null or undefined');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedList]);

    const createRoute = (waypoints) => {
        if (!map) {
            return;
        }
        markers.forEach(marker => marker.remove());
    
        const routeOptions = {
            key: APIKEY,
            locations: waypoints.map(waypoint => waypoint.lnglat),
            computeBestOrder: false,
            travelMode: 'car'
        };
    
        const newMarkers = waypoints.map(waypoint => {
            if (waypoint.lnglat[0] !== HOME[0] && waypoint.lnglat[1] !== HOME[1]) {
                return new window.tt.Marker().setLngLat(waypoint.lnglat).addTo(map);
            }
            return null;
        }).filter(marker => marker !== null);
    
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

    const handleDropdownChange = (event) => {
        setSelectedList(event.target.value);
    };

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
            <div className="Header">
                <Header />
            </div>
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
                        <option value="shoppingList1">Shopping List 1</option>
                        <option value="shoppingList2">Shopping List 2</option>
                        <option value="shoppingList3">Shopping List 3</option>
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
            {stores.length > 0 && (
            <div className="store-container">
                {stores.map(store => (
                    <div className="store-card" key={store.name}>
                        <div className='store-card-img'> 
                            <img src={store.imgSrc} alt={'${store.name} Store'} /> 
                        </div>
                        <div className="store-card-info">
                            <h2>{store.name}</h2>
                            <div className='locatie'><img src={icon}/></div>
                            <p className='p1'>{store.address}</p>
                            <hr></hr>
                            <p className='price'>Price: <b>{store.price}</b></p>
                        </div>
                        <div className="details-button-container">
                            <button className="details-button" onClick={() => showDetails(
                                store.name,
                                store.details.images,
                                store.details.texts,
                                store.details.altTableContent,
                                store.details.prices
                            )}>
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            )}
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
            <div className="Footer">
                <Footer />
            </div>
        </div>
    );
}

export default App;