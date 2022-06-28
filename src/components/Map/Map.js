/* eslint-disable react/prop-types */
import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";

import { useLanguageStore } from "stores/languageStore";
import env from "utils/env.js";
import Toggle from "components/Toggle";
import CircleSolid from "images/circle-solid.svg";
import CircleDotSolid from "images/circle-dot-solid.svg";

import { MapStyle } from "./MapStyle";
import * as Style from "./style";
import "./Map.less";

const Map = (props) => {
  const { displayStopData, showAllLiveContent } = props;
  const { t } = useTranslation();
  const [mapState, setMapState] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [allStops, setAllStops] = useState([]);
  const [currentStops, setCurrentStops] = useState([]);
  const [path, setPath] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center, setCenter] = useState({ lat: 22.076613, lng: 120.362239833 });
  const [zoom, setZoom] = useState(5);
  const [infoOpen, setInfoOpen] = useState(false);
  const [allInfoOpen, setAllInfoOpen] = useState(false);

  const { isZhTw } = useLanguageStore();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
  });

  const handleStopData = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    const tempAllStops = displayStopData.map((data) => {
      return {
        id: data.StopUID,
        stopName: isZhTw ? data.StopName.Zh_tw : data.StopName.En,
        pos: { lat: data.positionLat, lng: data.positionLon },
      };
    });
    setAllStops(tempAllStops);
    tempAllStops.map((stop) => {
      bounds.extend(stop.pos);
      return stop.stopName;
    });
    map.fitBounds(bounds);

    // path
    const tempPath = tempAllStops.map((data) => {
      return data.pos;
    });
    setPath(tempPath);

    // currentStops
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
          stopName: isZhTw ? data.StopName.Zh_tw : data.StopName.En,
          pos: { lat: data.positionLat, lng: data.positionLon },
        };
      });
    setCurrentStops(tempCurrentStops);
  };

  const loadMap = (map) => {
    // To store map for displayStopData change to trigger loadMap well
    setMapState(map);
    // Store a reference to the google map instance in state
    setMapRef(map);
    handleStopData(map);
  };

  // to create a mapping of our places to actual Marker objects
  const loadMarker = (marker, stop) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [stop.id]: marker };
    });
  };

  const clickMarker = (event, stop) => {
    setSelectedPlace(stop);

    // Required so clicking a 2nd marker works as expected
    setInfoOpen(!infoOpen);

    // to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // to center the selected Marker
    //setCenter(place.pos)
  };

  const clickMask = () => {
    setInfoOpen(false);
  };

  useEffect(() => {
    if (isLoaded) {
      loadMap(mapState);
    }
  }, [displayStopData]);

  return isLoaded ? (
    <Style.Container showAllLiveContent={showAllLiveContent}>
      <GoogleMap
        // Do stuff on map initial laod
        onLoad={loadMap}
        center={center}
        zoom={zoom}
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        options={{ styles: MapStyle }}
      >
        {(infoOpen || allInfoOpen) && (
          <Style.Mask className="mask" onClick={() => clickMask(false)} />
        )}
        {allStops
          .filter((stop) => !currentStops.map((d) => d.id).includes(stop.id))
          .map((stop) => (
            <Marker
              key={stop.id}
              position={stop.pos}
              onLoad={(marker) => loadMarker(marker, stop)}
              onClick={(event) => clickMarker(event, stop)}
              zIndex={3}
              icon={{
                url: CircleDotSolid,
              }}
            />
          ))}
        {currentStops.map((stop) => (
          <Marker
            key={stop.id}
            position={stop.pos}
            onLoad={(marker) => loadMarker(marker, stop)}
            onClick={(event) => clickMarker(event, stop)}
            zIndex={4}
            icon={{
              url: CircleSolid,
            }}
          />
        ))}

        <Polyline
          path={path}
          options={{
            strokeColor: "rgb(5,23,69)",
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: "rgb(5,23,69)",
            fillOpacity: 0.5,
            radius: 30000,
            paths: path,
            zIndex: 1,
          }}
        />

        {infoOpen && selectedPlace && !allInfoOpen && (
          <InfoWindow anchor={markerMap[selectedPlace.id]}>
            <Style.WindowBusName>{selectedPlace.stopName}</Style.WindowBusName>
          </InfoWindow>
        )}
        {allInfoOpen &&
          allStops.map((stop) => (
            <InfoWindow anchor={markerMap[stop.id]} key={stop.id}>
              <Style.WindowBusName>{stop.stopName}</Style.WindowBusName>
            </InfoWindow>
          ))}
      </GoogleMap>
      <Style.ToggleContainer>
        <span> {t("COMMON.SHOW_STOP_NAME")}</span>
        <Toggle
          onChange={() => setAllInfoOpen(!allInfoOpen)}
          checked={allInfoOpen}
        />
      </Style.ToggleContainer>
    </Style.Container>
  ) : (
    <div
      style={{
        height: "57%",
        width: "100%",
        backgroundColor: "#e9e9e9",
      }}
    />
  );
};

export default memo(Map);

Map.propTypes = {
  displayStopData: PropTypes.array,
  showAllLiveContent: PropTypes.bool,
};

Map.defaultProps = {
  displayStopData: [],
  showAllLiveContent: false,
};
