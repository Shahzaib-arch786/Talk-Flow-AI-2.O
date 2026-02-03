export default function TrustedLogos() {
  return (
    <div className="text-center py-10 opacity-60">
      <p className="text-sm tracking-widest mb-4">
        TRUSTED BY INDUSTRY LEADERS
      </p>

      <div className="flex justify-center gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="w-24 h-10 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}