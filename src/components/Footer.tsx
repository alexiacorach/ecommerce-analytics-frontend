import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-black text-center p-4" style={{ backgroundColor: "#ddd6fe" }}>
      <p>&copy; {new Date().getFullYear()} Ecommerce Analytics. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
