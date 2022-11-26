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

const UpdateHomeSettingsForm = ({ onClose }) => {
  const user = useSelector((state) => state.session.user);
  const menuContent = useSelector((state) => state.currentMenuContent);

  const dispatch = useDispatch();

  const [homeName, setHomeName] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setHomeName(menuContent.home.homeName);
    setImageUrl(menuContent.home.imgUrl);
  }, [menuContent]);

  const updateHomeName = (e) => setHomeName(e.target.value);
  const updateimgUrl = (e) => setImageUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      homeName,
      imgUrl,
    };

    let updatedHome = await dispatch(
      updateHome(payload, user.id, menuContent.home.id)
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    if (updatedHome) dispatch(getOneHomeContent(updatedHome.id));

    onClose();
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
    <div className="modal-form-wrapper">
      <button onClick={handleDelete}>Delete</button>
      <form className="modal-form-container" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Name of Home"
          required
          value={homeName}
          onChange={updateHomeName}
        />
        <input
          type="text"
          placeholder="Image URL"
          required
          value={imgUrl}
          onChange={updateimgUrl}
        />
        <button className="same-button" type="submit">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default UpdateHomeSettingsForm;
