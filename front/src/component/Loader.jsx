
function Loader() {
  return (

    <div className="flex justify-center flex-col items-center h-full">
      <div className="jumping-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="text-xl ps-4 font-semibold text-gray-500 animate-pulse mix-blend-plus-darker">Loading...</p>
    </div>

  );
}

export default Loader;
