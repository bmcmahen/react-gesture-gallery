import * as React from "react";

interface IndicatorsProps {
  count: number;
  index: number;
  visible: boolean;
}

export function Indicators({ count, index, visible }: IndicatorsProps) {
  return (
    <div
      className="Gallery__Indicators"
      style={{
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        position: "absolute",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)"
      }}
    >
      {Array.from(new Array(count)).map((_v, i) => {
        return (
          <div
            key={i}
            style={{
              width: "7px",
              height: "7px",
              margin: "4px",
              borderRadius: "50%",
              background: i === index ? "white" : "#95918e",
              transition: "background 0.2s ease"
            }}
          />
        );
      })}
    </div>
  );
}
