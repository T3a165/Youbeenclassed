export const metadata = {
title: “YouBeenClassed — The Human Leverage Engine”,
description: “AI-powered platform helping everyday people gain advantages through automation and intelligent systems. Make money, fix problems, learn skills, build things, improve yourself, and save time.”,
openGraph: {
title: “YouBeenClassed — The Human Leverage Engine”,
description: “Stop trading hours for revenue. Build systems that compound.”,
url: “https://youbeenclassed.org”,
},
};

export default function RootLayout({ children }) {
return (
<html lang="en">
<head>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap"
rel="stylesheet"
/>
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style={{ margin: 0, padding: 0 }}>{children}</body>
</html>
);
}