import React from 'react';

const VideoShowcase = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Tailoring Process Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video 1 */}
        <div className="w-full aspect-video">
          <video
            className="w-full h-full rounded-lg shadow-lg"
            controls
            autoPlay
            loop
            muted
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video 2 */}
        <div className="w-full aspect-video">
          <video
            className="w-full h-full rounded-lg shadow-lg"
            controls
            autoPlay
            loop
            muted
          >
            <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoShowcase;
