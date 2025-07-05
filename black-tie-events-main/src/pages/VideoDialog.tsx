import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
}

export const VideoDialog: React.FC<VideoDialogProps> = ({ open, onOpenChange, videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-2xl overflow-hidden p-0 bg-white/40 shadow-2xl backdrop-blur-xl border border-white/30">
        <DialogHeader className="px-8 pt-8 pb-2">
          <DialogTitle className="text-2xl font-bold text-gray-900">Event Video</DialogTitle>
          <DialogDescription className="text-base text-gray-600">Enjoy the event preview!</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center px-8 pb-6">
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full rounded-xl border border-gray-200"
              style={{ background: 'black' }}
            />
          </div>
        </div>
        <div className="flex justify-end px-8 pb-8">
          <DialogClose asChild>
            <Button variant="default" className="rounded-full px-6 py-2 text-base font-semibold shadow-lg bg-primary text-white hover:bg-primary/90 transition">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
