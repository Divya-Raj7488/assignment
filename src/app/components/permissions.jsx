import React from "react";
import "../styles/permissions.css";
import Link from "next/link";

const Permissions = () => {
  return (
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
            The first exit from full-screen mode will trigger a warning, and the
            second will result in automatic exam submission.
          </li>
          <li>
            {" "}
            Ensure a stable connection and uninterrupted environment, as you
            agree to these terms by starting the exam.
          </li>
        </ul>
        <div className="checkBoxContainer">
          <input type="checkbox" />
          <span>
            By clicking here, you agree to all the terms and conditions.
          </span>
        </div>
      </div>
      <div className="btnBox">
        <Link href="/exam">
          <button className="proceed">Proceed</button>
        </Link>
        <Link  href="/">
          <button className="cancelBtn">cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default Permissions;
