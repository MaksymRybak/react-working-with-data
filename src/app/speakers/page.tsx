'use client';
import { useEffect, useState } from "react";
import SpeakerList from "./speaker-list";
import SpeakerDataProvider from "../contexts/speaker-data-context";

export default function Speakers() {

  return (
    <SpeakerDataProvider>
      <SpeakerList />
    </SpeakerDataProvider>
  )
}