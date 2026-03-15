import "./globals.css";

export const metadata = {
  title: "The Class Board — YouBeenClassed™",
  description: "Post roasts. Outbid for spots. Compete in duels. The most chaotic social board on the internet.",
  openGraph: {
    title: "The Class Board — YouBeenClassed™",
    description: "Outbid. Roast. Take the Board.",
    url: "https://youbeenclassed.org",
    siteName: "YouBeenClassed™",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Archivo+Black&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
