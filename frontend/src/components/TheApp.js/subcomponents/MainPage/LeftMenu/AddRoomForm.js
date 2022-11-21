import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { updateHome } from "../../../../../store/userOwnedHomes";
import { getOneHomeContent } from "../../../../../store/currentMenuContent";
import { useEffect } from "react";
import { addRoom } from "../../../../../store/room";

const AddRoomForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const homeId = useSelector((state) => state.currentMenuContent.home.id);

  const [roomName, setRoomName] = useState("");
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState([]);

  const updateRoomName = (e) => setRoomName(e.target.value);
  const updateCaption = (e) => setCaption(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      roomName,
      caption,
      userId: user.id,
    };

    console.log(homeId);

    await dispatch(addRoom(homeId, payload)).catch(async (res) => {
      const data = res;
      if (data && data.errors) setErrors(data.errors);
    });
    // .then(async (res) => {
    //   dispatch(getOneHomeContent(res.updatedHome.id));
    // });
    onClose();
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
          placeholder="Room Name"
          required
          value={roomName}
          onChange={updateRoomName}
        />
        <input
          type="text"
          placeholder="What's your room for??"
          required
          value={caption}
          onChange={updateCaption}
        />
        <button className="same-button" type="submit">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;
