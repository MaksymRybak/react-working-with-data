'use client';
import { useEffect, useState } from "react";
import SpeakerDetail from "./speaker-detail";
import { Speaker } from "@/lib/general-types";

type LoadingStatusType = "loading" | "success" | "error";

type SpeakerState = {
  speakerList: Speaker[],
  loadingStatus: LoadingStatusType,
  error: string | undefined,
}

export default function Speakers() {

  const initialState: SpeakerState = {
    speakerList: [],
    loadingStatus: 'loading',
    error: undefined,
  }

  const [speakerState, setSpeakerState] = useState<SpeakerState>(initialState);

  useEffect(() => {

    async function go() {
      try {
        const res = await fetch('/api/speakers');
        const data = await res.json();
        setSpeakerState({
          speakerList: data,
          loadingStatus: 'success',
          error: undefined,
        });
      } catch (err) {
        setSpeakerState({
          ...speakerState,
          loadingStatus: 'error',
          error: err instanceof Error ? err.message || 'an error happened' :  'an error happened',
        })
      }
    }

    go();

  }, []);

  if (speakerState.loadingStatus === "error") {
    return <div className="card">Error: {speakerState.error}</div>;
  }

  if (speakerState.loadingStatus === "loading") {
    return <div>Loading ...</div>;
  }

  return (
    <div className="container">
      <div className="row g-4">
        {speakerState.speakerList.map((speaker: Speaker) => (
          <SpeakerDetail key={speaker.id}
            speaker={speaker} />
        ))}
      </div>
    </div>
  )
}