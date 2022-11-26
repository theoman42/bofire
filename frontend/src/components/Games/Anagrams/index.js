import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Anagrams.css";
import { AutoTabProvider } from "react-auto-tab";
import { submitAWord } from "../../../store/anagram";
import {
  TbLetterA,
  TbLetterB,
  TbLetterC,
  TbLetterD,
  TbLetterE,
  TbLetterF,
  TbLetterG,
  TbLetterH,
  TbLetterI,
  TbLetterJ,
  TbLetterK,
  TbLetterL,
  TbLetterM,
  TbLetterN,
  TbLetterO,
  TbLetterP,
  TbLetterQ,
  TbLetterR,
  TbLetterS,
  TbLetterT,
  TbLetterU,
  TbLetterV,
  TbLetterW,
  TbLetterX,
  TbLetterY,
  TbLetterZ,
} from "react-icons/tb";
import { loadGame, endGame } from "../../../store/anagram";

const returnLetter = (letter) => {
  switch (letter) {
    case "A":
      return <TbLetterA />;
    case "B":
      return <TbLetterB />;
    case "C":
      return <TbLetterC />;
    case "D":
      return <TbLetterD />;
    case "E":
      return <TbLetterE />;
    case "F":
      return <TbLetterF />;
    case "G":
      return <TbLetterG />;
    case "H":
      return <TbLetterH />;
    case "I":
      return <TbLetterI />;
    case "J":
      return <TbLetterJ />;
    case "K":
      return <TbLetterK />;
    case "L":
      return <TbLetterL />;
    case "M":
      return <TbLetterM />;
    case "N":
      return <TbLetterN />;
    case "O":
      return <TbLetterO />;
    case "P":
      return <TbLetterP />;
    case "Q":
      return <TbLetterQ />;
    case "R":
      return <TbLetterR />;
    case "S":
      return <TbLetterS />;
    case "T":
      return <TbLetterT />;
    case "U":
      return <TbLetterU />;
    case "V":
      return <TbLetterV />;
    case "W":
      return <TbLetterW />;
    case "X":
      return <TbLetterX />;
    case "Y":
      return <TbLetterY />;
    case "Z":
      return <TbLetterZ />;
    default:
      return <TbLetterB />;
  }
};

