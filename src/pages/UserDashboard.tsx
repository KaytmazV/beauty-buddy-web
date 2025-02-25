import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import WhatsAppScheduler from "@/components/WhatsAppScheduler";
import { CustomerList } from "@/components/customers/CustomerList";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { DeleteCustomerDialog } from "@/components/customers/DeleteCustomerDialog";
import { Customer, CustomerFormData } from "@/types/customer";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreVertical, FileEdit, Trash2, Calendar as CalendarIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  // Müşteri states
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Elif Yılmaz",
      phone: "+90 532 111 2233",
      lastVisit: "10 Mart 2024",
      nextAppointment: "25 Mart 2024",
      treatments: ["Lazer Epilasyon", "Cilt Bakımı"]
    },
    {
      id: 2,
      name: "Ayşe Kara",
      phone: "+90 535 444 5566",
      lastVisit: "15 Mart 2024",
      nextAppointment: "1 Nisan 2024",
      treatments: ["Saç Boyama"]
    },
    {
      id: 3,
      name: "Fatma Demir",
      phone: "+90 542 777 8899",
      lastVisit: "18 Mart 2024",
      nextAppointment: "28 Mart 2024",
      treatments: ["Tırnak Bakımı", "El Bakımı"]
    }
  ]);

  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState<CustomerFormData>({
    name: "",
    phone: "",
    treatments: "",
  });

  // Müşteri işlemleri
  const handleAddCustomer = () => {
    const customer: Customer = {
      id: customers.length + 1,
      name: newCustomer.name,
      phone: newCustomer.phone,
      lastVisit: "-",
      nextAppointment: "-",
      treatments: newCustomer.treatments.split(",").map(t => t.trim()),
    };

    setCustomers([...customers, customer]);
    setNewCustomer({ name: "", phone: "", treatments: "" });
    setIsCustomerDialogOpen(false);
    toast({
      title: "Müşteri eklendi",
      description: "Yeni müşteri başarıyla eklendi.",
    });
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setNewCustomer({
      name: customer.name,
      phone: customer.phone,
      treatments: customer.treatments.join(", "),
    });
    setIsCustomerDialogOpen(true);
  };

  const handleUpdateCustomer = () => {
    if (!editingCustomer) return;

    const updatedCustomer: Customer = {
      ...editingCustomer,
      name: newCustomer.name,
      phone: newCustomer.phone,
      treatments: newCustomer.treatments.split(",").map(t => t.trim()),
    };

    setCustomers(customers.map(c => 
      c.id === editingCustomer.id ? updatedCustomer : c
    ));

    setIsCustomerDialogOpen(false);
    setEditingCustomer(null);
    setNewCustomer({ name: "", phone: "", treatments: "" });

    toast({
      title: "Müşteri güncellendi",
      description: "Müşteri bilgileri başarıyla güncellendi.",
    });
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
    toast({
      title: "Müşteri silindi",
      description: "Müşteri başarıyla silindi.",
    });
  };

  const handleCreateAppointment = (customer: Customer) => {
    const appointmentTab = document.querySelector('[value="appointments"]') as HTMLElement;
    if (appointmentTab) {
      appointmentTab.click();
    }
    
    toast({
      title: "Randevu oluştur",
      description: `${customer.name} için randevu oluşturuluyor...`,
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
            <TabsTrigger value="customers">Müşteriler</TabsTrigger>
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

          <TabsContent value="customers">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Müşteri Listesi</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Müşteri
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      Yeni Müşteri
                    </DialogTitle>
                    <DialogDescription>
                      Yeni müşteri bilgilerini girin
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="customerName">Ad Soyad</Label>
                      <Input
                        id="customerName"
                        value={newCustomer.name}
                        onChange={(e) =>
                          setNewCustomer({ ...newCustomer, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="customerPhone">Telefon</Label>
                      <Input
                        id="customerPhone"
                        value={newCustomer.phone}
                        placeholder="+90 5XX XXX XX XX"
                        onChange={(e) =>
                          setNewCustomer({ ...newCustomer, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="customerTreatments">Aldığı Hizmetler</Label>
                      <Input
                        id="customerTreatments"
                        value={newCustomer.treatments}
                        placeholder="Hizmetleri virgülle ayırarak yazın"
                        onChange={(e) =>
                          setNewCustomer({ ...newCustomer, treatments: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setIsCustomerDialogOpen(false);
                      setNewCustomer({ name: "", phone: "", treatments: "" });
                    }}>
                      İptal
                    </Button>
                    <Button onClick={handleAddCustomer}>
                      Ekle
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {customers.map((customer) => (
                <Card key={customer.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">
                          {customer.name.split(' ').map(name => name[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{customer.name}</h3>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                        <div className="flex gap-2 mt-1">
                          {customer.treatments.map((treatment, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                            >
                              {treatment}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-right">
                        <p>Son Ziyaret: <span className="text-muted-foreground">{customer.lastVisit}</span></p>
                        <p>Sonraki Randevu: <span className="text-muted-foreground">{customer.nextAppointment}</span></p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`https://wa.me/${customer.phone.replace(/\D/g, '')}`, '_blank')}
                        >
                          WhatsApp
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onSelect={() => handleEditCustomer(customer)}>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleCreateAppointment(customer)}>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              Randevu Oluştur
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onSelect={() => setCustomerToDelete(customer)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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

        {/* Müşteri Ekleme/Düzenleme Dialog */}
        <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingCustomer ? "Müşteriyi Düzenle" : "Yeni Müşteri"}
              </DialogTitle>
              <DialogDescription>
                Müşteri bilgilerini düzenleyin
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="customerName">Ad Soyad</Label>
                <Input
                  id="customerName"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customerPhone">Telefon</Label>
                <Input
                  id="customerPhone"
                  value={newCustomer.phone}
                  placeholder="+90 5XX XXX XX XX"
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customerTreatments">Aldığı Hizmetler</Label>
                <Input
                  id="customerTreatments"
                  value={newCustomer.treatments}
                  placeholder="Hizmetleri virgülle ayırarak yazın"
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, treatments: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsCustomerDialogOpen(false);
                setEditingCustomer(null);
                setNewCustomer({ name: "", phone: "", treatments: "" });
              }}>
                İptal
              </Button>
              <Button onClick={editingCustomer ? handleUpdateCustomer : handleAddCustomer}>
                {editingCustomer ? "Güncelle" : "Ekle"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* WhatsApp Planlayıcı */}
        <div className="mt-6">
          <WhatsAppScheduler />
        </div>

        {/* Müşteri Silme Dialog */}
        <AlertDialog open={!!customerToDelete} onOpenChange={(open) => !open && setCustomerToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Müşteriyi sil</AlertDialogTitle>
              <AlertDialogDescription>
                {customerToDelete?.name} isimli müşteriyi silmek istediğinize emin misiniz?
                Bu işlem geri alınamaz.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setCustomerToDelete(null)}>İptal</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (customerToDelete) {
                    handleDeleteCustomer(customerToDelete.id);
                    setCustomerToDelete(null);
                  }
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Sil
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default UserDashboard;
