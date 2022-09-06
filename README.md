# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { useLogout } from "../hooks/useLogout.hook";
import { useAuthContext } from "../hooks/useAuthContext.hook";
import { usePostsContext } from "../hooks/usePostContext.hook";

import "../App.css";

import "mapbox-gl/dist/mapbox-gl.css";
import Register from "./Register.component";
import Login from "./Login.component";

export default function MapView() {
const { logout } = useLogout();
const { user } = useAuthContext();
const { posts, dispatch } = usePostsContext();
const loggedInUser = (user && user.username) || "";
const [newPost, setNewPost] = useState(null);
const [newLocation, setNewLocation] = useState(null);
const [newDescription, setNewDescription] = useState(null);
const [clickedId, setClickedId] = useState(null);
const [editing, setEditing] = useState(false);
const [showRegister, setShowRegister] = useState(false);
const [showLogin, setShowLogin] = useState(false);
const [viewState, setViewState] = useState({
latitude: 34,
longitude: -102,
zoom: 11,
});

useEffect(() => {
const fetchPosts = async () => {
const response = await fetch("/posts", {
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
const response = await fetch("/posts/" + postId, {
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

    const post = {
      username: loggedInUser,
      title: newLocation,
      description: newDescription,
      lat: newPost.lat,
      long: newPost.long,
    };

    const response = await fetch("/posts", {
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
    }

};

const handleUpdatePost = async (e) => {
e.preventDefault();
const id = 123;
if (!user) {
throw new Error("Client not logged in");
return;
}

    const post = {
      title: newLocation,
      description: newDescription,
    };

    const response = await fetch("/posts/" + id, {
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

const { REACT_APP_MAPBOX } = process.env;

return (
<>

<div
style={{
          padding: 20,
          fontFamily: "sans-serif",
          color: "#fff",
          backgroundColor: "#000",
        }} >
<span>Outdoor Voice</span>
{user ? (
<span className="button btn-logout" onClick={handleLogout}>
Logout
</span>
) : (
<div>
<span
className="button btn-login"
onClick={() => setShowLogin(true)} >
Login
</span>
<span
className="button btn-register"
onClick={() => setShowRegister(true)} >
Register
</span>
</div>
)}
</div>
<div style={{ width: "100vw", height: "100vh" }}>
<ReactMapGL
{...viewState}
mapboxAccessToken={REACT_APP_MAPBOX}
onMove={(evt) => setViewState(evt.viewState)}
mapStyle="mapbox://styles/mapbox/outdoors-v11"
width="100%"
height="100%"
onDblClick={handleDblClick} >
{posts.map((post) => (
<div key={post._id}>
<Marker longitude={post.long} latitude={post.lat}>
<LocationOnIcon
style={{
                    fontSize: "1.7vw",
                    color:
                      post.username === loggedInUser ? "#e28743" : "#1e81b0",
                    cursor: "pointer",
                  }}
onClick={() => handleClicked(post.\_id)}
/>
</Marker>
{clickedId === post.\_id && (
<Popup
longitude={post.long}
latitude={post.lat}
anchor="bottom"
closeButton={true}
closeOnClick={false}
onClose={() => setClickedId(null)} >
<div className="popup">
{editing ? (
<div>
<form onSubmit={() => handleUpdatePost(post.\_id)}>
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
<button
                            type="submit"
                            className="button btn-post-submit"
                          >
Update
</button>
<button
type="submit"
className="button btn-post-submit"
onClick={() => setEditing(false)} >
Cancel
</button>
</form>
</div>
) : (
<div>
<label>{post.title}</label>

                        <label>Description</label>
                        <p className="description">{post.description}</p>
                        <label>Created By:</label>
                        <span className="created-by">{post.username}</span>
                        <span className="date">{"3 months ago"}</span>
                      </div>
                    )}
                    <DeleteIcon onClick={() => handleDelete(post._id)} />
                    <BorderColorIcon onClick={() => setEditing(true)} />
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
                <form onSubmit={handleSubmitNewPost}>
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
                  <button type="submit" className="button btn-post-submit">
                    Post
                  </button>
                </form>
              </div>
            </Popup>
          )}
          {showRegister && <Register setShowRegister={setShowRegister} />}
          {showLogin && <Login setShowLogin={setShowLogin} />}
        </ReactMapGL>
      </div>
    </>

);
}
