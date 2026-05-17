import { deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css"
import { useQueryClient, useMutation } from '@tanstack/react-query';

interface NoteListProps {
  posts: Note[];
  onEdit: (post: Note) => void;
}

export default function NoteList({ posts, onEdit }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      alert("Post deleted successfully!");
    },
  });

  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.content}</p>
          <div className={css.footer}>
            <button className={css.edit} onClick={() => onEdit(post)}>Edit</button>
            <button 
              className={css.delete} 
              disabled={mutation.isPending}
              onClick={() => mutation.mutate(post.id.toString())}
            >
              {mutation.isPending ? "..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// 