
const LoginOverlay = ({ setOpenModal }) => {
  return (
    <div
      onClick={() => setOpenModal(false)}
      className="fixed inset-0 z-30 bg-black/50"
    ></div>
  );
};

export default LoginOverlay;
