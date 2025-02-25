
import { create } from 'zustand';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  author: string;
  content?: string;
  tags?: string[];
}

interface BlogStore {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  deletePost: (id: number) => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  posts: [
    {
      id: 1,
      title: "Saç Boyama Trendleri 2024",
      description: "Bu yılın en popüler saç renkleri ve teknikleri",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486",
      category: "Saç Bakımı",
      date: "15 Mart 2024",
      author: "İlayda Bağ",
      tags: ["Saç", "Trend", "2024"]
    },
    {
      id: 2,
      title: "Doğal Cilt Bakım Rutini",
      description: "Evde uygulayabileceğiniz etkili cilt bakım önerileri",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
      category: "Cilt Bakımı",
      date: "12 Mart 2024",
      author: "İlayda Bağ",
      tags: ["Cilt Bakımı", "Doğal", "Rutin"]
    }
  ],
  addPost: (newPost) => 
    set((state) => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const post: BlogPost = {
        id: state.posts.length + 1,
        ...newPost,
        date: formattedDate,
      };

      return { posts: [post, ...state.posts] };
    }),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id)
    })),
}));
