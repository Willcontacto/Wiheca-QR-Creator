import React, { useState } from 'react';

const qrColors = ['#000000','#1D4ED8','#7C3AED','#22C55E','#EF4444','#F59E0B'];
const bgColors = ['#FFFFFF','#F5F3FF','#FEF3C7','#DBEAFE','#DCFCE7','#F8FAFC'];

export default function QRGeneratorApp() {
  // ✅ FIX 1: eliminado el useState duplicado de 'text'
  const [text, setText] = useState('');
  const [generatedText, setGeneratedText] = useState('https://example.com');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [isExpanded, setIsExpanded] = useState(false);
  const [customQrColor, setCustomQrColor] = useState('#000000');
  const [customBgColor, setCustomBgColor] = useState('#FFFFFF');
  const [showQrPicker, setShowQrPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [glowing, setGlowing] = useState(false);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(generatedText)}&color=${color.replace('#','')}&bgcolor=${bgColor.replace('#','')}&margin=20`;

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  const handleGenerate = () => {
    setGeneratedText(text);
    setGlowing(true);
    setTimeout(() => setGlowing(false), 1200);
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(520, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    o.start(ctx.currentTime);
    o.stop(ctx.currentTime + 0.6);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Panel izquierdo */}
        <div className="rounded-3xl shadow-xl bg-white p-8 flex flex-col gap-6">
          <div>
  <p className="text-xs font-semibold tracking-widest text-violet-500 uppercase mb-3">Wiheca</p>
  <div className="flex items-center gap-4">
    <div className="w-14 h-14 rounded-2xl bg-violet-500 flex items-center justify-center text-2xl shadow-md">
      🔳
    </div>
    <div>
      <h1 className="text-3xl font-bold text-slate-900">QR Creator</h1>
      <p className="text-slate-500 text-sm mt-0.5">Crea códigos QR personalizados al instante ✨</p>
    </div>
  </div>
</div>

          {/* Input */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 h-14">
              <span className="text-slate-400 text-lg">🔗</span>
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-base text-slate-800"
                placeholder="https://example.com"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <p className="text-sm text-slate-400">Ingresa la URL o texto que quieres convertir en QR</p>
          </div>

          {/* Botón generar */}
          <button
            onClick={handleGenerate}
            className="w-full h-14 rounded-2xl text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white transition">
            ✨ Generar QR
          </button>

          {/* Personalización */}
          <div className="space-y-5 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Personalización</h2>

            <div>
              <p className="font-medium text-slate-700 mb-3">Color del QR</p>
              <div className="flex gap-3 flex-wrap">
                {qrColors.map((item) => (
                  <button key={item} onClick={() => setColor(item)}
                    className={`w-12 h-12 rounded-2xl border-2 transition-transform ${color === item ? 'border-violet-500 scale-110' : 'border-slate-200'}`}
                    style={{ backgroundColor: item }} />
                ))}
                <button onClick={() => setShowQrPicker(true)}
                  className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-300 text-white text-xl font-bold flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#ff4d4f,#faad14,#52c41a,#1677ff,#722ed1)' }}>+</button>
              </div>
            </div>

            <div>
              <p className="font-medium text-slate-700 mb-3">Color del fondo</p>
              <div className="flex gap-3 flex-wrap">
                {bgColors.map((item) => (
                  <button key={item} onClick={() => setBgColor(item)}
                    className={`w-12 h-12 rounded-2xl border-2 transition-transform ${bgColor === item ? 'border-violet-500 scale-110' : 'border-slate-200'}`}
                    style={{ backgroundColor: item }} />
                ))}
                <button onClick={() => setShowBgPicker(true)}
                  className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-300 text-white text-xl font-bold flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#ff4d4f,#faad14,#52c41a,#1677ff,#722ed1)' }}>+</button>
              </div>
            </div>
          </div>

          {/* Botón descargar */}
          <button onClick={downloadQR}
            className="w-full h-14 rounded-2xl text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white transition">
            ⬇ Descargar QR
          </button>
        </div>

        {/* Panel derecho */}
        <div className="rounded-3xl shadow-xl bg-white p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Vista previa</h2>
              <p className="text-slate-500 text-sm">Escanea para probar tu código QR</p>
            </div>
            <button onClick={() => setIsExpanded(true)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition text-sm font-medium">
              Ampliar
            </button>
          </div>
          <div className="flex-1 bg-white border border-slate-100 rounded-3xl shadow-inner flex items-center justify-center min-h-[500px]">
            {/* ✅ FIX 2: tag <img> correctamente cerrado con /> */}
            <img
              src={qrUrl}
              alt="QR Code"
              onClick={() => setIsExpanded(true)}
              className={`w-80 h-80 cursor-pointer transition hover:scale-105 rounded-xl ${glowing ? 'ring-4 ring-violet-400 ring-offset-4 shadow-[0_0_30px_rgba(139,92,246,0.6)]' : ''}`}
            />
          </div>
          <p className="text-center text-slate-400 text-sm mt-4">💡 Tip: Haz clic en el código QR para verlo en grande</p>
        </div>
      </div>

      {isExpanded && (
        <div onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-white/20 backdrop-blur-xl flex items-center justify-center z-50">
          <img src={qrUrl} alt="QR expandido" className="w-[40vw] max-w-xl rounded-3xl shadow-2xl" />
        </div>
      )}

      {showQrPicker && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-4 w-80">
            <h3 className="text-xl font-bold">Color personalizado QR</h3>
            <input type="color" value={customQrColor}
              onChange={(e) => { setCustomQrColor(e.target.value); setColor(e.target.value); }}
              className="w-full h-20 rounded-2xl cursor-pointer" />
            <button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
              onClick={() => setShowQrPicker(false)}>Listo</button>
          </div>
        </div>
      )}

      {showBgPicker && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-4 w-80">
            <h3 className="text-xl font-bold">Color personalizado Fondo</h3>
            <input type="color" value={customBgColor}
              onChange={(e) => { setCustomBgColor(e.target.value); setBgColor(e.target.value); }}
              className="w-full h-20 rounded-2xl cursor-pointer" />
            <button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
              onClick={() => setShowBgPicker(false)}>Listo</button>
          </div>
        </div>
      )}
    </div>
  );
}
