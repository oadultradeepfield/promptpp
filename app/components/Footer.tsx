import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub, IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="text-content flex flex-col items-center gap-4 py-6 mb-4">
      <aside className="text-center">
        <div className="text-base">
          Made with 💻 by{" "}
          <a
            href="https://www.phanuphats.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="transition-colors hover:text-gray-400"
          >
            <span className="font-semibold">
              <br></br>@oadultradeepfield
            </span>
          </a>{" "}
        </div>
      </aside>
      <nav className="flex items-center justify-center gap-4">
        <a
          href="https://www.linkedin.com/in/phanuphats/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="transition-colors hover:text-gray-400"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/oadultradeepfield"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="transition-colors hover:text-gray-400"
        >
          <IoLogoGithub size={24} />
        </a>
        <a
          href="mailto:phanuphat.srisukhawasu@gmail.com"
          aria-label="Email Contact"
          className="transition-colors hover:text-gray-400"
        >
          <IoMdMail size={24} />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
