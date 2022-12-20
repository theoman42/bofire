import { TbLetterA, TbLetterW } from "react-icons/tb";

const GameSelectionMenu = ({ onClose }) => {
  return (
    <>
      <div className="modal-game-menu-container">
        <TbLetterA />
        <TbLetterW />
        <div></div>
      </div>
    </>
  );
};

export default GameSelectionMenu;
