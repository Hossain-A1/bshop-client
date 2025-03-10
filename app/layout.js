import "./globals.css";
import Navbar from "@/components/Navbar";
import AllPageList from "@/components/AllPageList";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/provider/ReduxProvider";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <main className='px-2.5 sm:px-8 md:px-10 lg:px-12 min-h-screen bg-bg_color'>
          {/* Navbar */}
          <ReduxProvider>
            <div className='flex flex-col'>
              <Navbar />

              {/* Responsive Page List */}
              <div className='sm:hidden block'>
                <AllPageList />
              </div>
            </div>

            {/* Main Content */}

            {children}
            {/* Footer */}
            <Footer />
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
