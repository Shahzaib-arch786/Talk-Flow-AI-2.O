// import { useRef, useState } from "react";
// import { Mic, PhoneOff } from "lucide-react";
// import { sendVoiceToAI } from "../hooks/ai";

// export default function VoicePanel({ ai }) {
//   const [recording, setRecording] = useState(false);

//   const mediaRecorderRef = useRef(null);
//   const streamRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const silenceTimerRef = useRef(null);
//   const audioContextRef = useRef(null);

//   const conversationActiveRef = useRef(false);
//   const processingRef = useRef(false);
//   const hasStartedListeningRef = useRef(false);

//   // =========================
//   // Start full conversation
//   // =========================
//   const startConversation = async () => {
//     if (conversationActiveRef.current) return;

//     console.log("Conversation Started");

//     conversationActiveRef.current = true;

//     await startListening();
//   };

//   // =========================
//   // End full conversation
//   // =========================
//   const stopConversation = () => {
//     console.log("Conversation Ended");

//     conversationActiveRef.current = false;
//     processingRef.current = false;
//     hasStartedListeningRef.current = false;

//     clearTimeout(silenceTimerRef.current);

//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//     }

//     cleanupAudioResources();

//     setRecording(false);
//     ai.setVoiceLoading(false);
//   };

//   // =========================
//   // Cleanup stream/audio
//   // =========================
//   const cleanupAudioResources = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }

//     if (audioContextRef.current) {
//       audioContextRef.current.close();
//       audioContextRef.current = null;
//     }
//   };

//   // =========================
//   // Start listening
//   // =========================
//   const startListening = async () => {
//     try {
//       if (
//         !conversationActiveRef.current ||
//         processingRef.current ||
//         hasStartedListeningRef.current
//       ) {
//         return;
//       }

//       console.log("Listening...");

//       hasStartedListeningRef.current = true;

//       cleanupAudioResources();

//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//       });

//       streamRef.current = stream;

//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;

//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         try {
//           console.log("Recording stopped");

//           setRecording(false);
//           processingRef.current = true;
//           hasStartedListeningRef.current = false;

//           cleanupAudioResources();

//           const audioBlob = new Blob(audioChunksRef.current, {
//             type: "audio/webm",
//           });

//           console.log("Final blob:", audioBlob.size);

//           if (audioBlob.size === 0) {
//             processingRef.current = false;

//             if (conversationActiveRef.current) {
//               startListening();
//             }
//             return;
//           }

//           const file = new File(
//             [audioBlob],
//             "voice.webm",
//             {
//               type: "audio/webm",
//             }
//           );

//           const token = localStorage.getItem("token");

//           ai.setVoiceLoading(true);

//           const res = await sendVoiceToAI(file, token);

//           console.log("VOICE RESPONSE:", res);

//           // chat messages
//           ai.setMessages((prev) => [
//             ...prev,
//             {
//               role: "user",
//               text: res.transcription,
//             },
//             {
//               role: "ai",
//               text: res.response_text,
//             },
//           ]);

//           // right panel analysis
//           ai.setAnalysis({
//             mode: "voice",
//             intent: res.intent || "Voice Query",
//             confidence:
//               (res.confidence || 0.9) * 100,
//             response: res.response_text,
//             transcription:
//               res.transcription,
//             latency: "2.3s",
//             audioStatus: "Generated",
//           });

//           // play AI audio
//           if (res.audio_url) {
//             const audio = new Audio(
//               `http://127.0.0.1:8000${res.audio_url}`
//             );

//             audio.play();

//             audio.onended = async () => {
//               console.log(
//                 "AI finished speaking"
//               );

//               processingRef.current = false;
//               ai.setVoiceLoading(false);

//               if (
//                 conversationActiveRef.current
//               ) {
//                 await startListening();
//               }
//             };
//           } else {
//             processingRef.current = false;
//             ai.setVoiceLoading(false);

//             if (
//               conversationActiveRef.current
//             ) {
//               startListening();
//             }
//           }
//         } catch (error) {
//           console.error(
//             "Voice Error:",
//             error
//           );

//           processingRef.current = false;
//           ai.setVoiceLoading(false);

//           if (
//             conversationActiveRef.current
//           ) {
//             startListening();
//           }
//         }
//       };

//       mediaRecorder.start();
//       setRecording(true);

//       detectSilence(
//         stream,
//         mediaRecorder
//       );
//     } catch (error) {
//       console.error(error);

//       hasStartedListeningRef.current = false;
//       processingRef.current = false;
//     }
//   };

//   // =========================
//   // Detect silence
//   // =========================
//   const detectSilence = (
//     stream,
//     recorder
//   ) => {
//     audioContextRef.current =
//       new AudioContext();

