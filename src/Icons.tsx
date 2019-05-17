import * as React from "react";

export const ArrowRight = () => (
  <svg
    style={{
      marginLeft: "2px",
      marginTop: "2px"
    }}
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const ArrowLeft = () => (
  <svg
    style={{
      marginRight: "2px",
      marginTop: "2px"
    }}
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
