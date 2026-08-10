'use client';

import React from 'react';
import ReactH5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
}

export default function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Pronunciacion
      </h3>
      <ReactH5AudioPlayer
        src={audioUrl}
        showSkipControls={false}
        showJumpControls={false}
        layout="horizontal-reverse"
      />
    </div>
  );
}
