"use client";
import React, { useEffect, useState } from "react";
import "../styles/exam.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ConductExam = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60);
  const [warningIssued, setWarningIssued] = useState(false);
  const [permission, setPermission] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notChecked, setNotChecked] = useState(false);

  function submit() {
    router.push("/");
    console.log("test completed successfully");
  }
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && permission) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    if (timeLeft <= 0) {
      submit();
    }
    return () => clearInterval(timer);
  }, [timeLeft, permission]);

  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      element.msRequestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      if (warningIssued) {
        submit();
      } else {
        setShowWarning(true);
        setWarningIssued(true);
      }
    }
  };

  useEffect(() => {
    if (permission) {
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      enterFullScreen();
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [permission, warningIssued]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="examBox">
      {!permission && (
        <div className="permissionBox">
          <div className="TAndCTitle">TERM AND CONDITIONS</div>
          <div className="clause">
            <ul>
              <li>
                {" "}
                By attending this exam, you must remain in full-screen mode and
                complete the test within the given time.
              </li>
              <li>
                The first exit from full-screen mode will trigger a warning, and
                the second will result in automatic exam submission.
              </li>
              <li>
                {" "}
                Ensure a stable connection and uninterrupted environment, as you
                agree to these terms by starting the exam.
              </li>
            </ul>
            <div className="checkBoxContainer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <span className={notChecked ? "notChecked" : "checked"}>
                By clicking here, you agree to all the terms and conditions.
              </span>
            </div>
          </div>
          <div className="btnBox">
            <button
              // disabled={!termsAccepted}
              className={termsAccepted ? "proceed" : "proceedLater"}
              onClick={() => {
                if (termsAccepted) {
                  setPermission(true);
                } else {
                  setNotChecked(true);
                }
              }}
            >
              {" "}
              start
            </button>
            <Link href="/">
              <button className="cancelBtn">cancel</button>
            </Link>
          </div>
        </div>
      )}
      {permission && (
        <>
          <div className="timer">{formatTime(timeLeft)}</div>
          <div className="questions"></div>
        </>
      )}
      {warningIssued && showWarning && (
        <div className="fullScreenExitSign">
          <div className="title2">Exit Full Screen</div>
          <div className="mssg">
            Exiting full screen will auto-submit the test
          </div>
          <div className="prmssnBtn">
            <button className="btn1" onClick={submit}>
              Submit
            </button>{" "}
            <button
              className="btn2"
              onClick={() => {
                setShowWarning(false);
                enterFullScreen();
              }}
            >
              Continue Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConductExam;
