"use client";
import Link from "next/link";
import "./styles/home.css";

export default function Home() {
  return (
    <div className="homePage">
      <div className="title">ExamEase: Simplifying Exam Management</div>
      <Link href="/exam">
        <button className="startExamBtn">Start Exam</button>
      </Link>
    </div>
  );
}
