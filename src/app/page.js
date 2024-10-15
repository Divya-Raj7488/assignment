"use client"
import Link from "next/link";
import "./styles/home.css";
import Permissions from "./components/permissions";
import { useState } from "react";

export default function Home() {
  const [startExam, setstartExam] = useState(false);
  return (
    <div className="homePage">
      <div className="title">ExamEase: Simplifying Exam Management</div>
      {/* <Link href="/exam"> */}
      <button
        className="startExamBtn"
        onClick={() => {
          setstartExam(true);
        }}
      >
        Start Exam
      </button>
      {/* </Link> */}
      {startExam && <Permissions />}
    </div>
  );
}
