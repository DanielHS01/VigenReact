import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-50 text-white">
      <div className="w-16 h-16 border-4 border-cyan-950 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-xl">Cargando...</p>
    </div>
  );
};

export default Loading;