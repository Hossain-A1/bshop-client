import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold mb-4">Company info</h3>
          <ul className="space-y-2 text-sm">
            <li>About Temu</li>
            <li>Temu – Shop Like a Billionaire</li>
            <li>Affiliate & Influencer: Earn Commission</li>
            <li>Contact us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Temu's Tree Planting Program</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-bold mb-4">Customer service</h3>
          <ul className="space-y-2 text-sm">
            <li>Return and refund policy</li>
            <li>Intellectual property policy</li>
            <li>Shipping info</li>
            <li>Report suspicious activity</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-bold mb-4">Help</h3>
          <ul className="space-y-2 text-sm">
            <li>Support center & FAQ</li>
            <li>Safety center</li>
            <li>Temu purchase protection</li>
            <li>Sitemap</li>
            <li>Partner with Temu</li>
          </ul>
        </div>

        {/* App Download and Social Media */}
        <div>
          <h3 className="font-bold mb-4">Download the Temu App</h3>
          <ul className="space-y-2 text-sm">
            <li>Price-drop alerts</li>
            <li>Faster & more secure checkout</li>
            <li>Exclusive offers</li>
            <li>Coupons & offers alerts</li>
          </ul>
          <div className="flex gap-2 mt-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_app_store_badge.svg"
              alt="App Store"
              className="w-24"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-24"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Security Certifications */}
          <div>
            <h3 className="font-bold mb-4">Security certification</h3>
            <div className="flex gap-2 flex-wrap">
              <img
                src="https://via.placeholder.com/40x20"
                alt="Security 1"
                className="w-16 h-auto"
              />
              <img
                src="https://via.placeholder.com/40x20"
                alt="Security 2"
                className="w-16 h-auto"
              />
              <img
                src="https://via.placeholder.com/40x20"
                alt="Security 3"
                className="w-16 h-auto"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-bold mb-4">We accept</h3>
            <div className="flex gap-2 flex-wrap">
              <img
                src="https://via.placeholder.com/40x20"
                alt="Visa"
                className="w-16 h-auto"
              />
              <img
                src="https://via.placeholder.com/40x20"
                alt="MasterCard"
                className="w-16 h-auto"
              />
              <img
                src="https://via.placeholder.com/40x20"
                alt="PayPal"
                className="w-16 h-auto"
              />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-4">Connect with Temu</h3>
            <div className="flex gap-4">
              <i className="fab fa-facebook text-xl"></i>
              <i className="fab fa-instagram text-xl"></i>
              <i className="fab fa-tiktok text-xl"></i>
              <i className="fab fa-twitter text-xl"></i>
              <i className="fab fa-youtube text-xl"></i>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2024 WhaleCo Inc.</p>
          <p>
            <a href="#" className="hover:underline">
              Terms of use
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Privacy policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Your privacy choices
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
