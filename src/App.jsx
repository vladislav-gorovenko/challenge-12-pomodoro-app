import "./App.css";
import { useState, useEffect, useRef } from "react";
import { SettingsSvg } from "./components/SVGs";
import Settings from "./components/Settings";
import Circle from "./components/Circle";

function App() {
  const [settingsObj, setSettingsObj] = useState({
    pomodoro: 30,
    "short-break": 5,
    "long-break": 15,
    "font-family": "Kumbh Sans, sans-serif",
    color: "#f87070",
  });

  const [savedSettings, setSavedSettings] = useState(null);

  const [activeGame, setActiveGame] = useState({
    modeSelected: "pomodoro",
    active: false,
    paused: false,
  });

  const [remainingTime, setRemainingTime] = useState(() => {
    if (settingsObj) {
      return new Date(turnToMs(settingsObj[activeGame.modeSelected]));
    }
  });

  useEffect(() => {
    setRemainingTime(new Date(turnToMs(settingsObj[activeGame.modeSelected])));
  }, [settingsObj]);

  useEffect(() => {
    setSavedSettings(settingsObj);
  }, []);

  const [percentage, setPercentage] = useState(100);

  const intervalRef = useRef(null);
  const settingsContainerRef = useRef(null);

  function onClick() {
    if (!activeGame.active || activeGame.paused) {
      startTimer();
    } else {
      pauseTimer();
    }
  }

  function formatNumbers(number) {
    return number.toString().padStart(2, "0");
  }

  function saveSettings() {
    setRemainingTime(new Date(turnToMs(settingsObj[activeGame.modeSelected])));
    setPercentage(100);
    clearInterval(intervalRef.current);
    setActiveGame((prevActiveGame) => {
      return { ...prevActiveGame, active: false, paused: false };
    });
    if (savedSettings) {
      setSavedSettings(settingsObj);
    }
  }

  function returnToPreviousSettings() {
    if (savedSettings) {
      setSettingsObj(savedSettings);
    }
  }

  function changeModes(mode) {
    setActiveGame((prevActiveGame) => {
      return {
        ...prevActiveGame,
        modeSelected: mode,
      };
    });
    stopTimer();
    setRemainingTime(new Date(turnToMs(settingsObj[mode])));
  }

  function startTimer() {
    if (!activeGame.active) {
      setActiveGame((prevActiveGame) => {
        return { ...prevActiveGame, active: true };
      });
    }
    let delay = turnToMs(settingsObj[activeGame.modeSelected]);
    if (activeGame.paused) {
      setActiveGame((prevActiveGame) => {
        return { ...prevActiveGame, paused: false };
      });
    }
    const nowTime = new Date();
    let endingTime = new Date(nowTime.getTime() + delay);
    if (activeGame.paused) {
      endingTime = new Date(nowTime.getTime() + remainingTime.getTime());
    }
    intervalRef.current = setInterval(() => {
      const currentTime = new Date();
      const remTime = new Date(endingTime.getTime() - currentTime.getTime());
      if (endingTime.getTime() - currentTime.getTime() <= 0) {
        stopTimer();
        return;
      }
      setRemainingTime(remTime);
      setPercentage(Math.floor((remTime / delay) * 100));
    }, 200);
  }

  function pauseTimer() {
    clearInterval(intervalRef.current);
    setActiveGame((prevActiveGame) => {
      return { ...prevActiveGame, paused: true };
    });
  }

  function stopTimer() {
    setRemainingTime(new Date(0));
    setPercentage(100);
    clearInterval(intervalRef.current);
    setActiveGame((prevActiveGame) => {
      return { ...prevActiveGame, active: false, paused: false };
    });
  }

  function turnToMs(m) {
    return m * 60 * 1000;
  }

  function changeMinutesHandle(property, option) {
    setSettingsObj((prevSettingsObj) => {
      let minutes = prevSettingsObj[property];
      if (option === "up") {
        minutes >= 59 ? (minutes = 59) : (minutes += 1);
      } else {
        minutes <= 1 ? (minutes = 1) : (minutes -= 1);
      }
      return {
        ...prevSettingsObj,
        [property]: Math.floor(minutes),
      };
    });
  }

  function changeFontHandle(value) {
    setSettingsObj((prevSettingsObj) => {
      return {
        ...prevSettingsObj,
        "font-family": value,
      };
    });
  }

  function changeColorHandle(value) {
    setSettingsObj((prevSettingsObj) => {
      return {
        ...prevSettingsObj,
        color: value,
      };
    });
  }

  function openHandle() {
    settingsContainerRef.current.style.visibility = "visible";
  }

  return (
    <main
      style={{ fontFamily: settingsObj["font-family"] }}
      className="pomodoro"
    >
      <h1 className="pomodoro__title">pomodoro</h1>
      <div className="pomodoro__central-container">
        <div className="pomodoro__options">
          <p
            onClick={() => changeModes("pomodoro")}
            className={`pomodoro__option ${
              activeGame.modeSelected === "pomodoro" ? "selected" : ""
            }`}
            style={{
              background: `${
                activeGame.modeSelected === "pomodoro" ? settingsObj.color : ""
              }`,
            }}
          >
            pomodoro
          </p>
          <p
            onClick={() => changeModes("short-break")}
            className={`pomodoro__option ${
              activeGame.modeSelected === "short-break" ? "selected" : ""
            }`}
            style={{
              background: `${
                activeGame.modeSelected === "short-break"
                  ? settingsObj.color
                  : ""
              }`,
            }}
          >
            short break
          </p>
          <p
            onClick={() => changeModes("long-break")}
            className={`pomodoro__option ${
              activeGame.modeSelected === "long-break" ? "selected" : ""
            }`}
            style={{
              background: `${
                activeGame.modeSelected === "long-break"
                  ? settingsObj.color
                  : ""
              }`,
            }}
          >
            long break
          </p>
        </div>
        <div className="pomodoro__outer-circle">
          <Circle percent={percentage} color={settingsObj.color} />
          <div className="pomodoro__time-container">
            <p className="pomodoro__time">{`${formatNumbers(
              remainingTime.getMinutes()
            )}:${formatNumbers(remainingTime.getSeconds())}`}</p>
            <p
              style={{ fontFamily: settingsObj["font-family"] }}
              onClick={onClick}
              className="pomodoro__action"
            >
              {activeGame.active
                ? activeGame.paused
                  ? "resume"
                  : "pause"
                : remainingTime <= 0
                ? "restart"
                : "start"}
            </p>
          </div>
        </div>
      </div>
      <SettingsSvg openHandle={openHandle} />
      <Settings
        settingsObj={settingsObj}
        changeMinutesHandle={changeMinutesHandle}
        changeFontHandle={changeFontHandle}
        changeColorHandle={changeColorHandle}
        settingsContainerRef={settingsContainerRef}
        saveSettings={saveSettings}
        returnToPreviousSettings={returnToPreviousSettings}
      />
    </main>
  );
}

export { App };