//     const audioContext =
//       audioContextRef.current;

//     const analyser =
//       audioContext.createAnalyser();

//     const source =
//       audioContext.createMediaStreamSource(
//         stream
//       );

//     source.connect(analyser);

//     const dataArray =
//       new Uint8Array(
//         analyser.frequencyBinCount
//       );

//     let hasSpoken = false;

//     const checkVolume = () => {
//       if (
//         !conversationActiveRef.current ||
//         recorder.state !==
//           "recording"
//       ) {
//         return;
//       }

//       analyser.getByteFrequencyData(
//         dataArray
//       );

//       const volume =
//         dataArray.reduce(
//           (a, b) => a + b,
//           0
//         ) / dataArray.length;

//       // user started speaking
//       if (volume > 8) {
//         hasSpoken = true;

//         clearTimeout(
//           silenceTimerRef.current
//         );

//         silenceTimerRef.current =
//           null;
//       }

//       // user stopped speaking
//       if (hasSpoken && volume < 5) {
//         if (
//           !silenceTimerRef.current
//         ) {
//           silenceTimerRef.current =
//             setTimeout(() => {
//               if (
//                 recorder.state ===
//                 "recording"
//               ) {
//                 console.log(
//                   "Silence detected → sending"
//                 );

//                 recorder.stop();
//               }
//             }, 1800);
//         }
//       }

//       requestAnimationFrame(
//         checkVolume
//       );
//     };

//     checkVolume();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-full">

//       {/* Main Button */}
//       <button
//         onClick={
//           conversationActiveRef.current
//             ? stopConversation
//             : startConversation
//         }
//         className={`w-28 h-28 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${
//           conversationActiveRef.current
//             ? "bg-red-500 animate-pulse"
//             : "bg-blue-600 hover:scale-105"
//         }`}
//       >
//         {conversationActiveRef.current ? (
//           <PhoneOff size={34} />
//         ) : (
//           <Mic size={34} />
//         )}
//       </button>

//       {/* Status */}
//       <p className="mt-5 text-gray-600 font-medium">
//         {conversationActiveRef.current
//           ? "Live Voice Conversation Active"
//           : "Start Voice Conversation"}
//       </p>

//       {/* Processing */}
//       {ai.voiceLoading && (
//         <div className="mt-5 flex gap-2">
//           <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
//           <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></span>
//           <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></span>
//         </div>
//       )}

//       {/* Live Wave */}
//       {recording &&
//         !ai.voiceLoading && (
//           <div className="mt-6 flex items-end gap-2">
//             <div className="w-1 h-5 bg-blue-500 rounded animate-pulse"></div>
//             <div className="w-1 h-10 bg-blue-500 rounded animate-pulse"></div>
//             <div className="w-1 h-7 bg-blue-500 rounded animate-pulse"></div>
//             <div className="w-1 h-12 bg-blue-500 rounded animate-pulse"></div>
//             <div className="w-1 h-8 bg-blue-500 rounded animate-pulse"></div>
//           </div>
//         )}
//     </div>
//   );
// }

import { useRef, useState } from "react";
import { Mic, PhoneOff } from "lucide-react";
import { sendVoiceToAI } from "../hooks/ai";

