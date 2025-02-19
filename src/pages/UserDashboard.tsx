import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Search, Minus, Eye, Clock, CheckCircle2, FileEdit, Send, MessageCircle, Bell, Star, Award, List, DollarSign, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import { useToast } from "@/hooks/use-toast";
import { format, addMonths } from "date-fns";
import { tr } from "date-fns/locale";

interface Customer {
  id: string;
  name: string;
  phone: string;
  appointmentDate: string;
  service: string;
  status: "pending" | "completed";
  notes?: string;
  nextAppointmentDate?: string;
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
      notes: "Hassas cilt, düşük güç kullanılacak",
      nextAppointmentDate: "2024-05-20"
    },
    {
      id: "2",
      name: "Fatma Demir",
      phone: "+90 555 444 5566",
      appointmentDate: "2024-03-15",
      service: "Saç Bakımı",
      status: "completed",
      notes: "Saç boyası alerjisi var",
      nextAppointmentDate: "2024-04-15"
    },
    {
      id: "3",
      name: "Zeynep Kaya",
      phone: "+90 555 777 8899",
      appointmentDate: "2024-03-25",
      service: "Cilt Bakımı",
      status: "pending",
      nextAppointmentDate: "2024-04-25"
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
      const appointmentDate = new Date(newCustomer.appointmentDate);
      const nextAppointmentDate = format(addMonths(appointmentDate, 1), "yyyy-MM-dd");
      
      const customer: Customer = {
        id: (customers.length + 1).toString(),
        ...newCustomer,
        status: "pending",
        nextAppointmentDate
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

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy, EEEE", { locale: tr });
  };

  const handleWhatsAppMessage = () => {
    const message = encodeURIComponent("Merhaba, randevunuz hakkında bilgi vermek istiyorum.");
    const phoneNumber = "+905551112233";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    
    toast({
      title: "WhatsApp açıldı",
      description: "Mesaj gönderimi için WhatsApp açıldı."
    });
  };

  const handleSendSMS = () => {
    toast({
      title: "SMS Gönderildi",
      description: "Randevu hatırlatma SMS'i gönderildi."
    });
  };

  const handleSendBulkSMS = () => {
    const pendingCustomers = customers.filter(customer => customer.status === "pending");
    const customerCount = pendingCustomers.length;
    
    if (customerCount > 0) {
      toast({
        title: "Toplu SMS Gönderildi",
        description: `${customerCount} müşteriye randevu hatırlatma SMS'i gönderildi.`
      });
    } else {
      toast({
        title: "Dikkat",
        description: "Bekleyen randevusu olan müşteri bulunamadı."
      });
    }
  };

  const handleMarkAsCompleted = () => {
    if (customers.length > 0) {
      const updatedCustomers = customers.map(customer => 
        customer.status === "pending" ? { ...customer, status: "completed" } : customer
      );
      setCustomers(updatedCustomers);
      
      toast({
        title: "Durum Güncellendi",
        description: "Seçili randevular tamamlandı olarak işaretlendi."
      });
    }
  };

  const handleUpdateStatus = () => {
    toast({
      title: "Durum Güncelleme",
      description: "Randevu durumu güncellendi."
    });
  };

  const handleCustomerWhatsApp = (phone: string) => {
    const formattedPhone = phone.replace(/\s+/g, ''); // Boşlukları kaldır
    const message = encodeURIComponent("Merhaba, randevunuz hakkında bilgi vermek istiyorum.");
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank');
    
    toast({
      title: "WhatsApp açıldı",
      description: "Mesaj gönderimi için WhatsApp açıldı."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 pt-24">
      <WhatsAppSupport />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-2">İlayda Bağ</h1>
          <p className="text-2xl font-light text-muted-foreground mb-2">Güzellik Uzmanı</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary/80 to-accent mx-auto mb-8"></div>
          <h2 className="text-3xl font-light">Yönetim Paneli</h2>
          <p className="text-muted-foreground">Müşterilerinizi ve işlemlerinizi kolayca yönetin</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Hızlı İşlemler */}
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Hızlı İşlemler
              </CardTitle>
              <CardDescription>Hızlı işlemler ve bildirimler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleWhatsAppMessage}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Mesajı
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleSendSMS}
                >
                  <Bell className="w-4 h-4" />
                  SMS Hatırlatma
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleMarkAsCompleted}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Tamamlandı İşaretle
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleUpdateStatus}
                >
                  <Clock className="w-4 h-4" />
                  Durumu Güncelle
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 col-span-2"
                  onClick={handleSendBulkSMS}
                >
                  <Users className="w-4 h-4" />
                  Toplu SMS Gönder
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Takvim Görünümü */}
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Takvim Görünümü
              </CardTitle>
              <CardDescription>Randevu takvimi ve planlaması</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Basit takvim görünümü */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day) => (
                  <div key={day} className="p-2 text-muted-foreground font-medium">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="p-2 h-12 hover:bg-accent/20"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Müşteri Listesi */}
        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary/80 to-accent bg-clip-text text-transparent">
                  Müşteriler
                </CardTitle>
                <CardDescription>
                  Tüm müşterileriniz ve işlem bilgileri
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-accent hover:bg-accent/90">
                    <Calendar className="mr-2 h-4 w-4" />
                    Yeni Müşteri
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Yeni Müşteri Ekle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input
                      placeholder="Müşteri Adı"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      className="bg-background/50"
                    />
                    <Input
                      placeholder="Telefon Numarası"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      className="bg-background/50"
                    />
                    <Input
                      type="date"
                      value={newCustomer.appointmentDate}
                      onChange={(e) => setNewCustomer({ ...newCustomer, appointmentDate: e.target.value })}
                      className="bg-background/50"
                    />
                    <Input
                      placeholder="Hizmet"
                      value={newCustomer.service}
                      onChange={(e) => setNewCustomer({ ...newCustomer, service: e.target.value })}
                      className="bg-background/50"
                    />
                    <Button onClick={handleAddCustomer} className="w-full bg-accent hover:bg-accent/90">
                      Ekle
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Müşteri adı veya telefon numarası ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-background/50"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  size="sm"
                  className={statusFilter === "all" ? "bg-accent hover:bg-accent/90" : ""}
                >
                  Tümü
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  onClick={() => setStatusFilter("pending")}
                  size="sm"
                  className={`gap-1 ${statusFilter === "pending" ? "bg-primary hover:bg-primary/90" : ""}`}
                >
                  <Clock className="h-3 w-3" />
                  Bekleyen
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  onClick={() => setStatusFilter("completed")}
                  size="sm"
                  className={`gap-1 ${statusFilter === "completed" ? "bg-green-600 hover:bg-green-600/90" : ""}`}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  Tamamlanan
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <ScrollArea className="h-[400px] w-full">
              <div className="space-y-3">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-3 rounded-lg transition-all hover:scale-[1.01] border border-border/50 hover:border-accent/30 hover:bg-accent/5 bg-card/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{customer.name}</h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {customer.phone}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {formatDate(customer.appointmentDate)}
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
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-3 text-xs hover:bg-green-500/10 hover:text-green-500"
                        onClick={() => handleCustomerWhatsApp(customer.phone)}
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        WhatsApp
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 px-3 text-xs hover:bg-accent/10">
                            <Eye className="h-3 w-3 mr-1" />
                            Detay
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                {customer.name.charAt(0)}
                              </div>
                              {customer.name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 mt-4">
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-accent">Müşteri Bilgileri</h4>
                              <div className="grid gap-1 text-sm">
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                                  <span>{customer.phone}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-accent">Randevu Bilgileri</h4>
                              <div className="grid gap-2 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                                  <span>{formatDate(customer.appointmentDate)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                                  <span>{customer.service}</span>
                                </div>
                                <div className="flex items-center">
                                  {customer.status === "pending" ? (
                                    <Clock className="w-4 h-4 mr-2 text-primary" />
                                  ) : (
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                                  )}
                                  <span>{customer.status === "pending" ? "Bekliyor" : "Tamamlandı"}</span>
                                </div>
                              </div>
                              {customer.nextAppointmentDate && (
                                <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
                                  <p className="text-sm font-medium text-accent flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Sonraki Randevu
                                  </p>
                                  <p className="text-sm mt-1">{formatDate(customer.nextAppointmentDate)}</p>
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-accent mb-2">Müşteri Notu</h4>
                              {editingNotes?.id === customer.id ? (
                                <div className="space-y-2">
                                  <Textarea
                                    value={editingNotes.notes}
                                    onChange={(e) => setEditingNotes({ ...editingNotes, notes: e.target.value })}
                                    placeholder="Müşteri için not ekleyin..."
                                    className="min-h-[100px] bg-background/50"
                                  />
                                  <div className="flex gap-2">
                                    <Button 
                                      onClick={() => updateCustomerNotes(customer.id, editingNotes.notes)}
                                      size="sm"
                                      className="bg-accent hover:bg-accent/90"
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
                                    className="hover:bg-accent/10 hover:text-accent"
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
