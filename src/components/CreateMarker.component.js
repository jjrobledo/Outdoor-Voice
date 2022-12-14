import { Popup } from "react-map-gl";

export default function CreateMarker({ props }) {
  const {
    newPost,
    handleSubmitNewPost,
    setNewPost,
    setNewLocation,
    setNewDescription,
    setImageFile,
  } = props;

  //console.log("NEW POST? " + newPost);

  if (newPost) {
    return (
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
            <label>Image File</label>
            <input
              type="file"
              id="fileinput"
              required
              accept="image/jpeg, image/jpg, image/png, image/webp"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
              }}
            />
            <button type="submit" className="button btn-post-submit">
              Post
            </button>
          </form>
        </div>
      </Popup>
    );
  }
}
