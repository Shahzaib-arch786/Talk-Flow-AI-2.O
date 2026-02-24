import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CallNavbar from "../components/CallNavbar";
import SpeakButton from "../components/SpeakButton";
import STTPanel from "../components/STTPanel";
import NLPPanel from "../components/NLPPanel";
import TTSPanel from "../components/TTSPanel";
import FooterNote from "../components/FooterNote";

export default function AICallPage() {

  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const session = localStorage.getItem("demo_session_id");

    if (!session) {
      navigate("/demo");
      return;
    }

    fetch(`http://127.0.0.1:8000/demo/validate/${session}`)
      .then((res) => {
        if (!res.ok) throw new Error("Expired");
        return res.json();
      })
      .then((data) => {
        setTimeLeft(data.remaining_seconds);
      })
      .catch(() => {
        localStorage.removeItem("demo_session_id");
        navigate("/demo");
      });
  }, [navigate]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      localStorage.removeItem("demo_session_id");
      navigate("/signup");
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <CallNavbar />
    
      <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Countdown Timer */}
          {timeLeft !== null && (
          <div className="text-right text-red-600 font-semibold mb-4">
            Demo ends in: {formatTime(timeLeft)}
          </div>
        )}

        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Intelligent Voice Interaction
          </h1>

          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            A demonstration of how artificial intelligence processes spoken
            language, understands intent, and generates natural responses.
          </p>
        </div>

        <SpeakButton />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <STTPanel />
          <NLPPanel />
          <TTSPanel />
        </div>

        <FooterNote />
      </div>
    </div>
  );
}