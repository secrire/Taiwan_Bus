/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect, memo } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";

import env from "utils/env.js";
import Toggle from "components/Toggle";
import CircleRegular from "images/circle-regular.svg";
import CircleSolid from "images/circle-solid.svg";
// import CircleSolid from "images/bus-grey .svg"

import * as Style from "./style";
import "./Map.less";
import styled from "styled-components";

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

const mapStyle = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#e9e9e9",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#dedede",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ffffff",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#333333",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#f2f2f2",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
];

const Map = (props) => {
  const { displayStopData, showAllLiveContent } = props;
  const [mapState, setMapState] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [allStops, setAllStops] = useState([]);
  const [currentStops, setCurrentStops] = useState([]);
  const [path, setPath] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center, setCenter] = useState({ lat: 22.076613, lng: 120.362239833 });
  const [zoom, setZoom] = useState(5);
  // const [clickedLatLng, setClickedLatLng] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
  });

  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  // Iterate allStops to size, center, and zoom map to contain all markers
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    const tempAllStops = displayStopData.map((data) => {
      return {
        id: data.StopUID,
        stopName: data.StopName.Zh_tw,
        pos: { lat: data.positionLat, lng: data.positionLon },
      };
    });
    setAllStops(tempAllStops);
    tempAllStops.map((stop) => {
      bounds.extend(stop.pos);
      return stop.stopName;
    });
    map.fitBounds(bounds);
    const tempPath = tempAllStops.map((data) => {
      return data.pos;
    });
    setPath(tempPath);
    let currentStopIDs = [];
    displayStopData.forEach((data) => {
      if (!currentStopIDs.includes(data.CurrentStop))
        currentStopIDs.push(data.CurrentStop);
    });

    const tempCurrentStops = displayStopData
      .filter((d) => currentStopIDs.includes(d.StopID))
      .map((data) => {
        return {
          id: data.StopUID,
          stopName: data.StopName.Zh_tw,
          pos: { lat: data.positionLat, lng: data.positionLon },
        };
      });
    // console.log("tempCurrentStops", tempCurrentStops);
    setCurrentStops(tempCurrentStops);
  };

  const loadHandler = (map) => {
    // To store map for displayStopData change to trigger loadHandler well
    setMapState(map);
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };

  // to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, stop) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [stop.id]: marker };
    });
  };

  const markerClickHandler = (event, stop) => {
    // Remember which place was clicked
    setSelectedPlace(stop);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // if you want to center the selected Marker
    //setCenter(place.pos)
  };

  const polylineLoadHandler = (p) => {
    // console.log("p----", p);
  };

  useEffect(() => {
    if (isLoaded) {
      loadHandler(mapState);
    }
  }, [displayStopData]);
  // console.log(allStops, currentStops);

  return isLoaded ? (
    // (
    //   <GoogleMap
    //     mapContainerStyle={containerStyle}
    //     center={center}
    //     zoom={10}
    //     // Do stuff on map initial load
    //     onLoad={onLoad}
    //     onUnmount={onUnmount}
    //   >
    //     {/* Child components, such as markers, info windows, etc. */}
    //     <></>
    //   </GoogleMap>
    // ) :
    <Style.Container showAllLiveContent={showAllLiveContent}>
      <GoogleMap
        // Do stuff on map initial laod
        onLoad={loadHandler}
        // Save the current center position in state
        // onCenterChanged={() => setCenter(mapRef.getCenter().toJSON())}
        // Save the user's map click position
        // onClick={(e) => setClickedLatLng(e.latLng.toJSON())}
        center={center}
        zoom={zoom}
        mapContainerStyle={{
          height: "100%",
          width: "100%",
          // marginTop: "18px",
        }}
        options={{ styles: mapStyle }}
      >
        {infoOpen && (
          <Style.Mask className="mask" onClick={() => setInfoOpen(false)} />
        )}
        {allStops
          .filter((stop) => !currentStops.map((d) => d.id).includes(stop.id))
          .map((stop) => (
            <Marker
              key={stop.id}
              position={stop.pos}
              onLoad={(marker) => markerLoadHandler(marker, stop)}
              onClick={(event) => markerClickHandler(event, stop)}
              className="testmarker"
              // visible={false}
              // Not required, but if you want a custom icon:
              icon={{
                // path: "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                // path: "http://maps.google.com/mapfiles/kml/paddle/blu-blank.png",
                url: CircleRegular,
                // fillColor: "yellow",
                // fillOpacity: 1.0,
                // strokeWeight: 0,
                // scale: 0.02,
                // scaledSize: new google.maps.Size(11, 11),
              }}
            />
          ))}
        {currentStops.map((stop) => (
          <Marker
            key={stop.id}
            position={stop.pos}
            onLoad={(marker) => markerLoadHandler(marker, stop)}
            onClick={(event) => markerClickHandler(event, stop)}
            zIndex={1000}
            icon={{
              url: CircleSolid,
            }}
          />
        ))}

        <Polyline
          onLoad={polylineLoadHandler}
          path={path}
          options={{
            strokeColor: "rgb(5,23,69)",
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: "rgb(5,23,69)",
            fillOpacity: 0.5,
            // clickable: false,
            // draggable: false,
            // editable: false,
            // visible: true,
            radius: 30000,
            paths: path,
            zIndex: 1,
          }}
        />

        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markerMap[selectedPlace.id]}
            // onCloseClick={() => setInfoOpen(false)}
            // zIndex={999}
          >
            {/* <div> */}
            <Style.WindowBusName>{selectedPlace.stopName}</Style.WindowBusName>
            {/* </div> */}
          </InfoWindow>
        )}
      </GoogleMap>
      <Style.ToggleContainer>
        <Toggle />
      </Style.ToggleContainer>
    </Style.Container>
  ) : (
    <div
      style={{
        height: "55%",
        width: "100%",
        backgroundColor: "#e9e9e9",
        // marginTop: "18px",
      }}
    />
  );
  // {/* Position of the user's map click */}
  // {clickedLatLng && (
  //   <h3>
  //     You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
  //   </h3>
  // )}

  // {/* Position of the user's map click */}
  // {selectedPlace && <h3>Selected Marker: {selectedPlace.id}</h3>}
  // <></>
};

export default memo(Map);

Map.propTypes = {};
