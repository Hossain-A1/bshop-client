import { FadeLoader } from "react-spinners";



const Loading = ({ isLoading }) => {
  return (
    <div className='flex justify-center items-center '>
      <FadeLoader
        size='32px'
        color='rgb(0, 145, 181)'
        loading={isLoading}
        aria-label='Loading spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default Loading;