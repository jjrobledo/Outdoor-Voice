import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import "../App.css";

import "mapbox-gl/dist/mapbox-gl.css";

export default function MapView() {
  const loggedInUser = "Jesse";
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const [newDescription, setNewDescription] = useState(null);
  const [clickedId, setClickedId] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 34,
    longitude: -102,
    zoom: 11,
  });

  const handleClicked = (id) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      username: loggedInUser,
      title: newLocation,
      description: newDescription,
      lat: newPost.lat,
      long: newPost.long,
    };

    try {
      const response = await axios.post("/posts", post);
      setPosts([...posts, response.data]);
      setNewPost(null);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    getPosts();
  }, []);

  const { REACT_APP_MAPBOX } = process.env;

  return (
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
        {posts.map((post) => (
          <div key={post._id}>
            <Marker longitude={post.long} latitude={post.lat}>
              <LocationOnIcon
                style={{
                  fontSize: "1.7vw",
                  color: post.username === loggedInUser ? "#e28743" : "#1e81b0",
                  cursor: "pointer",
                }}
                onClick={() => handleClicked(post._id)}
              />
            </Marker>
            {clickedId === post._id && (
              <Popup
                longitude={post.long}
                latitude={post.lat}
                anchor="bottom"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setClickedId(null)}
              >
                <div className="popup">
                  <label>{post.title}</label>

                  <label>Description</label>
                  <p className="description">{post.description}</p>
                  <label>Created By:</label>
                  <span className="created-by">{post.username}</span>
                  <span className="date">{"3 months ago"}</span>
                </div>
              </Popup>
            )}
          </div>
        ))}
        {newPost && (
          <Popup
            longitude={newPost.long}
            latitude={newPost.lat}
            anchor="bottom"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPost(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Location</label>
                <input
                  placeholder="Location"
                  onChange={(e) => setNewLocation(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="description"
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <button type="submit" className="button">
                  Post
                </button>
              </form>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
