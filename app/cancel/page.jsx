"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CancelPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <Image 
        src="/assets/bkash.png" 
        priority
        alt="Bkash Logo" 
        width={150} 
        height={150} 
        className="h-full w-full overflow-hidden"
      />
      <h1 className="text-2xl font-semibold text-gray-800 mt-4">Payment Canceled</h1>
      <p className="text-gray-600 mt-2">Your payment was not completed. Please try again.</p>
      <button
        onClick={() => router.push("/place-order")}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
      >
        Go Back to Checkout
      </button>
    </div>
  );
};

export default CancelPage;
