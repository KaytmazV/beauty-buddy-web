
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import WhatsAppScheduler from "@/components/WhatsAppScheduler";
import { CustomerList } from "@/components/customers/CustomerList";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { DeleteCustomerDialog } from "@/components/customers/DeleteCustomerDialog";
import { Customer, CustomerFormData } from "@/types/customer";
import { useBlogStore, type BlogPost } from "@/store/blogStore";
import { customerApi, appointmentApi, serviceApi } from "@/services/api";
import { CustomerDTO, ServiceDTO, AppointmentDTO } from "@/types/api";

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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const { posts, fetchPosts, addPost, deletePost, isLoading, error } = useBlogStore();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);

  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState<CustomerFormData>({
    name: "",
    phone: "",
    treatments: "",
  });

  // API verilerini yükleyen fonksiyonlar
  const loadBlogPosts = async () => {
    try {
      await fetchPosts();
    } catch (error) {
      console.error("Blog posts loading error:", error);
      toast({
        title: "Hata",
        description: "Blog yazıları yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const loadCustomers = async () => {
    setIsLoadingCustomers(true);
    try {
      const apiCustomers = await customerApi.getAll();
      const mappedCustomers: Customer[] = apiCustomers.map(c => ({
        id: c.id || 0,
        name: c.name,
        phone: c.phone,
        lastVisit: c.lastVisit ? new Date(c.lastVisit).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '-',
        nextAppointment: c.nextAppointment ? new Date(c.nextAppointment).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '-',
        treatments: c.treatments || []
      }));
      setCustomers(mappedCustomers);
    } catch (error) {
      console.error("Customers loading error:", error);
      toast({
        title: "Hata",
        description: "Müşteriler yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  const loadServices = async () => {
    setIsLoadingServices(true);
    try {
      const apiServices = await serviceApi.getAll();
      setServices(apiServices);
    } catch (error) {
      console.error("Services loading error:", error);
      toast({
        title: "Hata",
        description: "Hizmetler yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingServices(false);
    }
  };

  const loadAppointments = async () => {
    setIsLoadingAppointments(true);
    try {
      const apiAppointments = await appointmentApi.getAll();
      setAppointments(apiAppointments);
    } catch (error) {
      console.error("Appointments loading error:", error);
      toast({
        title: "Hata",
        description: "Randevular yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  // Sayfa yüklendiğinde tüm verileri yükle
  useEffect(() => {
    loadBlogPosts();
    loadCustomers();
    loadServices();
    loadAppointments();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Hata",
          description: "Resim boyutu 5MB'dan küçük olmalıdır.",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setNewPost(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.description || !newPost.category) {
      toast({
        title: "Hata",
        description: "Lütfen tüm gerekli alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addPost({
        title: newPost.title,
        description: newPost.description,
        image: previewUrl || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
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
      setSelectedImage(null);
      setPreviewUrl("");
      setIsAddingPost(false);

      toast({
        title: "Başarılı",
        description: "Blog yazısı başarıyla eklendi.",
      });
    } catch (error) {
      console.error("Error adding post:", error);
      toast({
        title: "Hata",
        description: "Blog yazısı eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleAddCustomer = async () => {
    try {
      const apiCustomer: Omit<CustomerDTO, 'id'> = {
        name: newCustomer.name,
        phone: newCustomer.phone,
        treatments: newCustomer.treatments.split(",").map(t => t.trim()),
      };

      const createdCustomer = await customerApi.create(apiCustomer);
      
      const customer: Customer = {
        id: createdCustomer.id || 0,
        name: createdCustomer.name,
        phone: createdCustomer.phone,
        lastVisit: "-",
        nextAppointment: "-",
        treatments: createdCustomer.treatments,
      };

      setCustomers([...customers, customer]);
      setNewCustomer({ name: "", phone: "", treatments: "" });
      setIsCustomerDialogOpen(false);
      
      toast({
        title: "Müşteri eklendi",
        description: "Yeni müşteri başarıyla eklendi.",
      });
    } catch (error) {
      console.error("Error adding customer:", error);
      toast({
        title: "Hata",
        description: "Müşteri eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
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

  const handleUpdateCustomer = async () => {
    if (!editingCustomer) return;

    try {
      const apiCustomer: Omit<CustomerDTO, 'id'> = {
        name: newCustomer.name,
        phone: newCustomer.phone,
        treatments: newCustomer.treatments.split(",").map(t => t.trim()),
      };

      const updatedApiCustomer = await customerApi.update(editingCustomer.id, apiCustomer);

      const updatedCustomer: Customer = {
        id: updatedApiCustomer.id || 0,
        name: updatedApiCustomer.name,
        phone: updatedApiCustomer.phone,
        lastVisit: editingCustomer.lastVisit,
        nextAppointment: editingCustomer.nextAppointment,
        treatments: updatedApiCustomer.treatments,
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
    } catch (error) {
      console.error("Error updating customer:", error);
      toast({
        title: "Hata",
        description: "Müşteri güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    try {
      await customerApi.delete(id);
      setCustomers(customers.filter(c => c.id !== id));
      
      toast({
        title: "Müşteri silindi",
        description: "Müşteri başarıyla silindi.",
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast({
        title: "Hata",
        description: "Müşteri silinirken bir hata oluştu.",
        variant: "destructive",
      });
    }
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

  const handleRefreshData = async (dataType: 'blogs' | 'customers' | 'appointments') => {
    switch (dataType) {
      case 'blogs':
        await loadBlogPosts();
        toast({
          title: "Yenilendi",
          description: "Blog yazıları yenilendi.",
        });
        break;
      case 'customers':
        await loadCustomers();
        toast({
          title: "Yenilendi",
          description: "Müşteri listesi yenilendi.",
        });
        break;
      case 'appointments':
        await loadAppointments();
        toast({
          title: "Yenilendi",
          description: "Randevular yenilendi.",
        });
        break;
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
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">Blog Yazıları</h2>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleRefreshData('blogs')}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
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
                    <Label htmlFor="image">Görsel</Label>
                    <div className="grid gap-4">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {previewUrl && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>
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
                      onClick={() => {
                        setIsAddingPost(false);
                        setSelectedImage(null);
                        setPreviewUrl("");
                      }}
                    >
                      İptal
                    </Button>
                    <Button onClick={handleAddPost} disabled={isLoading}>
                      {isLoading ? "Yükleniyor..." : "Yazıyı Yayınla"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
                <p>{error}</p>
              </div>
            )}

            {isLoading && !isAddingPost ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
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
                          disabled={isLoading}
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
            )}

            {!isLoading && posts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Henüz blog yazısı bulunmuyor.</p>
                <Button 
                  onClick={() => setIsAddingPost(true)}
                  variant="outline" 
                  className="mt-4"
                >
                  İlk Blog Yazısını Ekle
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="customers">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">Müşteri Listesi</h2>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleRefreshData('customers')}
                  disabled={isLoadingCustomers}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoadingCustomers ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              <Button onClick={() => {
                setEditingCustomer(null);
                setNewCustomer({ name: "", phone: "", treatments: "" });
                setIsCustomerDialogOpen(true);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Müşteri
              </Button>
            </div>

            {isLoadingCustomers ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <CustomerList
                customers={customers}
                onEdit={handleEditCustomer}
                onDelete={setCustomerToDelete}
                onCreateAppointment={handleCreateAppointment}
              />
            )}

            {!isLoadingCustomers && customers.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Henüz müşteri bulunmuyor.</p>
                <Button 
                  onClick={() => {
                    setEditingCustomer(null);
                    setNewCustomer({ name: "", phone: "", treatments: "" });
                    setIsCustomerDialogOpen(true);
                  }}
                  variant="outline" 
                  className="mt-4"
                >
                  İlk Müşteriyi Ekle
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="appointments">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">Randevular</h2>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleRefreshData('appointments')}
                  disabled={isLoadingAppointments}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoadingAppointments ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            {isLoadingAppointments ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Randevu Takvimi</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar />
                  
                  {appointments.length > 0 ? (
                    <div className="mt-6 space-y-4">
                      <h3 className="font-medium">Yaklaşan Randevular</h3>
                      {appointments.map(appointment => {
                        const customer = customers.find(c => c.id === appointment.customerId);
                        return (
                          <Card key={appointment.id} className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{customer?.name || "Müşteri bulunamadı"}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(appointment.appointmentDate).toLocaleDateString('tr-TR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {appointment.services.map((service, idx) => (
                                    <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs ${
                                appointment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                                appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {appointment.status === 'SCHEDULED' ? 'Planlandı' : 
                                 appointment.status === 'COMPLETED' ? 'Tamamlandı' : 'İptal Edildi'}
                              </span>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">Henüz randevu bulunmuyor.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
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
