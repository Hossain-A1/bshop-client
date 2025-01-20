import "./globals.css";
import Navbar from "@/components/Navbar";
import AllPageList from "@/components/AllPageList";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReduxProvider } from "@/provider/ReduxProvider";

export const metadata = {
  title: "Shop Quality Products | Your E-Commerce Store",
  description:
    "Discover a variety of high-quality products at affordable prices. Shop now for exclusive deals and fast delivery.",
  keywords: "e-commerce, online shopping, affordable products, quality items",
  openGraph: {
    title: "Shop Quality Products | Your E-Commerce Store",
    description:
      "Discover a variety of high-quality products at affordable prices. Shop now for exclusive deals and fast delivery.",
    url: "https://yourwebsite.com",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "E-Commerce Store Banner",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        {/* Metadata */}
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
        <meta name='keywords' content={metadata.keywords} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        {/* Open Graph Tags */}
        <meta property='og:title' content={metadata.openGraph.title} />
        <meta
          property='og:description'
          content={metadata.openGraph.description}
        />
        <meta property='og:url' content={metadata.openGraph.url} />
        <meta property='og:type' content={metadata.openGraph.type} />
        <meta property='og:image' content={metadata.openGraph.images[0].url} />
        <meta
          property='og:image:width'
          content={metadata.openGraph.images[0].width}
        />
        <meta
          property='og:image:height'
          content={metadata.openGraph.images[0].height}
        />
        <meta
          property='og:image:alt'
          content={metadata.openGraph.images[0].alt}
        />

        {/* Favicon */}
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <main className='px-2.5 sm:px-8 md:px-10 lg:px-16 min-h-screen bg-bg_color'>
          {/* Navbar */}
          <div className='flex flex-col'>
            <Navbar />

            {/* Responsive Page List */}
            <div className='sm:hidden block'>
              <AllPageList />
            </div>
          </div>

          {/* Main Content */}

          <ReduxProvider>{children}</ReduxProvider>
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
