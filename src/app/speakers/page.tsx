'use client';
import { useEffect, useState } from "react";
import SpeakerDetail from "./speaker-detail";
import { Speaker } from "@/lib/general-types";

type LoadingStatusType = "loading" | "success" | "error";

export default function Speakers() {

  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>('loading');
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {

    async function go() {
      try {
        const res = await fetch('/api/speakers');
        const data = await res.json();
        setSpeakerList(data);
        setLoadingStatus('success');
      } catch (err) {
        setLoadingStatus('error');
        if (err instanceof Error) {
          const errMsg = err.message || 'an error happened';
          setError(errMsg);
        } else {
          setError('an error happened');
        }
      }
    }

    go();

  }, []);

  if (loadingStatus === "error") {
    return <div className="card">Error: {error}</div>;
  }

  if (loadingStatus === "loading") {
    return <div>Loading ...</div>;
  }

  return (
    <div className="container">
      <div className="row g-4">
        {speakerList.map((speaker: Speaker) => (
          <SpeakerDetail key={speaker.id}
            speaker={speaker} />
        ))}
      </div>
    </div>
  )
}