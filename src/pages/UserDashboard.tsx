import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import WhatsAppScheduler from "@/components/WhatsAppScheduler";
import { CustomerList } from "@/components/customers/CustomerList";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { DeleteCustomerDialog } from "@/components/customers/DeleteCustomerDialog";
import { Customer, CustomerFormData } from "@/types/customer";
import { useBlogStore, type BlogPost } from "@/store/blogStore";

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

  const { posts, addPost, deletePost } = useBlogStore();
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

  const handleAddPost = () => {
    if (!newPost.title || !newPost.description || !newPost.category) {
      toast({
        title: "Hata",
        description: "Lütfen tüm gerekli alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    const currentDate = new Date().toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    addPost({
      title: newPost.title,
      description: newPost.description,
      image: newPost.image || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      category: newPost.category,
      author: "İlayda Bağ",
      date: currentDate,
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

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setIsCustomerDialogOpen(false);
      setEditingCustomer(null);
      setNewCustomer({ name: "", phone: "", treatments: "" });
    }
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
        </div>

        <Tabs defaultValue="customers" className="mb-8">
          <TabsList>
            <TabsTrigger value="customers">Müşteriler</TabsTrigger>
            <TabsTrigger value="appointments">Randevular</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
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
              <h2 className="text-2xl font-semibold">Müşteri Listesi</h2>
              <Button onClick={() => {
                setEditingCustomer(null);
                setNewCustomer({ name: "", phone: "", treatments: "" });
                setIsCustomerDialogOpen(true);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Müşteri
              </Button>
            </div>

            <CustomerList
              customers={customers}
              onEdit={handleEditCustomer}
              onDelete={setCustomerToDelete}
              onCreateAppointment={handleCreateAppointment}
            />
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
        </Tabs>

        <CustomerForm
          open={isCustomerDialogOpen}
          onOpenChange={handleDialogClose}
          formData={newCustomer}
          onFormDataChange={setNewCustomer}
          onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
          onCancel={() => handleDialogClose(false)}
          isEditing={!!editingCustomer}
        />

        <DeleteCustomerDialog
          customer={customerToDelete}
          onOpenChange={(open) => !open && setCustomerToDelete(null)}
          onConfirm={() => {
            if (customerToDelete) {
              handleDeleteCustomer(customerToDelete.id);
              setCustomerToDelete(null);
            }
          }}
          onCancel={() => setCustomerToDelete(null)}
        />

        <WhatsAppScheduler />
      </div>
    </div>
  );
};

export default UserDashboard;
