import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

interface BlogPost {
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

const Blog = () => {
  const { toast } = useToast();
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: "",
    description: "",
    image: "",
    category: "",
    tags: [],
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Saç Boyama Trendleri 2024",
      description: "Bu yılın en popüler saç renkleri ve teknikleri",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486",
      category: "Saç Bakımı",
      date: "15 Mart 2024",
      author: "Ayşe Demir",
      tags: ["Saç", "Trend", "2024"]
    },
    {
      id: 2,
      title: "Doğal Cilt Bakım Rutini",
      description: "Evde uygulayabileceğiniz etkili cilt bakım önerileri",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
      category: "Cilt Bakımı",
      date: "12 Mart 2024",
      author: "Zeynep Yılmaz",
      tags: ["Cilt Bakımı", "Doğal", "Rutin"]
    },
    {
      id: 3,
      title: "Lazer Epilasyon Hakkında Bilmeniz Gerekenler",
      description: "Lazer epilasyon öncesi ve sonrası dikkat edilmesi gerekenler",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
      category: "Epilasyon",
      date: "10 Mart 2024",
      author: "Mehmet Kaya",
      tags: ["Lazer Epilasyon", "Epilasyon", "Cilt"]
    },
    {
      id: 4,
      title: "Saç Dökülmesine Karşı Doğal Çözümler",
      description: "Saç dökülmesini önlemek için etkili yöntemler",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e",
      category: "Saç Bakımı",
      date: "8 Mart 2024",
      author: "Ali Yıldız",
      tags: ["Saç Dökülmesi", "Saç Bakımı", "Doğal Çözümler"]
    },
    {
      id: 5,
      title: "Tırnak Bakımı İpuçları",
      description: "Sağlıklı ve güzel tırnaklar için öneriler",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
      category: "Tırnak Bakımı",
      date: "5 Mart 2024",
      author: "Selin Öz",
      tags: ["Tırnak Bakımı", "Manikür", "Pedikür"]
    },
    {
      id: 6,
      title: "Yüz Yoga Hareketleri",
      description: "Doğal yüz lifting etkisi için yüz yogası teknikleri",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
      category: "Cilt Bakımı",
      date: "1 Mart 2024",
      author: "Derya Can",
      tags: ["Yüz Yoga", "Cilt Bakımı", "Doğal Lifting"]
    }
  ]);

  const handleAddPost = () => {
    if (!newPost.title || !newPost.description || !newPost.category) {
      toast({
        title: "Hata",
        description: "Lütfen tüm gerekli alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const post: BlogPost = {
      id: blogPosts.length + 1,
      title: newPost.title,
      description: newPost.description,
      image: newPost.image || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      category: newPost.category,
      date: formattedDate,
      author: "İlayda Bağ",
      tags: newPost.tags || [],
    };

    setBlogPosts([post, ...blogPosts]);
    setNewPost({
      title: "",
      description: "",
      image: "",
      category: "",
      tags: [],
    });
    setIsAddingPost(false);

    toast({
      title: "Başarılı",
      description: "Blog yazısı başarıyla eklendi.",
    });
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Güzellik & Bakım Blogu
            </h1>
            <p className="text-lg text-white/90">
              En son güzellik trendleri, bakım ipuçları ve uzman önerileri
            </p>
            {!isAddingPost && (
              <Button 
                className="mt-6"
                onClick={() => setIsAddingPost(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Yeni Blog Yazısı
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Add Post Form */}
      {isAddingPost && (
        <section className="py-10">
          <div className="container mx-auto px-6">
            <Card>
              <CardHeader>
                <CardTitle>Yeni Blog Yazısı</CardTitle>
                <CardDescription>Blog yazınızı oluşturun</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlık</Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Özet</Label>
                  <Textarea
                    id="description"
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Görsel URL</Label>
                  <Input
                    id="image"
                    value={newPost.image}
                    onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Etiketler (virgülle ayırın)</Label>
                  <Input
                    id="tags"
                    value={newPost.tags?.join(", ")}
                    onChange={(e) => setNewPost({ 
                      ...newPost, 
                      tags: e.target.value.split(",").map(tag => tag.trim())
                    })}
                    placeholder="Örnek: Saç, Bakım, Trend"
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingPost(false)}
                  >
                    İptal
                  </Button>
                  <Button onClick={handleAddPost}>
                    Yazıyı Yayınla
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-accent">{post.category}</span>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <CardTitle className="text-xl font-medium hover:text-accent transition-colors">
                      <Link to="#">{post.title}</Link>
                    </CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-medium">
                          {post.author.split(' ').map(name => name[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
