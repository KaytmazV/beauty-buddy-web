
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { blogPostApi } from '@/services/api';
import { BlogPostDTO } from '@/types/api';

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
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  convertApiToStore: (apiPost: BlogPostDTO) => BlogPost;
  convertStoreToApi: (storePost: Omit<BlogPost, 'id' | 'date'>) => Omit<BlogPostDTO, 'id'>;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      posts: [],
      isLoading: false,
      error: null,

      // API'den blog yazılarını getir
      fetchPosts: async () => {
        set({ isLoading: true, error: null });
        try {
          const apiPosts = await blogPostApi.getAll();
          const posts = apiPosts.map(get().convertApiToStore);
          set({ posts, isLoading: false });
        } catch (error) {
          console.error('Blog posts fetching error:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Blog yazıları yüklenirken bir hata oluştu', 
            isLoading: false 
          });
        }
      },

      // Blog yazısı ekle
      addPost: async (post) => {
        set({ isLoading: true, error: null });
        try {
          const apiPost = get().convertStoreToApi(post);
          const createdPost = await blogPostApi.create(apiPost);
          const newPost = get().convertApiToStore(createdPost);
          
          set(state => ({
            posts: [...state.posts, newPost],
            isLoading: false
          }));
        } catch (error) {
          console.error('Blog post creation error:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Blog yazısı eklenirken bir hata oluştu',
            isLoading: false 
          });
        }
      },

      // Blog yazısı sil
      deletePost: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // API kullanırken string id'yi number'a çevirmemiz gerekiyor
          await blogPostApi.delete(parseInt(id));
          set(state => ({
            posts: state.posts.filter(post => post.id !== id),
            isLoading: false
          }));
        } catch (error) {
          console.error('Blog post deletion error:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Blog yazısı silinirken bir hata oluştu',
            isLoading: false 
          });
        }
      },

      // API veri tipi -> Store veri tipi dönüşümü
      convertApiToStore: (apiPost: BlogPostDTO): BlogPost => ({
        id: apiPost.id?.toString() || Math.random().toString(36).substring(7),
        title: apiPost.title,
        description: apiPost.description,
        image: apiPost.image || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        category: apiPost.category,
        author: apiPost.author,
        date: apiPost.createdDate 
          ? new Date(apiPost.createdDate).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }) 
          : new Date().toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
        tags: apiPost.tags || [],
      }),

      // Store veri tipi -> API veri tipi dönüşümü
      convertStoreToApi: (storePost: Omit<BlogPost, 'id' | 'date'>): Omit<BlogPostDTO, 'id'> => ({
        title: storePost.title,
        description: storePost.description,
        image: storePost.image,
        category: storePost.category,
        author: storePost.author,
        createdDate: new Date().toISOString(),
        tags: storePost.tags || [],
      }),
    }),
    {
      name: 'blog-storage',
    }
  )
);
