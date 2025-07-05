import React, { useEffect, useState } from "react";

export interface HeroHistoryItem {
  type: "image" | "video";
  url: string;
  savedAt: string; // ISO date
}

interface HistoriqueTabProps {
  heroHistory?: HeroHistoryItem[];
}

export const HistoriqueTab: React.FC<HistoriqueTabProps> = ({ heroHistory = [] }) => {
  const [history, setHistory] = useState<HeroHistoryItem[]>(heroHistory);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  useEffect(() => {
    const stored = localStorage.getItem("heroHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, [heroHistory]);

  const filtered = filter === 'all' ? history : history.filter(h => h.type === filter);

  const handleDelete = (idx: number) => {
    const updated = history.filter((_, i) => i !== idx);
    setHistory(updated);
    localStorage.setItem("heroHistory", JSON.stringify(updated));
  };

  const handleRestore = (item: HeroHistoryItem) => {
    if (item.type === 'image') {
      localStorage.setItem('heroImageUrl', item.url);
    } else {
      localStorage.setItem('heroVideoUrl', item.url);
    }
    // Optionally: reload page or trigger parent update
    window.location.reload();
  };


  useEffect(() => {
    // Always sync with localStorage in case of changes
    const stored = localStorage.getItem("heroHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, [heroHistory]);

  if (!history.length) {
    return <div className="text-gray-500 text-center py-12">No historique yet.</div>;
  }

  return (
    <div>
      <div className="flex gap-2 mb-4 justify-end">
        <button
          className={`px-3 py-1 rounded ${filter==='all' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >All</button>
        <button
          className={`px-3 py-1 rounded ${filter==='image' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('image')}
        >Images</button>
        <button
          className={`px-3 py-1 rounded ${filter==='video' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('video')}
        >Videos</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {filtered.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow border p-4 flex flex-col items-center">
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={`Hero historique img #${i+1}`}
                className="w-full h-40 object-contain rounded mb-2 border"
                onError={e => (e.currentTarget.src = 'https://via.placeholder.com/200x160?text=No+Image')}
              />
            ) : (
              <video
                src={item.url}
                controls
                className="w-full h-40 object-contain rounded mb-2 border bg-black"
                onError={e => (e.currentTarget.poster = 'https://via.placeholder.com/200x160?text=No+Video')}
              >
                Sorry, your browser does not support embedded videos.
              </video>
            )}
            <div className="text-xs text-gray-500 mt-2">{item.type === "image" ? "Image" : "Video"} • Saved {new Date(item.savedAt).toLocaleString()}</div>
            <div className="break-all text-xs text-gray-400 mt-1">{item.url}</div>
            <div className="flex gap-2 mt-3">
              <button
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                onClick={() => handleRestore(item)}
              >Restore</button>
              <button
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                onClick={() => handleDelete(history.indexOf(item))}
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
