"use client";

import { useState } from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPoint } from "reicon-react";

interface MapProps {
  lat: number;
  lon: number;
  locationName: string;
}

export default function Map({ lat, lon, locationName }: MapProps) {
  // A dark themed raster tile map style for MapLibre
  const mapStyle = {
    version: 8 as const,
    sources: {
      "carto-light": {
        type: "raster" as const,
        tiles: [
          "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        ],
        tileSize: 256,
        attribution: '&copy; <a href="https://carto.com/">CartoDB</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
      }
    },
    layers: [
      {
        id: "carto-light-layer",
        type: "raster" as const,
        source: "carto-light",
        minzoom: 0,
        maxzoom: 22
      }
    ]
  };

  return (
    <div style={{ height: "100%", width: "100%", zIndex: 0 }}>
      <MapGL
        initialViewState={{
          longitude: lon,
          latitude: lat,
          zoom: 12
        }}
        mapStyle={mapStyle}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="bottom-right" />
        <Marker longitude={lon} latitude={lat} anchor="bottom">
          <div className="flex flex-col items-center group cursor-pointer">
             <div className="bg-blue-600 text-white font-mono text-[10px] px-2 py-1 rounded-sm mb-1 uppercase tracking-widest whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
               {locationName}
             </div>
             <MapPoint className="text-blue-500 drop-shadow-md" size={32} />
          </div>
        </Marker>
      </MapGL>
    </div>
  );
}
