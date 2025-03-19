import { FadeLoader } from "react-spinners";



const Loading = ({ isLoading }) => {
  return (
    <div className='h-screen w-full'>
     <div className="flex  justify-center items-center h-full w-full">
     <FadeLoader
        size='32px'
        color='rgb(0, 145, 181)'
        loading={isLoading}
        aria-label='Loading spinner'
        data-testid='loader'
      />
     </div>
    </div>
  );
};

export default Loading;