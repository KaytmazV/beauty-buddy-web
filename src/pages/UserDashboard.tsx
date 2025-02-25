
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus, FileEdit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import WhatsAppScheduler from "@/components/WhatsAppScheduler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserDashboard = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [newBlogData, setNewBlogData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    author: "",
  });

  interface BlogPost {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    date: string;
    author: string;
  }

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Saç Boyama Trendleri 2024",
      description: "Bu yılın en popüler saç renkleri ve teknikleri",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486",
      category: "Saç Bakımı",
      date: "15 Mart 2024",
      author: "Ayşe Demir"
    },
    {
      id: 2,
      title: "Doğal Cilt Bakım Rutini",
      description: "Evde uygulayabileceğiniz etkili cilt bakım önerileri",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
      category: "Cilt Bakımı",
      date: "12 Mart 2024",
      author: "Zeynep Yılmaz"
    }
  ]);

  const handleAddBlog = () => {
    const newBlog = {
      id: blogPosts.length + 1,
      ...newBlogData,
      date: new Date().toLocaleDateString('tr-TR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    setBlogPosts([...blogPosts, newBlog]);
    setNewBlogData({
      title: "",
      description: "",
      category: "",
      image: "",
      author: "",
    });
    setIsDialogOpen(false);
    toast({
      title: "Blog yazısı eklendi",
      description: "Yeni blog yazısı başarıyla eklendi.",
    });
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setNewBlogData({
      title: blog.title,
      description: blog.description,
      category: blog.category,
      image: blog.image,
      author: blog.author,
    });
    setIsDialogOpen(true);
  };

  const handleUpdateBlog = () => {
    if (!editingBlog) return;
    
    const updatedPosts = blogPosts.map(post => 
      post.id === editingBlog.id 
        ? { ...post, ...newBlogData }
        : post
    );
    
    setBlogPosts(updatedPosts);
    setIsDialogOpen(false);
    setEditingBlog(null);
    setNewBlogData({
      title: "",
      description: "",
      category: "",
      image: "",
      author: "",
    });
    
    toast({
      title: "Blog yazısı güncellendi",
      description: "Blog yazısı başarıyla güncellendi.",
    });
  };

  const handleDeleteBlog = (id: number) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
    toast({
      title: "Blog yazısı silindi",
      description: "Blog yazısı başarıyla silindi.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 pt-24">
      <WhatsAppSupport />
      
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Hoş Geldiniz, İlayda
            </h1>
            <p className="text-sm text-muted-foreground">
              İlayda Bağ Güzellik Salonu Yönetim Paneli
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menüyü aç</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hesap</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ayarlar</DropdownMenuItem>
              <DropdownMenuItem>Çıkış Yap</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="blog" className="mb-8">
          <TabsList>
            <TabsTrigger value="blog">Blog Yönetimi</TabsTrigger>
            <TabsTrigger value="appointments">Randevular</TabsTrigger>
            <TabsTrigger value="services">Hizmetler</TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Blog Yazıları</h2>
              <Button onClick={() => {
                setEditingBlog(null);
                setIsDialogOpen(true);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Blog Yazısı
              </Button>
            </div>

            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-lg overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">{post.category} - {post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditBlog(post)}
                      >
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Blog yazısını sil</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu blog yazısını silmek istediğinize emin misiniz?
                              Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteBlog(post.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Randevular</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Hizmetler</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Hizmet yönetimi yakında eklenecek...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Blog Yazısı Ekleme/Düzenleme Dialog */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="sm:max-w-[500px]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {editingBlog ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Başlık</Label>
                <Input
                  id="title"
                  value={newBlogData.title}
                  onChange={(e) =>
                    setNewBlogData({ ...newBlogData, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={newBlogData.description}
                  onChange={(e) =>
                    setNewBlogData({ ...newBlogData, description: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  value={newBlogData.category}
                  onChange={(e) =>
                    setNewBlogData({ ...newBlogData, category: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Görsel URL</Label>
                <Input
                  id="image"
                  value={newBlogData.image}
                  onChange={(e) =>
                    setNewBlogData({ ...newBlogData, image: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author">Yazar</Label>
                <Input
                  id="author"
                  value={newBlogData.author}
                  onChange={(e) =>
                    setNewBlogData({ ...newBlogData, author: e.target.value })
                  }
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>İptal</AlertDialogCancel>
              <AlertDialogAction onClick={editingBlog ? handleUpdateBlog : handleAddBlog}>
                {editingBlog ? "Güncelle" : "Ekle"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* WhatsApp Planlayıcı */}
        <div className="mt-6">
          <WhatsAppScheduler />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
