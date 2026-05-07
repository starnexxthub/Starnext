// components/TeamFooterBanner.tsx
export default function TeamFooterBanner() {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        background: '#031E4C',
        lineHeight: 0,
      }}
    >
      <img
        src="/img/Team-Footer.webp"
        alt="The Star Team"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}