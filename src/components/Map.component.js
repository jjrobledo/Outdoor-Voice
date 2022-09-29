import { useState, useEffect } from "react";

import ReactMapGL from "react-map-gl";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line import/no-webpack-loader-syntax
//mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

import { useLogout } from "../hooks/useLogout.hook";
import { useAuthContext } from "../hooks/useAuthContext.hook";
import { usePostsContext } from "../hooks/usePostContext.hook";

import "../App.css";

import "mapbox-gl/dist/mapbox-gl.css";
import Register from "./Register.component";
import Login from "./Login.component";
import MapMarkers from "./MapMarkers.component";
import Navbar from "./Navbar.component";

export default function MapView() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { posts, dispatch } = usePostsContext();
  const SERVER_ADDRESS = "https://outdoor-voice.herokuapp.com";
  const { REACT_APP_MAPBOX } = process.env;
  const loggedInUser = (user && user.username) || "";
  const [newPost, setNewPost] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const [newDescription, setNewDescription] = useState(null);
  const [clickedId, setClickedId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewState, setViewState] = useState({
    latitude: 34,
    longitude: -102,
    zoom: 11,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(SERVER_ADDRESS + "/api/posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        // if the response is ok dispach the payload object and rerender
        // the payload from this fetch will be all posts
        dispatch({ type: "GET_POSTS", payload: json });
      }
    };
    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    logout();
  };

  const handleClicked = (id) => {
    setEditing(false);
    setClickedId(id);
  };

  const handleDblClick = (e) => {
    e.preventDefault();

    const { lng, lat } = e.lngLat;
    setNewPost({
      lat: lat,
      long: lng,
    });
  };

  const handleDelete = async (postId) => {
    const response = await fetch(SERVER_ADDRESS + "/api/posts/" + postId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  const handleSubmitNewPost = async (e) => {
    e.preventDefault();

    if (!user) {
      throw new Error("Client not logged in");
      return;
    }

    // send image to cloudinary
    // check if upload was successful
    // if upload fails send error message
    // get cloudinary url
    // add cloudinary url to post in database

    const post = {
      username: loggedInUser,
      title: newLocation,
      description: newDescription,
      lat: newPost.lat,
      long: newPost.long,
    };

    const response = await fetch(SERVER_ADDRESS + "/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      // dispatch the new podcast to the context provider and rerender
      dispatch({ type: "ADD_POST", payload: json });
      setNewPost(null);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!user) {
      throw new Error("Client not logged in");
      return;
    }

    const post = {
      title: newLocation,
      description: newDescription,
    };

    const response = await fetch(SERVER_ADDRESS + "/api/posts/" + editId, {
      method: "PATCH",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      setEditing(false);
    }
  };

  return (
    <>
      <Navbar props={{ handleLogout, user, setShowLogin, setShowRegister }} />
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactMapGL
          {...viewState}
          mapboxAccessToken={REACT_APP_MAPBOX}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/outdoors-v11"
          width="100%"
          height="100%"
          onDblClick={handleDblClick}
        >
          <MapMarkers
            props={{
              posts,
              newPost,
              loggedInUser,
              handleClicked,
              handleUpdatePost,
              handleDelete,
              clickedId,
              setClickedId,
              imageFile,
              setImageFile,
              setNewLocation,
              setNewDescription,
              setEditing,
              setEditId,
              editing,
              setNewPost,
              setNewLocation,
              setNewDescription,
              handleSubmitNewPost,
            }}
          />

          {showRegister && <Register setShowRegister={setShowRegister} />}
          {showLogin && <Login setShowLogin={setShowLogin} />}
        </ReactMapGL>
      </div>
    </>
  );
}
