import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const choices = [
  { label: "話しかける", axis: "red", value: 60 },
  { label: "見渡す", axis: "green", value: 100 },
  { label: "考える", axis: "blue", value: 255 },
];

const lift = (v) => Math.max(0, v);

function applyColorDelta([r, g, b], axis, value) {
  if (axis === "red") return [lift(r + value), g, b];
  if (axis === "green") return [r, lift(g + value), b];
  if (axis === "blue") return [r, g, lift(b + value)];
  return [r, g, b];
}

function rgbToCSS([r, g, b]) {
  return `rgb(${Math.min(r,255)}, ${Math.min(g,255)}, ${Math.min(b,255)})`;
}

function EmotionColorUI() {
  const [emotionColor, setEmotionColor] = useState([127, 127, 255]);
  const [logs, setLogs] = useState([]);

  const handleChoice = (choice) => {
    const newColor = applyColorDelta(emotionColor, choice.axis, Math.floor(choice.value / 5));
    setEmotionColor(newColor);
    setLogs((prev) => [
      `あなたは「${choice.label}」を選びました。現在の心の色: RGB(${newColor.join(", ")})`,
      ...prev
    ]);
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="text-center font-bold text-lg">あなたの「心の色」</div>
      <div className="w-full h-16 rounded-xl" style={{ backgroundColor: rgbToCSS(emotionColor) }}></div>

      <div className="space-y-2">
        {choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(choice)}
            className="w-full py-2 rounded-xl shadow text-white font-semibold"
            style={{ backgroundColor: rgbToCSS(applyColorDelta([0, 0, 0], choice.axis, choice.value)) }}
          >
            {choice.label}
          </button>
        ))}
      </div>

      <div className="mt-4 bg-gray-100 p-2 rounded-xl max-h-48 overflow-y-auto text-sm">
        {logs.map((log, idx) => (
          <div key={idx} className="mb-1">{log}</div>
        ))}
      </div>
    </div>
  );
}

export default EmotionColorUI;
