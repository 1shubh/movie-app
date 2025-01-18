import React from "react";

const CircularProgress = ({
  percentage,
  size = 80,
  strokeWidth = 8,
  backgroundColor = "#f3f3f3", // Background color
  progressColor = "#4caf50", // Progress bar color
  textColor = "#ffff", // Text color
}) => {
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (percentage / 100) * circumference; // Offset for the progress

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "black", // Background color for the container
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
        />
        {/* Foreground Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
      {/* Percentage Label */}
      <span
        style={{
          position: "absolute",
          color: textColor,
          fontSize: `${size / 5}px`, // Dynamic font size
          fontWeight: "bold",
        }}
      >
        {percentage}%
      </span>
    </div>
  );
};

export default CircularProgress;
