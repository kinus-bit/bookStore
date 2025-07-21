import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center p-4 mt-8 border-t text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Bookstore. All rights reserved.
    </footer>
  );
};

export default Footer;
