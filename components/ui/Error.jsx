import Link from "next/link";


const Error = ({ error }) => {
  return (
    <div className='flex justify-center items-center '>
      <p className="text-red-600">{error}</p>
      <Link href='/' className="text-black font-medium border p-1 rounded ">BACK TO HOME</Link>
    </div>
  );
};

export default Error;