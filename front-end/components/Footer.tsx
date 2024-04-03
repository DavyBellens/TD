import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="p-5 sm:p-10">
      <div className="flex justify-center">
        <a href="https://www.davybellens.com" target="_blank">
          <p className="text-md">&copy; 2024 - Davy Bellens</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
