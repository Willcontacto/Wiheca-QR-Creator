import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const qrColors = ['#000000', '#1D4ED8', '#7C3AED', '#22C55E', '#EF4444', '#F59E0B'];
const bgColors = ['#FFFFFF', '#F5F3FF', '#FEF3C7', '#DBEAFE', '#DCFCE7', '#F8FAFC'];

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

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(generatedText)}&color=${color.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}&margin=20`;

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qr-code.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f3ff] to-[#f8fafc] p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
        <Card className="rounded-3xl shadow-xl border-0 bg-white p-2">
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-5xl">🟪</span>
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-violet-500 mb-2">Wiheca</p>
                <h1 className="text-4xl font-bold text-slate-900">QR Creator</h1>
                <p className="text-slate-500">Crea códigos QR personalizados al instante ✨</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-slate-900">Contenido</label>
              <Input
                className="h-14 rounded-2xl text-base"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <p className="text-sm text-slate-500">Ingresa la URL o texto que quieres convertir en QR</p>
            </div>

            <Button
              onClick={() => setGeneratedText(text)}
              className="w-full h-14 rounded-2xl text-base font-semibold bg-violet-600 hover:bg-violet-700"
            >
              ✨ Generar QR
            </Button>

            <div className="space-y-6 pt-4 border-t">
              <h2 className="text-xl font-bold">Personalización</h2>

              <div>
                <p className="font-medium mb-3">Color del QR</p>
                <div className="flex gap-3 flex-wrap">
                  {qrColors.map((item) => (
                    <button
                      key={item}
                      onClick={() => setColor(item)}
                      className={`w-14 h-14 rounded-2xl border-2 ${color === item ? 'border-violet-500 scale-105' : 'border-slate-200'}`}
                      style={{ backgroundColor: item }}
                    />
                  ))}
                  <button
                    onClick={() => setShowQrPicker(true)}
                    className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-300 cursor-pointer shadow-sm text-white text-2xl font-bold flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #ff4d4f, #faad14, #52c41a, #1677ff, #722ed1)' }}
                  >+
                  </button>
                </div>
              </div>

              <div>
                <p className="font-medium mb-3">Color del fondo</p>
                <div className="flex gap-3 flex-wrap">
                  {bgColors.map((item) => (
                    <button
                      key={item}
                      onClick={() => setBgColor(item)}
                      className={`w-14 h-14 rounded-2xl border-2 ${bgColor === item ? 'border-violet-500 scale-105' : 'border-slate-200'}`}
                      style={{ backgroundColor: item }}
                    />
                  ))}
                  <button
                    onClick={() => setShowBgPicker(true)}
                    className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-300 cursor-pointer shadow-sm text-white text-2xl font-bold flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #ff4d4f, #faad14, #52c41a, #1677ff, #722ed1)' }}
                  >+
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={downloadQR}
              className="w-full h-14 rounded-2xl text-base font-semibold bg-violet-600 hover:bg-violet-700"
            >
              ⬇ Descargar QR
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-xl border-0 bg-white p-2">
          <CardContent className="p-8 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Vista previa</h2>
                <p className="text-slate-500">Escanea para probar tu código QR</p>
              </div>
              <Button variant="outline" onClick={() => setIsExpanded(true)}>
                Ampliar
              </Button>
            </div>

            <div className="bg-white border rounded-3xl shadow-inner min-h-[620px] flex items-center justify-center">
              <img
                src={qrUrl}
                alt="QR"
                onClick={() => setIsExpanded(true)}
                className="w-96 h-96 cursor-pointer transition hover:scale-105"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-white/20 backdrop-blur-xl flex items-center justify-center z-50"
        >
          <img src={qrUrl} alt="Expanded QR" className="w-[40vw] max-w-xl rounded-3xl shadow-2xl" />
        </div>
      )}

      {showQrPicker && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-4 w-80">
            <h3 className="text-xl font-bold">Color personalizado QR</h3>
            <input
              type="color"
              value={customQrColor}
              onChange={(e) => {
                setCustomQrColor(e.target.value);
                setColor(e.target.value);
              }}
              className="w-full h-20 rounded-2xl cursor-pointer"
            />
            <Button className="w-full" onClick={() => setShowQrPicker(false)}>Listo</Button>
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
              onChange={(e) => {
                setCustomBgColor(e.target.value);
                setBgColor(e.target.value);
              }}
              className="w-full h-20 rounded-2xl cursor-pointer"
            />
            <Button className="w-full" onClick={() => setShowBgPicker(false)}>Listo</Button>
          </div>
        </div>
      )}
    </div>
  );
}
