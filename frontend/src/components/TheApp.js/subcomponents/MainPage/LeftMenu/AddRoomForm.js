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

    let newRoom = await dispatch(addRoom(homeId, payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    // .then(async (res) => {
    //   dispatch(getOneHomeContent(res.updatedHome.id));
    // });
    if (newRoom) {
      onClose();
    }
  };

  return (
    <>
      <form className="modal-form-container" onSubmit={handleSubmit}>
        <div className="modal-header-div">
          <strong>Create a Room</strong>
        </div>
        <div>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <div className="text-input-container">
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
        </div>
        <button className="same-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddRoomForm;
