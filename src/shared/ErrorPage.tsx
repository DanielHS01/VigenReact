import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-700 to-black text-white">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">LO SENTIMOS, PERO LA PÁGINA SOLICITADA NO SE HA ENCONTRADO.</p>
      <a 
        href="/" 
        className="px-6 py-3 bg-white text-cyan-700 rounded-full font-semibold hover:bg-teal-100 transition"
      >
        Ir a Inicio
      </a>
    </div>
  );
};

export default ErrorPage;