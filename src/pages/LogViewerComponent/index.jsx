import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogsLoadingSelector,
  getLogsSelector,
} from "../../redux/longViewer/selectors";
import { getDataRequest, sendLogMessage } from "../../redux/longViewer/actions";
import "./logViewer.css"; // Import your CSS file
import Accordion from "../../components/accordion";

const LogViewerComponent = () => {
  const dispatch = useDispatch();
  const logs = useSelector(getLogsSelector);
  console.log("logs", logs);
  const isLogsLoading = useSelector(getLogsLoadingSelector);
  const logContainerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  console.log("isLogsLoading", isLogsLoading);

  useEffect(() => {
    dispatch(sendLogMessage({ message: "Hello Server!" }));
    dispatch(getDataRequest());
  }, []);

  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const handleToggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  return (
    <div className="main-container">
      <h1 className="title">Log Viewer</h1>
      <button className="toggle-button" onClick={handleToggleAutoScroll}>
        {autoScroll ? "Disable Auto-scroll" : "Enable Auto-scroll"}
      </button>
      <div ref={logContainerRef} className="log-container">
        {isLogsLoading ? (
          "Please wait or reload page"
        ) : (
          <ul className="log-list">
            {logs?.map((log, index) => (
              <li key={index} className="log-item">
                {/* <span className="item-number">{index + 1}:</span>
                <span>{log}</span> */}
                <Accordion key={index} index={index}>
                  <span className="item-number">{index + 1}:</span>
                  <span>{log}</span>
                </Accordion>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LogViewerComponent;
