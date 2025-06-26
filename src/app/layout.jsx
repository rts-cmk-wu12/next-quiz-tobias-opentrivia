import "./globals.css";

export const metadata = {
  title: "Trivia App",
  description: "A little school project to try out next",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          {children}
        </main>
      </body>
    </html>
  );
}
