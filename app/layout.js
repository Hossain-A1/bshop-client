import "./globals.css";
import Navbar from "@/components/Navbar";
import AllPageList from "@/components/AllPageList";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/provider/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { Roboto } from "next/font/google";

// Configure the Poppins font
const poppins = Roboto({
  subsets: ["latin"], // Specify the subset(s) you want to load
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-poppins",
});
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} font-sans`}>
        <main className='px-2.5 sm:px-8 md:px-10 lg:px-12 min-h-screen bg-bg_color'>
          {/* Navbar */}
          <Toaster />
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
