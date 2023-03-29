import { useState, useEffect, useRef } from "react";

export default function Circle(props) {
  const { percent, color } = props;
  const circleRef = useRef(null);
  const [radius, setRadius] = useState(0);
  const [circumference, setCircumference] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (circleRef.current) {
      setRadius(circleRef.current.r.baseVal.value);
      setCircumference(2 * Math.PI * circleRef.current.r.baseVal.value);
    }
  }, [circleRef]);

  useEffect(() => {
    setOffset(circumference - (percent / 100) * circumference);
  }, [circumference, percent]);

  return (
    <svg className="progress-ring" width="410" height="410">
      <circle
        ref={circleRef}
        className="progress-ring__circle"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        cx="205"
        cy="205"
        r="165"
        fill="transparent"
      />
    </svg>
  );
}
