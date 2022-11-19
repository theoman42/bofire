import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { addHome } from "../../../../store/userOwnedHomes";
import { getHomeContent } from "../../../../store/currentMenuContent";

const AddHomeModalForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [homeName, setHomeName] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const updateHomeName = (e) => setHomeName(e.target.value);
  const updateimgUrl = (e) => setImageUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      homeName,
      imgUrl,
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
    <div className="modal-form-wrapper">
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

export default AddHomeModalForm;
