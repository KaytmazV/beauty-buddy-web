
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Search, Minus, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import WhatsAppSupport from "@/components/WhatsAppSupport";

interface Customer {
  id: string;
  name: string;
  phone: string;
  appointmentDate: string;
  service: string;
}

const UserDashboard = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Ayşe Yılmaz",
      phone: "+90 555 111 2233",
      appointmentDate: "2024-03-20",
      service: "Lazer Epilasyon"
    },
    {
      id: "2",
      name: "Fatma Demir",
      phone: "+90 555 444 5566",
      appointmentDate: "2024-03-15",
      service: "Saç Bakımı"
    },
    {
      id: "3",
      name: "Zeynep Kaya",
      phone: "+90 555 777 8899",
      appointmentDate: "2024-03-25",
      service: "Cilt Bakımı"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

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
              <Button>
                Yeni Müşteri
              </Button>
            </div>
            
            <div className="mt-4">
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
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      Detay
                    </Button>
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
