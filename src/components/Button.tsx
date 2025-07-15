const Button = ({ text }: { text: string }) => {
  return (
    <button
      className="dark:bg-white/20 bg-[#15161a] dark:text-gray-100 text-white shadow-lg backdrop-blur-lg border dark:border-primary/10 border-r-pink-50 rounded-2xl
     px-6 py-3 text-xl font-semibold font-sans cursor-pointer dark:hover:bg-white/30 hover:bg-[#15161a]/30 transition duration-200 ease-in-out"
    >
      {text}
    </button>
  );
};

export default Button;
