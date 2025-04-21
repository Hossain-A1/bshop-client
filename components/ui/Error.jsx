
const Error = ({ error }) => {
  return (
    <div className='  h-screen w-screen '>
      <p className='text-red-600 text-2xl text-center mt-20'>{error}!</p>
    </div>
  );
};

export default Error;
