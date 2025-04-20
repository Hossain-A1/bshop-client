import Link from "next/link";
import { headers } from "next/headers";

export default function NotFound() {
  const headersList = headers();
  const domain = headersList.get("host");

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4'>
      <h2 className='text-4xl font-bold text-red-500 mb-4'>404 - Not Found</h2>
      <p className='text-lg text-gray-700 mb-2'>
        Could not find the requested resource on{" "}
        <span className='font-semibold'>{domain}</span>.
      </p>
      <Link
        href='/'
        className='mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition'
      >
        Back to Home
      </Link>
    </div>
  );
}
