import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { updateHome } from "../../../../../store/userOwnedHomes";
import { getOneHomeContent } from "../../../../../store/currentMenuContent";
import { deleteHome } from "../../../../../store/userOwnedHomes";
import { goHome } from "../../../../../store/currentMenuContent";
import { useEffect } from "react";
import { leaveRoom } from "../../../../../store/session";
import { clearMessages } from "../../../../../store/messageState1";
import { HiOutlineUpload } from "react-icons/hi";

const UpdateHomeSettingsForm = ({ onClose }) => {
  const user = useSelector((state) => state.session.user);
  const menuContent = useSelector((state) => state.currentMenuContent);

  const dispatch = useDispatch();

  const [homeName, setHomeName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setHomeName(menuContent.home.homeName);
    setImage(menuContent.home.imgUrl);
  }, [menuContent]);

  const updateHomeName = (e) => setHomeName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      homeName,
      image: imageFile,
    };

    const updatedHome = await dispatch(
      updateHome(payload, user.id, menuContent.home.id)
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    if (updatedHome) {
      dispatch(getOneHomeContent(updatedHome.id));
    }

    onClose();
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteHome(user.id, menuContent.home.id));
    dispatch(goHome());
    dispatch(leaveRoom(user.id));
    dispatch(clearMessages());
    onClose();
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
            <HiOutlineUpload />
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
        <div>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
          <button className="same-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateHomeSettingsForm;
