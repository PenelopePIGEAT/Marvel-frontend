const JarvisIcon = ({ isHover, isLoggedIn }) => {
  const mainColor = isLoggedIn ? "#e62429" : "#00f6ff";
  const hoverColor = isLoggedIn ? "#e62429" : "#00f6ff";

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: isHover ? "scale(1.08)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}
    >
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke={mainColor}
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r="12"
        stroke={hoverColor}
        strokeWidth="1.5"
        fill={isHover ? hoverColor : "transparent"}
      />
      <circle cx="32" cy="32" r="4" fill={mainColor} />
    </svg>
  );
};

export default JarvisIcon;
