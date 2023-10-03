import React, { useState } from "react";
import { css } from "@/styled-system/css";

const buttonStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "240px",
  height: "48px",
  borderRadius: "50px",
  backgroundColor: "rgb(245, 205, 0)",
  color: "rgb(0, 0, 0)",
  fontWeight: "700",
  padding: "0.25em 1em",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:active": {
    transitionDuration: "0.05s",
    boxShadow: "0 0 0.2em #0003",
    transform: "scale(0.95)",
    filter: "brightness(0.9) contrast(1.2)",
  },
  "&::before": {
    content: "'🐼'",
    display: "inline-block",
    paddingRight: "0.5em",
  },
  "@media screen and (max-width: 360px)": {
    "&::before": {
      content: "'🐱'",
    },
  },
});

const PandaButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      className={isActive ? `${buttonStyles} active` : buttonStyles}
      onClick={handleClick}
    >
      Click me
    </button>
  );
};

export default PandaButton;
