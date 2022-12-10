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
      res.json(errors);
    });
    // .then(async (res) => {
    //   dispatch(getOneHomeContent(res.updatedHome.id));
    // });
    onClose();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(leaveRoom(user.id));
    dispatch(deleteRoom(user.id, homeId, roomId));
    dispatch(clearMessages());
    onClose();
  };

  return (
    <>
      <form className="modal-form-container" onSubmit={handleSubmit}>
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

export default UpdateRoomSettingsForm;
