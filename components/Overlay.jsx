"use client";

const Overlay = ({ openCtg, setOpenCtg, openModal, setOpenModal }) => {
  const removeOverlay = () => {
    if (openCtg) {
      setOpenCtg(false);
    }
    if (openModal) {
      setOpenModal(false);
    }
  };

  return (
    <div
      onClick={removeOverlay}
      className='h-full w-full  absolute   top-[65px] left-0 right-0 bottom-0 z-10 bg-black/70'
    ></div>
  );
};

export default Overlay;
