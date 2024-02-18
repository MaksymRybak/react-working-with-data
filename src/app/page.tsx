'use client';

import Footer from "./footer";
import Header from "./header";
import Home from "./home";
import Nav from "./nav";

export default function HomePage() {
  
  return (
    <div className="container-fluid">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />
        <Home />
      </div>
      <Footer />
    </div>
  );

}
