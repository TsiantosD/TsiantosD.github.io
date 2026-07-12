export const GradeCircle = ({ grade }: { grade: number }) => {
  const strokeWidth = 6;
  // Shrink radius so (radius * 2) + strokeWidth <= 64
  // 28 * 2 + 6 = 62. This leaves a 1px safety margin on all sides.
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.round((grade / 10) * 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      <svg 
        viewBox="0 0 64 64" // Explicitly define the coordinate space
        className="w-full h-full transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-neutral-500 dark:text-neutral-400"
        />
        {/* Progress Circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth+1}
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          className="text-slate-100 dark:text-slate-800 transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Grade Text in Center */}
      <div className="absolute flex items-center justify-center">
        <span className="text-lg font-bold leading-none">{percentage}%</span>
      </div>
    </div>
  );
};