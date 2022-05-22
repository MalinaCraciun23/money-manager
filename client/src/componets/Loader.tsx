export const Loader = () => {
  let circleCommonClasses = 'h-5 w-5 bg-primary rounded-full m-2';

  return (
    <div className='flex justify-center items-center h-[80%]'>
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce100`}></div>
      <div className={`${circleCommonClasses} animate-bounce200`}></div>
    </div>
  );
};
