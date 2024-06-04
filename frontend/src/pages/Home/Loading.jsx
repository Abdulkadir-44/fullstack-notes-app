import {Circles} from "react-loader-spinner"
export const LoadingMessage = () => (
  <div className='container font-bold text-purple-900 w-[87%] mx-auto md:mt-4 bg-slate-300 flex justify-center items-center flex-1'>
    <Circles
      height="80"
      width="80"
      color="#432B93"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}/>
    </div>
);