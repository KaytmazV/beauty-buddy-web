
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  date: string;
  tags?: string[];
}

interface BlogStore {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  deletePost: (id: string) => void;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set) => ({
      posts: [],
      addPost: (post) => set((state) => ({
        posts: [...state.posts, {
          ...post,
          id: Math.random().toString(36).substring(7),
          date: new Date().toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        }]
      })),
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id)
      }))
    }),
    {
      name: 'blog-storage', // localStorage'da kullanılacak anahtar
    }
  )
);
