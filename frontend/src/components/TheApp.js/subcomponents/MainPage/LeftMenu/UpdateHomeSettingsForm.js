import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { updateHome } from "../../../../../store/userOwnedHomes";
import { getOneHomeContent } from "../../../../../store/currentMenuContent";
import { deleteHome } from "../../../../../store/userOwnedHomes";
import { goHome } from "../../../../../store/currentMenuContent";

const UpdateHomeSettingsForm = ({ content, onClose, setType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [homeName, setHomeName] = useState(content.home.homeName);
  const [imgUrl, setImageUrl] = useState(content.home.imgUrl);
  const [errors, setErrors] = useState([]);

  const updateHomeName = (e) => setHomeName(e.target.value);
  const updateimgUrl = (e) => setImageUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      homeName,
      imgUrl,
    };

    await dispatch(updateHome(payload, user.id, content.home.id))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
      .then(async (res) => {
        dispatch(getOneHomeContent(res.updatedHome.id));
      });
    onClose();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteHome(user.id, content.home.id));
    dispatch(goHome());
    setType("homePage");
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
