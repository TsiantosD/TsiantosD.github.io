export const GradeCircle = ({ grade }: { grade: number }) => {
  const strokeWidth = 6;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.round((grade / 10) * 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-slate-950 shadow-lg shadow-emerald-950/20" />
      <svg
        viewBox="0 0 64 64"
        className="relative h-full w-full -rotate-90 transform"
      >
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-800"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth + 1}
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          className="text-emerald-300 transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex items-center justify-center">
        <span className="text-lg font-black leading-none text-white">{percentage}%</span>
      </div>
    </div>
  );
};
