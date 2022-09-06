import { Marker } from "react-map-gl";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import MarkerDescriptions from "./MarkerDescriptions.component";
import CreateMarker from "./CreateMarker.component";

export default function MapMarkers({ props }) {
  const {
    posts,
    newPost,
    handleClicked,
    handleUpdatePost,
    handleDelete,
    clickedId,
    setClickedId,
    setNewLocation,
    setNewPost,
    handleSubmitNewPost,
    setNewDescription,
    setEditing,
    setEditId,
    editing,
    loggedInUser,
  } = props;
  console.log("NEW POST" + JSON.stringify(newPost));
  if (posts) {
    return posts.map((post) => (
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
        <MarkerDescriptions
          props={{
            post,
            clickedId,
            editing,
            handleUpdatePost,
            setNewLocation,
            setNewDescription,
            setClickedId,
            setEditId,
            handleDelete,
            setEditing,
          }}
        />
        <CreateMarker
          props={{
            newPost,
            handleSubmitNewPost,
            setNewPost,
            setNewLocation,
            setNewDescription,
          }}
        />
      </div>
    ));
  } else {
    console.log("POSTS NOT FOUND????????????");
  }
}
