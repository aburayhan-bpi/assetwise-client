const Footer = () => {
  return (
    <footer className="footer footer-center bg-sky-50 dark:bg-gray-900 dark:text-white/80 text-base-content p-4 mt-40">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          AssetWise
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
