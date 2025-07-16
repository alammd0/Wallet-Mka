import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-10 border-t-4 border-primary/10 py-4">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => window.open("https://x.com/MdKhalidAl11992", "_blank")}
          aria-label="Twitter"
          className=" text-white  cursor-pointer flex items-center space-x-2 px-4 py-2 border rounded-2xl hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <FaTwitter className="text-xl" />
          <span>Twitter</span>
        </button>

        <button
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/md-khalid-alam-3307b4219/",
              "_blank"
            )
          }
          aria-label="LinkedIn"
          className=" text-white cursor-pointer flex items-center space-x-2 px-4 py-2 border rounded-2xl hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <FaLinkedin className="text-xl" />
          <span>LinkedIn</span>
        </button>

        <button
          onClick={() => window.open("https://github.com/alammd0", "_blank")}
          aria-label="GitHub"
          className="flex text-white cursor-pointer items-center space-x-2 px-4 py-2 border rounded-2xl hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <FaGithub className="text-xl text-white" />
          <span>GitHub</span>
        </button>
      </div>

      <p className="text-center text-gray-500 text-lg mt-4">
        &copy; {new Date().getFullYear()} Wallet Mka
      </p>
    </footer>
  );
};

export default Footer;
