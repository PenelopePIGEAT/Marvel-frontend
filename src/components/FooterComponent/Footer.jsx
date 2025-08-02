import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      Made with{" "}
      <strong>
        <span>❤️</span>
      </strong>{" "}
      at{" "}
      <strong>
        <a
          href="https://www.lereacteur.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Le Reacteur
        </a>
      </strong>{" "}
      by{" "}
      <strong>
        <a
          href="https://github.com/PenelopePIGEAT"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pénélope
        </a>
      </strong>
    </footer>
  );
};

export default Footer;
