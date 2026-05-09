import React, { useState } from 'react';

const qrColors = ['#000000', '#1D4ED8', '#7C3AED', '#22C55E', '#EF4444', '#F59E0B'];
const bgColors = ['#FFFFFF', '#F5F3FF', '#FEF3C7', '#DBEAFE', '#DCFCE7', '#F8FAFC'];

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? 'bg-violet-600' : 'bg-slate-200'}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}

export default function QRGeneratorApp() {
  const [text, setText] = useState('https://example.com');
  const [generatedText, setGeneratedText] = useState('https://example.com');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [isExpanded, setIsExpanded] = useState(false);
  const [customQrColor, setCustomQrColor] = useState('#000000');
  const [customBgColor, setCustomBgColor] = useState('#FFFFFF');
  const [showQrPicker, setShowQrPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [highQuality, setHighQuality] = useState(true);
  const [margin, setMargin] = useState(true);

  const size = highQuality ? 600 : 320;
  const marginValue = margin ? 20 : 0;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(generatedText)}&color=${color.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}&margin=${marginValue}`;

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qr-code.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0eeff] to-[#f8fafc] p-6 md:p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">

        {/* Panel izquierdo */}
        <div className="rounded-3xl shadow-xl bg-white p-8 space-y-7">

          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center text-2xl shadow">
              🔳
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">QR Creator</h1>
              <p className="text-slate-500 text-sm">Crea códigos QR personalizados al instante ✨</p>
            </div>
          </div>

          {/* Input contenido */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-900">Contenido</label>
            <div className="flex items-center border border-slate-200 rounded-2xl px-4 h-14 gap-3 focus-within:ring-2 focus-within:ring-violet-400 bg-[#faf8ff]">
              <span className="text-violet-400 text-lg">🔗</span>
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-base text-slate-800"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <p className="text-sm text-slate-400">Ingresa la URL o texto que quieres convertir en QR</p>
          </div>

          {/* Botón generar */}
          <button
            onClick={() => setGeneratedText(text)}
            className="w-full h-14 rounded-2xl text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white transition flex items-center justify-center gap-2"
          >
            ✨ Generar QR
          </button>

          {/* Personalización */}
          <div className="space-y-5 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Personalización</h2>

            <div>
              <p className="font-medium text-slate-700 mb-3">Color del QR</p>
              <div className="flex gap-3 flex-wrap">
                {qrColors.map((item) => (
                  <button
                    key={item}
                    onClick={() => setColor(item)}
                    className={`w-12 h-12 rounded-2xl border-2 transition-transform ${color === item ? 'border-violet-500 scale-110' : 'border-slate-200'}`}
                    style={{ backgroundColor: item }}
                  />
                ))}
                <button
                  onClick={() => setShowQrPicker(true)}
                  className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-300 text-white text-xl font-bold flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #ff4d4f, #faad14, #52c41a, #1677ff, #722ed1)' }}
                >+</button>
              </div>
            </div>

            <div>
              <p className="font-medium text-slate-700 mb-3">Color del fondo</p>
              <div className="flex gap-3 flex-wrap">
                {bgColors.map((item) => (
                  <button
                    key={item}
                    onClick={() => setBgColor(item)}
                    className={`w-12 h-12 rounded-2xl border-2 transition-transform ${bgColor === item ? 'border-violet-500 scale-110' : 'border-slate-200'}`}
                    style={{ backgroundColor: item }}
                  />
                ))}
                <button
                  onClick={() => setShowBgPicker(true)}
                  className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-300 text-white text-xl font-bold flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #ff4d4f, #faad14, #52c41a, #1677ff, #722ed1)' }}
                >+</button>
              </div>
            </div>
          </div>

          {/* Opciones con toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Opciones</h2>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="text-xl">📐</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Alta calidad</p>
                  <p className="text-xs text-slate-400">Genera un QR en alta resolución</p>
                </div>
              </div>
              <Toggle enabled={highQuality} onChange={setHighQuality} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="text-xl">⬇️</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Margen (quiet zone)</p>
                  <p className="text-xs text-slate-400">Agrega espacio alrededor del código</p>
                </div>
              </div>
              <Toggle enabled={margin} onChange={setMargin} />
            </div>
          </div>

          {/* Botón descargar */}
          <button
            onClick={downloadQR}
            className="w-full h-14 rounded-2xl text-base font-semibold bg-violet-600 hover:bg-violet-700 text-white transition flex items-center justify-center gap-2"
          >
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
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
            >
              🔍 Ampliar
            </button>
          </div>

          <div className="flex-1 bg-white border border-slate-100 rounded-3xl shadow-inner flex flex-col items-center justify-center min-h-[500px]">
            <img
              src={qrUrl}
              alt="QR Code"
              onClick={() => setIsExpanded(true)}
              className="w-80 h-80 cursor-pointer transition hover:scale-105 rounded-xl"
            />
          </div>

          <p className="text-center text-slate-400 text-sm mt-4 flex items-center justify-center gap-1">
            💡 <span>Tip: Haz clic en el código QR para verlo en grande</span>
          </p>
        </div>
      </div>

      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-white/20 backdrop-blur-xl flex items-center justify-center z-50"
        >
          <img src={qrUrl} alt="QR expandido" className="w-[40vw] max-w-xl rounded-3xl shadow-2xl" />
        </div>
      )}

      {showQrPicker && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-4 w-80">
            <h3 className="text-xl font-bold">Color personalizado QR</h3>
            <input
              type="color"
              value={customQrColor}
              onChange={(e) => { setCustomQrColor(e.target.value); setColor(e.target.value); }}
              className="w-full h-20 rounded-2xl cursor-pointer"
            />
            <button
              className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
              onClick={() => setShowQrPicker(false)}
            >Listo</button>
          </div>
        </div>
      )}

      {showBgPicker && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-4 w-80">
            <h3 className="text-xl font-bold">Color personalizado Fondo</h3>
            <input
              type="color"
              value={customBgColor}
              onChange={(e) => { setCustomBgColor(e.target.value); setBgColor(e.target.value); }}
              className="w-full h-20 rounded-2xl cursor-pointer"
            />
            <button
              className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
              onClick={() => setShowBgPicker(false)}
            >Listo</button>
          </div>
        </div>
      )}
    </div>
  );
}