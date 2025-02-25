
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

const UserDashboard = () => {
  const { toast } = useToast();
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
            <TabsTrigger value="services">Hizmetler</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

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

          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>Blog Yazıları</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Blog yönetimi yakında eklenecek...</p>
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
