declare namespace tt {
  class Map {
      constructor(options: { key: string; container: string; center: [number, number]; zoom: number; style: string });
      getZoom(): number;
      setZoom(zoom: number): void;
      addLayer(layer: any): void;
      addSource(id: string, source: any): void;
      removeLayer(id: string): void;
      removeSource(id: string): void;
      getSource(id: string): any;
      getLayer(id: string): any;
  }

  class Marker {
      constructor(options: { element: HTMLElement });
      setLngLat(lngLat: [number, number]): this;
      addTo(map: tt.Map): this;
      remove(): void;
  }

  namespace services {
    function calculateRoute(options: any): any; // Adjust the type of options and return value as needed
}
}
