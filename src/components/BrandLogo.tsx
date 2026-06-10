import React from 'react';

export const BrandLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <img 
    src="https://i.postimg.cc/3xcLr6w5/logo.png" 
    alt="Pallas English - Ms Trang" 
    className={`${className} object-contain`} 
  />
);
