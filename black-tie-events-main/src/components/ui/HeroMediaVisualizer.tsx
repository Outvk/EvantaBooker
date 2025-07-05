import React from "react";

interface HeroMediaVisualizerProps {
  imageUrl: string;
  videoUrl: string;
  onOpenVideo: () => void;
}

/**
 * A visually rich hero media visualizer for the home page hero section.
 * Features soft dark blurry background, smooth transitions, and focus on the hero image/video.
 */
export const HeroMediaVisualizer: React.FC<HeroMediaVisualizerProps> = ({ imageUrl, videoUrl, onOpenVideo }) => {
  return (
    <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px] w-full">
      {/* Blurry dark background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(120deg, rgba(24,28,38,0.85) 60%, rgba(44,54,82,0.8)), url('${imageUrl}') center/cover no-repeat`,
          filter: 'blur(16px) saturate(1.3)',
          opacity: 0.95,
        }}
      />
      {/* Foreground card with soft glass effect */}
      <div className="relative z-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 max-w-lg w-full p-6 md:p-12 flex flex-col items-center">
        {/* Hero Image */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden relative group cursor-pointer bg-black/70" onClick={onOpenVideo}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Hero Preview"
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:blur-[2px] group-hover:opacity-60"
              style={{ zIndex: 1 }}
            />
          )}
          {/* Play overlay for video */}
          {videoUrl && (
            <button
              className="absolute inset-0 flex items-center justify-center z-10 w-full h-full bg-black/20 group-hover:bg-black/30 transition"
              aria-label="Play Hero Video"
              type="button"
              tabIndex={-1}
            >
              <svg className="h-16 w-16 text-white/80 group-hover:text-white" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                <circle cx="24" cy="24" r="22" strokeWidth="3" className="opacity-40" />
                <polygon points="20,16 36,24 20,32" fill="currentColor" className="opacity-90" />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-6 text-center">
          <div className="text-2xl md:text-3xl font-bold text-white drop-shadow mb-2">Experience Your Next Event</div>
          <div className="text-base md:text-lg text-white/80">Stunning visuals, immersive video, and a modern event vibe — all in one place.</div>
        </div>
      </div>
    </div>
  );
};
