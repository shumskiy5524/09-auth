import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteState {
  draft: typeof initialDraft;
  setDraft: (note: Partial<typeof initialDraft>) => void; 
  clearDraft: () => void;
}


export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ 
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
    }
  )
);