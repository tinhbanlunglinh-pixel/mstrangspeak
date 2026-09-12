import React, { useState } from 'react';
import { Zap, ChevronRight, ChevronLeft, Copy, Check, ExternalLink, KeyRound } from 'lucide-react';

interface ApiKeyModalProps {
  show: boolean;
  currentApiKey: string;
  onSave: (key: string) => void;
  onClose: () => void;
  hasEnvKey?: boolean;
}

const CLOUD_CONSOLE_URL = 'https://console.cloud.google.com/projectcreate';
const AI_STUDIO_URL = 'https://aistudio.google.com/api-keys';


export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ show, currentApiKey, onSave, onClose, hasEnvKey }) => {
  const [localKey, setLocalKey] = useState(currentApiKey);
  const [step, setStep] = useState(1); // 1 = tạo project, 2 = lấy key, 3 = nhập key
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [keyVisible, setKeyVisible] = useState(false);

  React.useEffect(() => {
    if (show) {
      setLocalKey(currentApiKey);
      // Nếu đã có key rồi thì vào thẳng bước nhập
      setStep(currentApiKey ? 3 : 1);
    }
  }, [show, currentApiKey]);

  const handleSave = () => {
    const trimmedKey = localKey.trim();
    if (!trimmedKey) return;
    onSave(trimmedKey);
  };

  const handleCopy = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 3000);
      })
      .catch(() => {
        prompt('Copy link này và mở trong tab mới:', url);
      });
  };

  const steps = [
    { id: 1, label: 'Tạo Project', emoji: '☁️' },
    { id: 2, label: 'Lấy Key', emoji: '🔑' },
    { id: 3, label: 'Nhập Key', emoji: '✅' },
  ];

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => { if (currentApiKey || hasEnvKey) onClose(); }}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl border-4 border-red-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-brand-red px-6 pt-6 pb-4 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap size={30} className="text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
            Cài đặt API Key
          </h2>
          <p className="text-white/80 text-xs mt-1">Miễn phí · Không giới hạn · Chỉ mất 2 phút</p>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {steps.map((s, i) => (
              <React.Fragment key={s.id}>
                <button
                  onClick={(e) => { e.stopPropagation(); setStep(s.id); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    step === s.id
                      ? 'bg-white text-brand-red shadow-md'
                      : step > s.id
                      ? 'bg-white/30 text-white'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  <span>{s.emoji}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{s.id}</span>
                </button>
                {i < steps.length - 1 && (
                  <ChevronRight size={14} className="text-white/40" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

            {/* Content */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* ── BƯỚC 1: Tạo Google Cloud Project ── */}
                {step === 1 && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-200">
                    <div className="flex items-start gap-3 p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl">
                      <span className="text-2xl shrink-0">⚠️</span>
                      <div>
                        <p className="font-black text-amber-900 text-sm">Bước bắt buộc — Tạo Google Cloud Project</p>
                        <p className="text-amber-800 text-xs mt-1 leading-relaxed">
                          Nếu thấy <strong>"Hiện không có dự án đám mây nào khả dụng"</strong> khi tạo key,
                          bạn cần tạo Project trước. Chỉ làm 1 lần duy nhất!
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { num: '1', text: 'Nhấn nút xanh bên dưới để mở Google Cloud Console' },
                        { num: '2', text: 'Đăng nhập bằng tài khoản Google của bạn' },
                        { num: '3', text: 'Đặt tên project (ví dụ: "Pallas English") rồi nhấn CREATE' },
                        { num: '4', text: 'Đợi ~10 giây cho đến khi tạo xong → sang Bước 2' },
                      ].map(item => (
                        <div key={item.num} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-brand-red text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{item.num}</div>
                          <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA link */}
                    <a
                      href={CLOUD_CONSOLE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white rounded-2xl font-black text-sm shadow-md transition-all"
                    >
                      <ExternalLink size={16} />
                      Mở Google Cloud Console → Tạo Project
                    </a>

                    {/* Copy link fallback */}
                    <button
                      type="button"
                      onClick={(e) => handleCopy(CLOUD_CONSOLE_URL, e)}
                      className="flex items-center justify-center gap-2 w-full py-2 text-slate-400 hover:text-slate-600 text-xs font-semibold transition-all"
                    >
                      {copiedUrl === CLOUD_CONSOLE_URL
                        ? <><Check size={13} className="text-green-500" /> Đã copy! Dán vào thanh địa chỉ trình duyệt</>
                        : <><Copy size={13} /> Trình duyệt chặn? Nhấn đây để copy link</>
                      }
                    </button>
                  </div>
                )}

                {/* ── BƯỚC 2: Lấy API Key từ AI Studio ── */}
                {step === 2 && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-200">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl">
                      <span className="text-2xl shrink-0">🔑</span>
                      <div>
                        <p className="font-black text-blue-900 text-sm">Lấy API Key từ Google AI Studio</p>
                        <p className="text-blue-700 text-xs mt-1 leading-relaxed">
                          Đã có Project rồi? Làm bước này để lấy key miễn phí.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { num: '1', text: 'Nhấn nút xanh bên dưới → mở Google AI Studio' },
                        { num: '2', text: 'Đăng nhập bằng CÙNG tài khoản Google vừa tạo Project' },
                        { num: '3', text: 'Nhấn "Create API Key" → chọn Project vừa tạo' },
                        { num: '4', text: 'Copy toàn bộ dãy key (bắt đầu bằng AIzaSy...)' },
                        { num: '5', text: 'Quay lại đây, nhấn "Bước 3" và dán key vào' },
                      ].map(item => (
                        <div key={item.num} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{item.num}</div>
                          <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>

                    <a
                      href={AI_STUDIO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl font-black text-sm shadow-md transition-all"
                    >
                      <ExternalLink size={16} />
                      Mở Google AI Studio → Tạo API Key
                    </a>

                    <button
                      type="button"
                      onClick={(e) => handleCopy(AI_STUDIO_URL, e)}
                      className="flex items-center justify-center gap-2 w-full py-2 text-slate-400 hover:text-slate-600 text-xs font-semibold transition-all"
                    >
                      {copiedUrl === AI_STUDIO_URL
                        ? <><Check size={13} className="text-green-500" /> Đã copy! Dán vào thanh địa chỉ trình duyệt</>
                        : <><Copy size={13} /> Trình duyệt chặn? Nhấn đây để copy link</>
                      }
                    </button>
                  </div>
                )}

                {/* ── BƯỚC 3: Nhập API Key ── */}
                {step === 3 && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-200">
                    <div className="flex items-start gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-2xl">
                      <span className="text-2xl shrink-0">✅</span>
                      <div>
                        <p className="font-black text-green-900 text-sm">Đã có API Key? Dán vào đây!</p>
                        <p className="text-green-700 text-xs mt-1">Key trông như thế này: <span className="font-mono bg-green-100 px-1 rounded">AIzaSyB...</span></p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-brand-red uppercase tracking-widest block px-1">
                        <KeyRound size={12} className="inline mr-1" />
                        Nhập API Key của bạn
                      </label>
                      <div className="relative">
                        <input
                          type={keyVisible ? 'text' : 'password'}
                          placeholder="AIzaSyB..."
                          value={localKey}
                          onChange={(e) => setLocalKey(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
                          className="w-full px-4 pr-12 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red transition-all font-mono text-sm"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setKeyVisible(v => !v); }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold px-1"
                        >
                          {keyVisible ? '🙈' : '👁️'}
                        </button>
                      </div>
                      {localKey && !localKey.trim().startsWith('AIza') && (
                        <p className="text-xs text-amber-600 font-semibold px-1">
                          ⚠️ Key hợp lệ thường bắt đầu bằng "AIzaSy..." — kiểm tra lại nhé
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleSave}
                      disabled={!localKey.trim()}
                      className="w-full py-4 bg-brand-red hover:bg-brand-red-dark text-white rounded-2xl font-black shadow-lg shadow-red-100 transition-all active:scale-[0.98] uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      🚀 Lưu và Bắt đầu học!
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      Chưa có key?{' '}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setStep(1); }}
                        className="text-brand-red font-bold underline underline-offset-2"
                      >
                        Xem hướng dẫn lấy key từ đầu
                      </button>
                    </p>
                  </div>
                )}
            </div>

            {/* Footer navigation */}
            <div className="px-5 sm:px-6 pb-5 flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setStep(s => s - 1); }}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-600 font-bold text-xs transition-all"
                >
                  <ChevronLeft size={14} /> Quay lại
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                {(currentApiKey || hasEnvKey) && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="text-slate-400 hover:text-slate-600 font-bold text-xs px-3 py-2 rounded-xl transition-all"
                  >
                    Bỏ qua
                  </button>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setStep(s => s + 1); }}
                    className="flex items-center gap-1 bg-brand-red text-white font-black text-xs px-4 py-2 rounded-xl shadow-sm hover:bg-brand-red-dark transition-all active:scale-95"
                  >
                    {step === 1 ? 'Đã tạo Project →' : 'Đã có Key →'}
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

  );
};
