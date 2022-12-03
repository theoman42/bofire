import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { addHome } from "../../../../store/userOwnedHomes";
import { getHomeContent } from "../../../../store/currentMenuContent";
import campfireImage from "../../../../stuff/campfire.jpg";
import { HiOutlineUpload } from "react-icons/hi";

const AddHomeModalForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [homeName, setHomeName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const updateHomeName = (e) => setHomeName(e.target.value);

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      homeName,
      image: imageFile,
    };

    let newHome = await dispatch(addHome(payload, user.id)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    if (newHome) {
      dispatch(
        getHomeContent({
          type: "singleHome",
          home: newHome.newHome,
        })
      );
      props.onClose();
    }
  };

  return (
    <>
      <form className="modal-form-container" onSubmit={handleSubmit}>
        <input
          id="modal-file-input"
          type="file"
          onChange={updateFile}
          accept="image/*"
        />
        <label htmlFor="modal-file-input">
          {image ? (
            <img src={image} alt="Temporary Profile Picture" />
          ) : (
            <HiOutlineUpload className="upload-photo-icon" />
          )}
        </label>
        <div>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <div className="text-input-container">
          <input
            type="text"
            placeholder="Name of Home"
            required
            value={homeName}
            onChange={updateHomeName}
          />
        </div>
        <button className="same-button" type="submit">
          Submit Form
        </button>
      </form>
    </>
  );
};

export default AddHomeModalForm;
