import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Popup } from "react-map-gl";

export default function MarkerDescriptions({ props }) {
  const {
    post,
    clickedId,
    setClickedId,
    editing,
    handleUpdatePost,
    setNewLocation,
    setNewDescription,
    handleDelete,
    setEditing,
    setEditId,
  } = props;

  console.log(clickedId === post._id);

  if (clickedId === post._id) {
    return (
      <Popup
        longitude={post.long}
        latitude={post.lat}
        anchor="bottom"
        closeButton={true}
        closeOnClick={false}
        onClose={() => setClickedId(null)}
      >
        <div className="popup">
          {editing ? (
            <div>
              <form onSubmit={handleUpdatePost}>
                <label>Location</label>
                <input
                  placeholder="Location"
                  defaultValue={post.title}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="description"
                  defaultValue={post.description}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <button
                  type="submit"
                  className="button btn-post-submit"
                  onClick={() => {
                    setEditId(post._id);
                  }}
                >
                  Update
                </button>
                <button
                  type="submit"
                  className="button btn-post-submit"
                  onClick={() => {
                    setEditing(false);
                  }}
                >
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
    );
  }
}
