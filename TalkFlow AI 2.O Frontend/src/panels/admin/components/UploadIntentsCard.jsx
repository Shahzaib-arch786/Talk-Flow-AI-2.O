import { FileUp, Info } from "lucide-react";

export default function UploadIntentsCard() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 mb-8">
      
      <div className="border-2 border-dashed rounded-xl p-8 text-center">
        <div className="mx-auto w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full mb-4">
          <FileUp />
        </div>

        <h3 className="font-semibold text-lg">
          Upload Intents
        </h3>

        <p className="text-gray-600 text-sm mt-1">
          Drag and drop your YAML file here or click to browse.  
          Supported formats: <b>.yaml</b>, <b>.yml</b>
        </p>

        <button className="mt-4 bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
          Select File
        </button>
      </div>

      <div className="flex items-start gap-3 bg-blue-50 text-blue-700 p-4 rounded-xl mt-6 text-sm">
        <Info size={18} className="mt-0.5" />
        <p>
          <b>Smart Sync Enabled.</b> AI retrains automatically after upload.
          Changes typically reflect within 60 seconds.
        </p>
      </div>

    </div>
  );
}
