import React from "react";

export const BlueTextDecorator = (props: any) => (
  <span
    style={{
      color: "#3B82F6", // Blue color
      fontWeight: "bold", // Changed to bold to match frontend
      backgroundColor: "#EBF8FF", // Light blue background
      padding: "2px 4px",
      borderRadius: "3px",
      border: "1px solid #3B82F6",
      display: "inline-block", // Ensure proper display
    }}
  >
    {props.children}
  </span>
);
