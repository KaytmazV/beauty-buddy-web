import { useState } from "react";
import { motion } from "framer-motion";
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
} from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Plus, User, Users, Mail, Phone, Calendar, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
} from "@/components/ui/alert-dialog"
import WhatsAppSupport from "@/components/WhatsAppSupport";
import WhatsAppScheduler from "@/components/WhatsAppScheduler";
import { useCustomerStore } from "@/store/customerStore";
import { BlogPost } from "@/store/blogStore";
import { useBlogStore } from "@/store/blogStore";

const UserDashboard = () => {
  const { toast } = useToast();
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: "",
    description: "",
    image: "",
    category: "",
    tags: [],
  });

  // Blog store
  const { posts, addPost, deletePost } = useBlogStore();

  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);
  const { customers, addCustomer, deleteCustomer } = useCustomerStore();
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

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

  const handleDeleteCustomer = () => {
    if (customerToDelete) {
      deleteCustomer(customerToDelete);
      setCustomerToDelete(null);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Başarılı",
        description: "Müşteri başarıyla silindi.",
      });
    }
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
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
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
              <div className="mb-6 p-4 rounded-md bg-secondary/50">
                <h3 className="text-xl font-semibold mb-4">Yeni Blog Yazısı Ekle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Başlık</Label>
                    <Input
                      type="text"
                      id="title"
                      value={newPost.title || ""}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Input
                      type="text"
                      id="category"
                      value={newPost.category || ""}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    value={newPost.description || ""}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="image">Resim URL</Label>
                  <Input
                    type="text"
                    id="image"
                    value={newPost.image || ""}
                    onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                  />
                </div>
                <Button className="mt-4" onClick={handleAddPost}>
                  Ekle
                </Button>
              </div>
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
                        Sil
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
                Yeni Müşteri Ekle
              </Button>
            </div>

            {isAddingCustomer && (
              <CustomerForm
                newCustomer={newCustomer}
                setNewCustomer={setNewCustomer}
                handleAddCustomer={handleAddCustomer}
                onClose={() => setIsAddingCustomer(false)}
              />
            )}

            <Table>
              <TableCaption>A list of your recent customers.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ad Soyad</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => setCustomerToDelete(customer.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Sil
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu işlem geri alınamaz. Devam etmek istediğinizden emin
                              misiniz?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteCustomer}>
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>
                    Toplam {customers.length} müşteri
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TabsContent>

          <TabsContent value="settings">
            <h2 className="text-2xl font-semibold mb-6">Ayarlar</h2>
            <p>Ayarlar sayfası</p>
          </TabsContent>
        </Tabs>

        <CustomerForm
          newCustomer={newCustomer}
          setNewCustomer={setNewCustomer}
          handleAddCustomer={handleAddCustomer}
          onClose={() => setIsAddingCustomer(false)}
        />

        <DeleteCustomerDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={handleDeleteCustomer}
        />

        <WhatsAppScheduler />
      </div>
    </div>
  );
};

interface CustomerFormProps {
  newCustomer: { name: string; email: string; phone: string };
  setNewCustomer: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; phone: string }>
  >;
  handleAddCustomer: () => void;
  onClose: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  newCustomer,
  setNewCustomer,
  handleAddCustomer,
  onClose,
}) => {
  return (
    <div className="mb-6 p-4 rounded-md bg-secondary/50">
      <h3 className="text-xl font-semibold mb-4">Yeni Müşteri Ekle</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Ad Soyad</Label>
          <Input
            type="text"
            id="name"
            value={newCustomer.name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, name: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={newCustomer.email}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, email: e.target.value })
            }
          />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="phone">Telefon</Label>
        <Input
          type="tel"
          id="phone"
          value={newCustomer.phone}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, phone: e.target.value })
          }
        />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          İptal
        </Button>
        <Button onClick={handleAddCustomer}>Ekle</Button>
      </div>
    </div>
  );
};

interface DeleteCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteCustomerDialog: React.FC<DeleteCustomerDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Müşteriyi Sil</AlertDialogTitle>
          <AlertDialogDescription>
            Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>İptal</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Sil</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserDashboard;
