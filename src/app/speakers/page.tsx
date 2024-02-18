'use client';
import { useEffect, useState } from "react";
import SpeakerList from "./speaker-list";
import SpeakerDataProvider from "../contexts/speaker-data-context";
import Header from "../header";
import Nav from "../nav";
import Footer from "../footer";

export default function Speakers() {

  return (
    <div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />
        <SpeakerDataProvider>
          <SpeakerList />
        </SpeakerDataProvider>
      </div>
      <Footer />
    </div>
  );
}