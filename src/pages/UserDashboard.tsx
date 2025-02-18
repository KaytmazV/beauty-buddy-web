
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import WhatsAppSupport from "@/components/WhatsAppSupport";

interface Customer {
  id: string;
  name: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  status: "upcoming" | "completed" | "cancelled";
}

const UserDashboard = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Ayşe Yılmaz",
      phone: "+90 555 111 2233",
      appointmentDate: "2024-03-20",
      appointmentTime: "14:30",
      status: "upcoming"
    },
    {
      id: "2",
      name: "Fatma Demir",
      phone: "+90 555 444 5566",
      appointmentDate: "2024-03-15",
      appointmentTime: "11:00",
      status: "completed"
    },
    {
      id: "3",
      name: "Zeynep Kaya",
      phone: "+90 555 777 8899",
      appointmentDate: "2024-03-25",
      appointmentTime: "16:00",
      status: "upcoming"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" ? true : customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pt-24">
      <WhatsAppSupport />
      
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-center mb-12">Müşteri Yönetimi</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Müşteri Listesi</CardTitle>
            <CardDescription>
              Tüm müşterileriniz ve randevu bilgileri
            </CardDescription>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Müşteri adı veya telefon numarası ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                >
                  Tümü
                </Button>
                <Button 
                  variant={statusFilter === "upcoming" ? "default" : "outline"}
                  onClick={() => setStatusFilter("upcoming")}
                >
                  Yaklaşan
                </Button>
                <Button 
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  onClick={() => setStatusFilter("completed")}
                >
                  Tamamlanan
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <ScrollArea className="h-[600px] w-full pr-4">
              <div className="space-y-4">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-secondary/10 transition-colors"
                  >
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">{customer.name}</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="mr-2 h-4 w-4" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {customer.appointmentDate} - {customer.appointmentTime}
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          customer.status === "upcoming"
                            ? "bg-primary/20 text-primary"
                            : customer.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {customer.status === "upcoming"
                          ? "Yaklaşan"
                          : customer.status === "completed"
                          ? "Tamamlandı"
                          : "İptal Edildi"}
                      </span>
                      <Button variant="outline" size="sm">
                        Düzenle
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="mt-4">
              <Button className="w-full">
                Yeni Müşteri Ekle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
