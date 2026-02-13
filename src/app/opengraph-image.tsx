import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Configuración de la imagen
export const alt = 'DevHelp // Engineering Workbench';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f8f9fa',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          border: '20px solid #0a0a0a',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Rejilla técnica de fondo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.03,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div style={{
            background: '#0a0a0a',
            color: 'white',
            padding: '10px 20px',
            fontSize: '32px',
            fontWeight: '900',
            fontStyle: 'italic'
          }}>
            D
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.2em', color: '#666' }}>
            SYSTEM_v0.1.8
          </div>
        </div>

        <h1
          style={{
            fontSize: '100px',
            fontWeight: '900',
            textAlign: 'left',
            lineHeight: 0.9,
            margin: 0,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            color: '#0a0a0a',
          }}
        >
          Engineering <br />
          Workbench.
        </h1>

        <div style={{
          marginTop: '40px',
          display: 'flex',
          gap: '20px',
        }}>
          {['LOCAL_V8', 'NO_CLOUD', 'ENCRYPTED'].map((tag) => (
            <div key={tag} style={{
              border: '2px solid #0a0a0a',
              padding: '8px 16px',
              fontSize: '18px',
              fontWeight: 'bold',
              fontFamily: 'monospace'
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}