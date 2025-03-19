const Overlay = ({ setOpenCtg }) => {
  return (
    <div
      onClick={() => setOpenCtg(false)}
      className='h-full w-full  absolute   top-[65px] left-0 right-0 bottom-0 z-10 bg-black/50'
    ></div>
  );
};

export default Overlay;
