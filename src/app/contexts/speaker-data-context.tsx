import { Speaker } from "@/lib/general-types"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type SpeakerDataProviderProp = {
  children: ReactNode
}

type LoadingStatusType = "loading" | "success" | "error";

type SpeakerState = {
  speakerList: Speaker[],
  loadingStatus: LoadingStatusType,
  error: string | undefined,
}

interface SpeakerDataContextProps {
  speakerState: SpeakerState;
}

const SpeakerDataContext = createContext<SpeakerDataContextProps | undefined>(
  undefined,
);

export default function SpeakerDataProvider({ children }: SpeakerDataProviderProp) {

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
          error: err instanceof Error ? err.message || 'an error happened' : 'an error happened',
        })
      }
    }

    go();

  }, [speakerState]);

  return (
    <SpeakerDataContext.Provider value={{ speakerState }}>
      {children}
    </SpeakerDataContext.Provider>
  );

}

export function useSpeakerDataContext() {
  const context = useContext(SpeakerDataContext);
  if (!context) {
    throw new Error(
      "useSpeakerDataContext must be used within a SpeakerDataProvider",
    );
  }
  return context;
}