export default function VoicePanel({ ai }) {
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState("idle");

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const silenceTimerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  const conversationActiveRef = useRef(false);
  const processingRef = useRef(false);
  const speechDetectedRef = useRef(false);

  const NOISE_THRESHOLD = 12;
  const SILENCE_THRESHOLD = 6;
  const SILENCE_DURATION = 1500;

  //-----------------------------------
  // Start full conversation
  //-----------------------------------
  const startConversation = async () => {
    if (conversationActiveRef.current) return;

    console.log("Conversation Started");

    conversationActiveRef.current = true;
    setStatus("listening");

    await startListening();
  };

  //-----------------------------------
  // Stop full conversation
  //-----------------------------------
  const stopConversation = () => {
    console.log("Conversation Ended");

    conversationActiveRef.current = false;
    processingRef.current = false;
    speechDetectedRef.current = false;

    clearTimeout(silenceTimerRef.current);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    cleanupResources();

    setRecording(false);
    setStatus("idle");

    ai.setVoiceLoading(false);
  };

  //-----------------------------------
  // Cleanup
  //-----------------------------------
  const cleanupResources = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
  };

  //-----------------------------------
  // Start listening
  //-----------------------------------
  const startListening = async () => {
    try {
      if (
        !conversationActiveRef.current ||
        processingRef.current
      ) {
        return;
      }

      console.log("Listening for speech...");
      setStatus("listening");

      cleanupResources();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;

      const source =
        audioContext.createMediaStreamSource(stream);

      source.connect(analyser);

      waitForSpeech(stream);
    } catch (error) {
      console.error(error);
    }
  };

  //-----------------------------------
  // Wait until real human speech detected
  //-----------------------------------
  const waitForSpeech = (stream) => {
    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(
      analyser.frequencyBinCount
    );

    const detect = () => {
      if (!conversationActiveRef.current) return;

      analyser.getByteFrequencyData(dataArray);

      const volume =
        dataArray.reduce((a, b) => a + b, 0) /
        dataArray.length;

      if (volume > NOISE_THRESHOLD) {
        console.log("Human speech detected");

        startActualRecording(stream);
        return;
      }

      requestAnimationFrame(detect);
    };

    detect();
  };

  //-----------------------------------
  // Start actual recording
  //-----------------------------------
  const startActualRecording = (stream) => {
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    audioChunksRef.current = [];
    speechDetectedRef.current = true;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    recorder.onstop = async () => {
      await processRecording();
    };

    recorder.start();

    setRecording(true);
    setStatus("recording");

    detectSilence(recorder);
  };

  //-----------------------------------
  // Detect silence after speech
  //-----------------------------------
  const detectSilence = (recorder) => {
    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(
      analyser.frequencyBinCount
    );

    const monitor = () => {
      if (
        !conversationActiveRef.current ||
        recorder.state !== "recording"
      ) {
        return;
      }

      analyser.getByteFrequencyData(dataArray);

      const volume =
        dataArray.reduce((a, b) => a + b, 0) /
        dataArray.length;

      if (volume > SILENCE_THRESHOLD) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      if (volume < SILENCE_THRESHOLD) {
        if (!silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            if (recorder.state === "recording") {
              console.log("Silence detected → sending");
              recorder.stop();
            }
          }, SILENCE_DURATION);
        }
      }

      requestAnimationFrame(monitor);
    };

    monitor();
  };

  //-----------------------------------
  // Send to backend
  //-----------------------------------
  const processRecording = async () => {
    try {
      setRecording(false);
      setStatus("processing");

      processingRef.current = true;
      ai.setVoiceLoading(true);

      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      if (audioBlob.size === 0) {
        resetListening();
        return;
      }

      const file = new File(
        [audioBlob],
        "voice.webm",
        { type: "audio/webm" }
      );

      const token = localStorage.getItem("token");

      const res = await sendVoiceToAI(file, token);

      console.log(res);

      ai.setMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: res.transcription,
        },
        {
          role: "ai",
          text: res.response_text,
        },
      ]);

      ai.setAnalysis({
        mode: "voice",
        intent: res.intent || "Voice Query",
        confidence:
          (res.confidence || 0.9) * 100,
        response: res.response_text,
        transcription: res.transcription,
        latency: "1.8s",
        audioStatus: "Generated",
      });

      //-----------------------------------
      // Play AI audio
      //-----------------------------------
      if (res.audio_url) {
        setStatus("speaking");

        const audio = new Audio(
          `http://127.0.0.1:8000${res.audio_url}`
        );

        audio.play();

        audio.onended = async () => {
          console.log("AI finished speaking");

          resetListening();
        };
      } else {
        resetListening();
      }
    } catch (err) {
      console.error(err);
      resetListening();
    }
  };

  //-----------------------------------
  // Reset listening loop
  //-----------------------------------
  const resetListening = async () => {
    processingRef.current = false;
    ai.setVoiceLoading(false);

    if (conversationActiveRef.current) {
      await startListening();
    } else {
      setStatus("idle");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">

      {/* Main Button */}
      <button
        onClick={
          conversationActiveRef.current
            ? stopConversation
            : startConversation
        }
        className={`w-28 h-28 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${
          conversationActiveRef.current
            ? "bg-red-500 animate-pulse"
            : "bg-blue-600 hover:scale-105"
        }`}
      >
        {conversationActiveRef.current ? (
          <PhoneOff size={34} />
        ) : (
          <Mic size={34} />
        )}
      </button>

      {/* Status */}
      <p className="mt-5 text-gray-600 font-medium">
        {status === "idle" && "Start Voice Conversation"}
        {status === "listening" && "Listening for your voice..."}
        {status === "recording" && "Recording your speech..."}
        {status === "processing" && "Thinking..."}
        {status === "speaking" && "AI is speaking..."}
      </p>

      {/* Voice Wave */}
      {(recording || status === "speaking") && (
        <div className="mt-6 flex items-end gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-blue-500 rounded animate-pulse"
              style={{
                height: `${20 + i * 8}px`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}