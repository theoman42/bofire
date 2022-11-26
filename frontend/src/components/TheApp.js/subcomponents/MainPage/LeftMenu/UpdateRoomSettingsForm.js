import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateRoom, deleteRoom } from "../../../../../store/room";
import { leaveRoom } from "../../../../../store/session";
import { clearMessages } from "../../../../../store/messageState1";

const UpdateRoomSettingsForm = ({ roomId, onClose }) => {
  const dispatch = useDispatch();
  const [toRender, setToRender] = useState("");

  const user = useSelector((state) => state.session.user);
  const homeId = useSelector((state) => state.currentMenuContent.home.id);
  const rooms = useSelector((state) => state.rooms);

  const [roomName, setRoomName] = useState("");
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState([]);

  const updateRoomName = (e) => setRoomName(e.target.value);
  const updateCaption = (e) => setCaption(e.target.value);

  useEffect(() => {
    setRoomName(rooms[roomId].roomName);
    setCaption(rooms[roomId].caption);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      roomName,
      userId: user.id,
      caption,
    };

    await dispatch(updateRoom(homeId, roomId, payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    // .then(async (res) => {
    //   dispatch(getOneHomeContent(res.updatedHome.id));
    // });
    onClose();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteRoom(user.id, homeId, roomId));
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

export default UpdateRoomSettingsForm;
