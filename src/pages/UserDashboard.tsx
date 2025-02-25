
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2 } from "lucide-react";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import WhatsAppScheduler from "@/components/WhatsAppScheduler";
import { useCustomerStore } from "@/store/customerStore";
import { useBlogStore, type BlogPost } from "@/store/blogStore";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: "",
    description: "",
    image: "",
    category: "",
    tags: [],
  });

  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Blog store
  const { posts, addPost, deletePost } = useBlogStore();
  // Customer store
  const { customers, addCustomer, deleteCustomer } = useCustomerStore();

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    addCustomer(newCustomer);
    setNewCustomer({ name: "", email: "", phone: "" });
    setIsAddingCustomer(false);

    toast({
      title: "Başarılı",
      description: "Müşteri başarıyla eklendi.",
    });
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.description || !newPost.category) {
      toast({
        title: "Hata",
        description: "Lütfen tüm gerekli alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    addPost({
      title: newPost.title,
      description: newPost.description,
      image: newPost.image || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      category: newPost.category,
      author: "İlayda Bağ",
      tags: newPost.tags || [],
    });

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

    // Blog sayfasına yönlendir
    navigate("/blog");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 pt-24">
      <WhatsAppSupport />
      
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-6">Yönetim Paneli</h1>

        <Tabs defaultValue="blog" className="w-full">
          <TabsList>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="customers">Müşteriler</TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Blog Yazıları</h2>
              <Button onClick={() => setIsAddingPost(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Blog Yazısı
              </Button>
            </div>

            {isAddingPost && (
              <Card className="mb-6">
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
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-[16/9] relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-accent">{post.category}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-destructive"
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-xl mt-2">{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags?.map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Müşteriler</h2>
              <Button onClick={() => setIsAddingCustomer(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Müşteri
              </Button>
            </div>

            {isAddingCustomer && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Yeni Müşteri</CardTitle>
                  <CardDescription>Müşteri bilgilerini girin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad</Label>
                    <Input
                      id="name"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingCustomer(false)}
                    >
                      İptal
                    </Button>
                    <Button onClick={handleAddCustomer}>
                      Müşteri Ekle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customers.map((customer) => (
                <Card key={customer.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{customer.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => deleteCustomer(customer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                      <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <WhatsAppScheduler />
      </div>
    </div>
  );
};

export default UserDashboard;
