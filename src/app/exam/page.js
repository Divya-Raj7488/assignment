"use client";
import React, { useEffect, useState } from "react";
import "../styles/exam.css";
import { useRouter } from "next/navigation";

const ConductExam = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60);
  const [warningIssued, setWarningIssued] = useState(false);

  function submit() {
    router.push("/");
    console.log("test completed successfully");
  }
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    if (timeLeft <= 0) {
      submit();
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
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
          alert("Please stay in full-screen mode!"); // Issue warning
          enterFullScreen(); // Re-enter full-screen mode
          setWarningIssued(true);
        }
      }
    };

    // Add event listeners
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange); // Firefox
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // Chrome, Safari
    document.addEventListener("msfullscreenchange", handleFullscreenChange); // IE/Edge

    // Trigger full-screen on page load
    enterFullScreen();

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, [warningIssued]);

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
      <div className="timer">{formatTime(timeLeft)}</div>
      <div className="questions"></div>
    </div>
  );
};

export default ConductExam;
