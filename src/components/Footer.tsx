import React from 'react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => (
  <footer className="bg-brand-red-dark text-white py-10 sm:py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-1 bg-white rounded-2xl border-4 border-brand-gold">
              <BrandLogo className="w-16 h-16" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-brand-gold uppercase tracking-tight">Pallas English</h3>
            <p className="text-slate-300 font-serif italic text-sm mt-1">"Xây nền từ móng, chinh phục đỉnh cao"</p>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">Pallas – nơi tri thức được trao truyền, ước mơ được nuôi dưỡng và những thế hệ học sinh được chắp cánh vươn xa.</p>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h4 className="text-brand-gold font-black uppercase tracking-[0.2em] relative inline-block">
            LIÊN HỆ
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-white/10" />
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 group">
              <span className="text-brand-red mt-1">📍</span>
              <div className="text-sm font-black group-hover:text-brand-gold transition-colors cursor-pointer">
                <div>CS1: SN 31 ngõ 77 Nguyễn Trãi, Phường Kinh Môn, TP Hải Phòng</div>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <span className="text-brand-red mt-1">📍</span>
              <div className="text-sm font-black group-hover:text-brand-gold transition-colors cursor-pointer">
                <div>CS2: SN 347 Đường Vũ Mạnh Hùng, Phường Nhị Chiểu, TP Hải Phòng</div>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <span className="text-brand-red mt-1">📞</span>
              <span className="text-sm font-black group-hover:text-brand-gold transition-colors cursor-pointer">Ms Trang: 0979.2222.10</span>
            </li>
            <li className="flex items-start gap-3 group">
              <span className="text-brand-red mt-1">🌐</span>
              <a href="https://www.facebook.com/profile.php?id=61572690107644" target="_blank" rel="noopener noreferrer" className="text-sm font-black group-hover:text-brand-gold transition-colors cursor-pointer underline decoration-1 underline-offset-2">
                Fanpage Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* Slogan */}
        <div className="space-y-6">
          <h4 className="text-brand-gold font-black uppercase tracking-[0.2em] relative inline-block">
            SLOGAN
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-white/10" />
          </h4>
          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4">
            <p className="text-lg font-serif italic text-white font-bold leading-relaxed">
              "Xây nền từ móng, chinh phục đỉnh cao"
            </p>
            <div className="h-0.5 bg-white/10 w-full" />
            <p className="text-base font-black text-brand-red uppercase tracking-widest text-[13px]">
              PALLAS ENGLISH - MS TRANG
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