const Anagram = () => {
  const dispatch = useDispatch();
  // dispatch(getUserPartHomes(userId));
  // const currentUserHomes = Object.values(useSelector((state) => state.spots));
  const anagram = useSelector((state) => state.anagram);
  const user = useSelector((state) => state.session.user);

  // const [inSession, setInSession] = useState(false);
  const [gameWord, setGameWord] = useState("");
  const [input0, setInput0] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const [input7, setInput7] = useState("");

  const inputRef = useRef();
  const inputRef0 = useRef();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const inputRef6 = useRef();
  const inputRef7 = useRef();

  const [currentWordsArray, setCurrentWordsArray] = useState([]);
  const currentLettersLeft = useRef();
  const inSession = useRef(false);

  // const reRender = useRef(1);

  // useEffect;

  let currentWord = `${input0}${input1}${input2}${input3}${input4}${input5}${input6}${input7}`;

  useEffect(() => {
    if (JSON.stringify(anagram) !== "{}") {
      setGameWord(anagram.word.split(""));
      inSession.current = true;
    } else {
      inSession.current = false;
    }
  }, [anagram]);

  useEffect(() => {
    if (JSON.stringify(anagram) !== "{}") {
      currentLettersLeft.current = getDifference(
        anagram.word.split(""),
        currentWord?.split("")
      );
    }
  });

  const getDifference = (a, b) => {
    return a.filter((element) => {
      return !b.includes(element);
    });
  };

  const startGame = async () => {
    let payload = { userId: user.id, roomId: null };
    await dispatch(loadGame(payload));
  };

  const endGameButton = async (userId, anagramId) => {
    const data = await dispatch(endGame(userId, anagramId));
    if (data) {
      setCurrentWordsArray([]);
      inSession.current = false;
      clearAnagrams();
    }
  };

  const checkIfLetterIsPartOfGame = (letter, i) => {
    let indexInLettersLeft = currentLettersLeft.current.findIndex((el) => {
      return el == letter;
    });
    if (indexInLettersLeft > -1) {
      gameFunc[i](letter);
      focusFunc(i + 1);
    } else {
      gameFunc[i]("");
    }
  };

  const deleteLetter = (i) => {
    gameFunc[i]("");
    focusFunc(i === 0 ? 0 : i - 1);
  };

  const newInput = (e, i) => {
    switch (e.keyCode) {
      case 65:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 66:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 67:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 68:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 69:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 70:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 71:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 72:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 73:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 74:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 75:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 76:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 77:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 78:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 79:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 80:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 81:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 82:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 83:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 84:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 85:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 86:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 87:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 88:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 89:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      case 90:
        checkIfLetterIsPartOfGame(String.fromCharCode(e.keyCode), i);
        break;
      //Delete
      case 8:
        deleteLetter(i);
        break;
      default:
        break;
    }
  };

  const submitWord = async (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();

      let payload = {
        word: `${input0}${input1}${input2}${input3}${input4}${input5}${input6}${input7}`,
      };

      if (!currentWordsArray.includes(payload.word)) {
        blinkRed();
        let data = await dispatch(submitAWord(payload, anagram.id, user.id));
        if (data.score !== anagram.score) {
          setCurrentWordsArray((currentWordsArray) => [
            ...currentWordsArray,
            payload.word,
          ]);
        }
      }
      clearAnagrams();
      focusFunc(0);
    }
  };

  const focusFunc = (i) => {
    inputRefObj[i].current.focus();
  };
  const blinkRed = () => {};

  let gameFunc = {
    0: setInput0,
    1: setInput1,
    2: setInput2,
    3: setInput3,
    4: setInput4,
    5: setInput5,
    6: setInput6,
    7: setInput7,
  };

  let inputRefObj = {
    0: inputRef0,
    1: inputRef1,
    2: inputRef2,
    3: inputRef3,
    4: inputRef4,
    5: inputRef5,
    6: inputRef6,
    7: inputRef7,
  };

  const setValueProperty = (i) => {
    switch (i) {
      case 0:
        return input0;
      case 1:
        return input1;
      case 2:
        return input2;
      case 3:
        return input3;
      case 4:
        return input4;
      case 5:
        return input5;
      case 6:
        return input6;
      case 7:
        return input7;
      default:
        return null;
    }
  };

  const clearAnagrams = () => {
    setInput0("");
    setInput1("");
    setInput2("");
    setInput3("");
    setInput4("");
    setInput5("");
    setInput6("");
    setInput7("");
  };

  return (
    <div className="anagram-wrapper">
      {inSession.current ? (
        <>
          <div className="anagram-additional-wrapper">
            <div className="left-side-game-wrapper">
              <div className="score-board">
                <span>{anagram.score}</span>
              </div>
              <div className="anagram-letter-set">
                <form onKeyDown={submitWord}>
                  {gameWord.map((letter, i) => {
                    return (
                      <div>
                        <input
                          key={i}
                          type="text"
                          value={setValueProperty(i)}
                          maxLength={1}
                          onFocus={(e) => e.target.select()}
                          onKeyDown={(e) => newInput(e, i)}
                          ref={inputRefObj[i]}
                          // disabled={isDisabledFunction(i)}
                        />
                      </div>
                    );
                  })}
                </form>
              </div>
              <div className="anagram-letter-set">
                {gameWord.map((letter) => {
                  return <div>{returnLetter(letter)}</div>;
                })}
              </div>
              <button onClick={() => endGameButton(user.id, anagram.id)}>
                Reset and hello
              </button>
            </div>
          </div>
        </>
      ) : (
        <button onClick={startGame}>Start Game</button>
      )}
    </div>
  );
};

export default Anagram;
