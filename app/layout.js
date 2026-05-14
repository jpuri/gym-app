import "./globals.css";

export const metadata = {
  title: "IronForge Gym — Train. Sweat. Conquer.",
  description:
    "Premium gym experience with personalized step goals based on your body metrics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
