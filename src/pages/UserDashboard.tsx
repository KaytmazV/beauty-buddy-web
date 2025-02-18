
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Search, Minus, Eye, Clock, CheckCircle2, FileEdit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  phone: string;
  appointmentDate: string;
  service: string;
  status: "pending" | "completed";
  notes?: string;
}

const UserDashboard = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Ayşe Yılmaz",
      phone: "+90 555 111 2233",
      appointmentDate: "2024-03-20",
      service: "Lazer Epilasyon",
      status: "pending",
      notes: "Hassas cilt, düşük güç kullanılacak"
    },
    {
      id: "2",
      name: "Fatma Demir",
      phone: "+90 555 444 5566",
      appointmentDate: "2024-03-15",
      service: "Saç Bakımı",
      status: "completed",
      notes: "Saç boyası alerjisi var"
    },
    {
      id: "3",
      name: "Zeynep Kaya",
      phone: "+90 555 777 8899",
      appointmentDate: "2024-03-25",
      service: "Cilt Bakımı",
      status: "pending"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "", appointmentDate: "", service: "" });
  const [editingNotes, setEditingNotes] = useState<{ id: string; notes: string } | null>(null);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" ? true : customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.phone && newCustomer.appointmentDate && newCustomer.service) {
      const customer: Customer = {
        id: (customers.length + 1).toString(),
        ...newCustomer,
        status: "pending"
      };
      setCustomers([...customers, customer]);
      setNewCustomer({ name: "", phone: "", appointmentDate: "", service: "" });
      toast({
        title: "Müşteri eklendi",
        description: "Yeni müşteri başarıyla eklendi."
      });
    }
  };

  const updateCustomerNotes = (customerId: string, notes: string) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId ? { ...customer, notes } : customer
    ));
    setEditingNotes(null);
    toast({
      title: "Not güncellendi",
      description: "Müşteri notu başarıyla güncellendi."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pt-24">
      <WhatsAppSupport />
      
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-center mb-12">Müşteri Listesi</h1>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Müşteriler</CardTitle>
                <CardDescription>
                  Tüm müşterileriniz ve işlem bilgileri
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Yeni Müşteri</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Müşteri Ekle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input
                      placeholder="Müşteri Adı"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    />
                    <Input
                      placeholder="Telefon Numarası"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    />
                    <Input
                      type="date"
                      value={newCustomer.appointmentDate}
                      onChange={(e) => setNewCustomer({ ...newCustomer, appointmentDate: e.target.value })}
                    />
                    <Input
                      placeholder="Hizmet"
                      value={newCustomer.service}
                      onChange={(e) => setNewCustomer({ ...newCustomer, service: e.target.value })}
                    />
                    <Button onClick={handleAddCustomer} className="w-full">Ekle</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="mt-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Müşteri adı veya telefon numarası ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  size="sm"
                >
                  Tümü
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  onClick={() => setStatusFilter("pending")}
                  size="sm"
                  className="gap-1"
                >
                  <Clock className="h-3 w-3" />
                  Bekleyen
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  onClick={() => setStatusFilter("completed")}
                  size="sm"
                  className="gap-1"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  Tamamlanan
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <ScrollArea className="h-[400px] w-full">
              <div className="space-y-2">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-2 border rounded-lg hover:bg-secondary/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Minus className="h-3 w-3 text-muted-foreground" />
                      <div>
                        <h3 className="text-sm font-medium">{customer.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {customer.phone}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {customer.appointmentDate}
                          </span>
                          {customer.status === "pending" ? (
                            <span className="flex items-center text-primary">
                              <Clock className="mr-1 h-3 w-3" />
                              Bekliyor
                            </span>
                          ) : (
                            <span className="flex items-center text-green-600">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Tamamlandı
                            </span>
                          )}
                          {customer.notes && (
                            <span className="flex items-center text-blue-500">
                              <FileEdit className="mr-1 h-3 w-3" />
                              Not var
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Detay
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Müşteri Detayı</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <h4 className="text-sm font-medium">Müşteri Bilgileri</h4>
                            <p className="text-sm text-muted-foreground">Ad Soyad: {customer.name}</p>
                            <p className="text-sm text-muted-foreground">Telefon: {customer.phone}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Randevu Bilgileri</h4>
                            <p className="text-sm text-muted-foreground">Tarih: {customer.appointmentDate}</p>
                            <p className="text-sm text-muted-foreground">İşlem: {customer.service}</p>
                            <p className="text-sm text-muted-foreground">
                              Durum: {customer.status === "pending" ? "Bekliyor" : "Tamamlandı"}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Müşteri Notu</h4>
                            {editingNotes?.id === customer.id ? (
                              <div className="space-y-2">
                                <Textarea
                                  value={editingNotes.notes}
                                  onChange={(e) => setEditingNotes({ ...editingNotes, notes: e.target.value })}
                                  placeholder="Müşteri için not ekleyin..."
                                  className="min-h-[100px]"
                                />
                                <div className="flex gap-2">
                                  <Button 
                                    onClick={() => updateCustomerNotes(customer.id, editingNotes.notes)}
                                    size="sm"
                                  >
                                    Kaydet
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setEditingNotes(null)}
                                  >
                                    İptal
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                  {customer.notes || "Not eklenmemiş"}
                                </p>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setEditingNotes({ id: customer.id, notes: customer.notes || "" })}
                                >
                                  {customer.notes ? "Notu Düzenle" : "Not Ekle"}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
