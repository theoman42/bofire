import { TbLetterA, TbLetterW } from "react-icons/tb";
import Anagram from "../../../../../Games/Anagrams";

const GameSelectionMenu = ({ onClose }) => {
  return (
    <>
      <div className="modal-game-menu-container">
        <TbLetterA />
        <TbLetterW />
      </div>
    </>
  );
};

export default GameSelectionMenu;
