import { ArrowUpSvg, ArrowDownSvg, CloseSvg } from "./SVGs";

export default function Settings(props) {
  const {
    settingsObj,
    changeMinutesHandle,
    changeFontHandle,
    changeColorHandle,
    settingsContainerRef,
    returnToPreviousSettings,
    saveSettings,
  } = props;

  const fonts = [
    "Kumbh Sans, sans-serif",
    "Roboto Slab, serif",
    "Space Mono, monospace",
  ];

  const colors = ["#f87070", "#70f3f8", "#d881f8"];

  function closeHandle(save) {
    if (save) {
      saveSettings();
    } else {
      returnToPreviousSettings();
    }
    settingsContainerRef.current.style.visibility = "hidden";
  }

  return (
    <div ref={settingsContainerRef} className="settings-container">
      <div className="settings">
        <div className="settings__header">
          <h1 className="settings__title">Settings</h1>
          <CloseSvg closeHandle={() => closeHandle(false)} />
        </div>
        <div className="settings__main">
          <h2 className="settings__time-title">Time (minutes)</h2>
          <div className="settings__all-container">
            <div className="settings__time-container">
              <div className="settings__minutes-container">
                <p className="settings__minutes-title">pomodoro</p>
                <div className="settings__minutes-input">
                  <p className="settings__minutes-number">
                    {settingsObj["pomodoro"]}
                  </p>
                  <div className="settings__arrows">
                    <ArrowUpSvg
                      changeMinutesHandle={() =>
                        changeMinutesHandle("pomodoro", "up")
                      }
                    />
                    <ArrowDownSvg
                      changeMinutesHandle={() =>
                        changeMinutesHandle("pomodoro", "down")
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="settings__minutes-container">
                <p className="settings__minutes-title">short break</p>
                <div className="settings__minutes-input">
                  <p className="settings__minutes-number">
                    {settingsObj["short-break"]}
                  </p>
                  <div className="settings__arrows">
                    <ArrowUpSvg
                      changeMinutesHandle={() =>
                        changeMinutesHandle("short-break", "up")
                      }
                    />
                    <ArrowDownSvg
                      changeMinutesHandle={() =>
                        changeMinutesHandle("short-break", "down")
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="settings__minutes-container">
                <p className="settings__minutes-title">long break</p>
                <div className="settings__minutes-input">
                  <p className="settings__minutes-number">
                    {settingsObj["long-break"]}
                  </p>
                  <div className="settings__arrows">
                    <ArrowUpSvg
                      changeMinutesHandle={() =>
                        changeMinutesHandle("long-break", "up")
                      }
                    />
                    <ArrowDownSvg
                      changeMinutesHandle={() =>
                        changeMinutesHandle("long-break", "down")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="settings__font-container">
              <h2 className="settings__font-title">font</h2>
              <div
                onClick={() => {
                  changeFontHandle(fonts[0]);
                }}
                className={`circle font-circle font-circle-1 ${
                  settingsObj["font-family"] === fonts[0] ? "selected" : ""
                }`}
              >
                Aa
              </div>
              <div
                onClick={() => changeFontHandle(fonts[1])}
                className={`circle font-circle font-circle-2 ${
                  settingsObj["font-family"] === fonts[1] ? "selected" : ""
                }`}
              >
                Aa
              </div>
              <div
                onClick={() => changeFontHandle(fonts[2])}
                className={`circle font-circle font-circle-3 ${
                  settingsObj["font-family"] === fonts[2] ? "selected" : ""
                }`}
              >
                Aa
              </div>
            </div>
            <div className="settings__color-container">
              <h2 className="settings__color-title">color</h2>
              <div
                onClick={() => changeColorHandle(colors[0])}
                className={`circle color-circle color-circle-1 ${
                  settingsObj["color"] === colors[0] ? "selected" : ""
                }`}
              ></div>
              <div
                onClick={() => changeColorHandle(colors[1])}
                className={`circle color-circle color-circle-2 ${
                  settingsObj["color"] === colors[1] ? "selected" : ""
                }`}
              ></div>
              <div
                onClick={() => changeColorHandle(colors[2])}
                className={`circle color-circle color-circle-3 ${
                  settingsObj["color"] === colors[2] ? "selected" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
        <button onClick={() => closeHandle(true)} className="apply-btn">
          Apply
        </button>
      </div>
    </div>
  );
}
