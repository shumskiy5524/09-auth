'use client';

import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNote } from "@/types/note";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();


  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft(); 
      queryClient.invalidateQueries({ queryKey: ["notes"] });

    
      router.push("/notes");
    },
    onError: (error) => {
      console.error("Помилка при створенні нотатки:", error);
      alert("Не вдалося створити нотатку. Спробуйте ще раз.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    
    setDraft({
      ...draft,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  
    if (!draft.title || !draft.content) {
      alert("Заповніть всі поля");
      return;
    }

    mutate(draft as NewNote);
  };

  const handleCancel = () => {
   
    clearDraft();

   
    router.push("/notes");
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label className={css.label}>Title</label>
        <input
          name="title"
          className={css.input}
         
          value={draft.title || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Content</label>
        <textarea
          name="content"
          className={css.textarea}
       
          value={draft.content || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Tag</label>
        <select
          name="tag"
          className={css.select}
          value={draft.tag || "Todo"}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelBtn}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className={css.submitBtn}
        >
          {isPending ? "Saving..." : "Create Note"}
        </button>
      </div>
    </form>
  );
}