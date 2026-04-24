// components/TeamFooterBanner.tsx
export default function TeamFooterBanner() {
  return (
    <div
      style={{
        background: "#031E4C",
        width: "100%",
        overflow: "hidden",
        display: "block",
        lineHeight: 0, // removes any inline gap under image
      }}
    >
      <img
        src="/img/Team-Footer.jpg" // 👈 update path if different
        alt="The Star Team"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "cover",
        }}
      />
    </div>
  );
}