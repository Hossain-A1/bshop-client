import "./globals.css";
import Navbar from "@/components/Navbar";
import AllPageList from "@/components/AllPageList";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/provider/ReduxProvider";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
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
