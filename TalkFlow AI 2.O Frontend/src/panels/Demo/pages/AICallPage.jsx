import CallNavbar from "../components/CallNavbar";
import SpeakButton from "../components/SpeakButton";
import STTPanel from "../components/STTPanel";
import NLPPanel from "../components/NLPPanel";
import TTSPanel from "../components/TTSPanel";
import FooterNote from "../components/FooterNote";

export default function AICallPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CallNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

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