import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Header from './header/Header/Header';
import Footer from './footer/Footer/Footer';
import LoadingIndicator from './LoadingIndicator';
import { fetchImage } from './pexelsApi'; 

import efficientRouteImage from './images/grocery_store.jpeg';
import houseIcon from './images/house_icon.png';
import icon from './images/icon.png';
import AuchanImage from './images/auchan.jpg';
import kauflandImage from './images/kaufland.jpg';
import DedemanImage from './images/dedeman.jpg';
import LidlImage from './images/lidl.jpg';
import PennyImage from './images/penny.jpg';
import MegaImage from './images/mega.jpg';
import ProfiImage from './images/profi.jpg';



const storeData = [
    {
        name: 'Auchan',
        imgSrc: AuchanImage,
        address: 'nr. 5C, Palas Mall, Strada Palas, Iași 700051',
    },
    {
        name: 'Kaufland',
        imgSrc: kauflandImage,
        address: 'Iasi-Alexandru cel Bun',
    },
    {
        name: 'Dedeman',
        imgSrc: DedemanImage,
        address: 'Bulevardul Primăverii nr. 2, Iași 700264',
    },
    {
        name: 'Lidl',
        imgSrc: LidlImage,
        address: 'Strada Pantelimon Halipa 3C, Iași 700612',
    },
    {
        name: 'Penny',
        imgSrc: PennyImage,
        address: 'Strada Pantelimon Halipa 12A, Iași 700614',
    },
    {
        name: 'Mega',
        imgSrc: MegaImage,
        address: 'Strada Cerna 1, Iași',
    },
    {
        name: 'Profi',
        imgSrc: ProfiImage,
        address: 'Bulevardul Nicolae Iorga nr. 236, Iași 700721',
    },
];

function App() {
    const [selectedList, setSelectedList] = useState('');
    const [map, setMap] = useState(null);
    const [routeLayerId] = useState('route');
    const [routeSourceId] = useState('route-source');
    const APIKEY = 'NhpffQFVsuEKicglGSJltG2aJr95GNgD';
    const HOME = useMemo(() => [27.577771, 47.153566], []);
    const mapId = 'mymap';
    const [markers, setMarkers] = useState([]);
    const [details, setDetails] = useState({
        title: '',
        images: [],
        texts: [],
        altTableContent: [],
        prices: ''
    });
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);

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

            new window.tt.Marker({ element: iconElement }).setLngLat(HOME).addTo(mapInstance);
        }
    }, [APIKEY, HOME, mapId]);

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
    }, [map, handleZoomIn, handleZoomOut]);
    
    
    const fetchData = async () => {
        if (selectedList === '') {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: selectedList })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData);
            if (responseData.message) {
                const storeNames = Object.keys(responseData.message).filter(name => name !== 'TOTAL');
                const coordinates = storeNames.map(storeName => responseData.message[storeName].coordinates);

                const waypoints = coordinates.map(coordinate => ({ lnglat: coordinate }));
                waypoints.unshift({ lnglat: HOME });
                waypoints.push({ lnglat: HOME });

                const filteredStoreData = await Promise.all(storeNames.map(async (storeName) => {
                    const store = storeData.find(store => store.name === storeName);
                    if (store) {
                        const products = responseData.message[storeName].products;
                        const totalPrice = responseData.message[storeName].totalPrice;
                        const productDetails = await Promise.all(products.map(async (product) => {
                            const imageUrl = await fetchImage(product.name);
                            return {
                                ...product,
                                imageUrl
                            };
                        }));
                        return {
                            ...store,
                            price: `${totalPrice} RON`,
                            details: {
                                ...store.details,
                                images: productDetails.map(product => product.imageUrl),
                                texts: productDetails.map(product => product.name),
                                altTableContent: productDetails.map(product => `${product.price} RON`)
                            }
                        };
                    }
                    return null;
                }));

                filteredStoreData.sort((a, b) => storeNames.indexOf(a.name) - storeNames.indexOf(b.name));
                setStores(filteredStoreData.filter(store => store !== null));
                createRoute(waypoints);
            } else {
                console.error('Message data is null or undefined');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        } finally {
            setLoading(false);
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
        }).finally(() => {
            setLoading(false);
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
        setLoading(true); // Set loading to true
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
                {loading && <LoadingIndicator />} {/* Show loading indicator */}
            </div>
            <div className='titlu'>
                <h2> Store route order:  </h2>
            </div>
            {stores.length > 0 && (
            <div className="store-container">
                {stores.map(store => (
                    <div className="store-card" key={store.name}>
                        <div className='store-card-img'> 
                            <img src={store.imgSrc} alt={`${store.name} Store`} /> 
                        </div>
                        <div className="store-card-info">
                            <h2>{store.name}</h2>
                            <div className='locatie'><img src={icon} alt="Location Icon" /></div>
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
                                {imageSrc ? <img src={imageSrc} alt={details.texts[index]} /> : <p>No image available</p>}
                                <p><strong><u>{details.texts[index]}</u></strong></p>
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