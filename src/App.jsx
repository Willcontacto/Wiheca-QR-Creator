import React, { useState } from 'react';

export default function QRGeneratorApp() {
  const [text, setText] = useState('https://example.com');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(text)}&color=${color.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}&margin=20`;

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qr-code.png';
    link.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <div style={{ background: 'white', padding: 32, borderRadius: 20, width: 500, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h1>📱 QR Creator</h1>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ingresa texto, URL o contenido"
          style={{ width: '100%', padding: 12, marginBottom: 20 }}
        />

        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          <div>
            <p>Color QR</p>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>

          <div>
            <p>Fondo</p>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <img src={qrUrl} alt="QR" />
        </div>

        <button
          onClick={downloadQR}
          style={{ width: '100%', padding: 14, cursor: 'pointer' }}
        >
          ⬇️ Descargar QR
        </button>
      </div>
    </div>
  );
}