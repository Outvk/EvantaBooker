import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

interface HeroVideoControlProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onShowPreview: () => void;
}

export const HeroVideoControl: React.FC<HeroVideoControlProps> = ({ value, onChange, onSave, onShowPreview }) => {
  const [status, setStatus] = useState<string>("");

  const handleSave = () => {
    if (!value) {
      setStatus("Please enter a valid video URL.");
      return;
    }
    onSave();
    setStatus("Hero video updated!");
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2 mb-2">
        <Input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="e.g. https://...mp4"
        />
        <label className="cursor-pointer px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs">
          Upload
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                onChange(url);
              }
            }}
          />
        </label>
      </div>
      <div className="flex flex-row gap-2">
        <Button onClick={handleSave} className="w-fit">Save Video</Button>
        <Button variant="ghost" className="text-xs text-blue-600" onClick={onShowPreview}>Show Preview</Button>
      </div>
      {status && <span className="text-green-600 text-sm mt-1 block">{status}</span>}
    </div>
  );
};
