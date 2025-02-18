
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Settings, Users } from "lucide-react";
import WhatsAppSupport from "@/components/WhatsAppSupport";

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface Customer {
  id: string;
  name: string;
  email: string;
  lastVisit: string;
  totalVisits: number;
}

const UserDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      service: "Lazer Epilasyon",
      date: "2024-03-20",
      time: "14:30",
      status: "upcoming",
    },
    {
      id: "2",
      service: "Saç Bakım",
      date: "2024-03-15",
      time: "11:00",
      status: "completed",
    },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Ayşe Yılmaz",
      email: "ayse@email.com",
      lastVisit: "2024-03-15",
      totalVisits: 5,
    },
    {
      id: "2",
      name: "Fatma Demir",
      email: "fatma@email.com",
      lastVisit: "2024-03-10",
      totalVisits: 3,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pt-24">
      <WhatsAppSupport />
      
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-center mb-12">Yönetim Paneli</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Randevular Kartı */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Randevularım
              </CardTitle>
              <CardDescription>
                Yaklaşan ve geçmiş randevularınızı görüntüleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/10 transition-colors"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium">{appointment.service}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          {appointment.time}
                        </div>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.status === "upcoming"
                              ? "bg-primary/20 text-primary"
                              : appointment.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {appointment.status === "upcoming"
                            ? "Yaklaşan"
                            : appointment.status === "completed"
                            ? "Tamamlandı"
                            : "İptal Edildi"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-4">
                <Button className="w-full">
                  Yeni Randevu Al
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Müşteri Listesi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Müşteri Listesi
              </CardTitle>
              <CardDescription>
                Tüm müşterilerinizi görüntüleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/10 transition-colors"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium">{customer.name}</h4>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          Son Ziyaret: {customer.lastVisit}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm font-medium">
                          {customer.totalVisits} Ziyaret
                        </span>
                        <Button variant="outline" size="sm" className="mt-2">
                          Detaylar
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

          {/* Ayarlar Kartı */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Tercihler ve Ayarlar
              </CardTitle>
              <CardDescription>
                Sistem ayarlarınızı ve tercihlerinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Sistem Ayarları
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Çalışma Saatleri
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Personel Yönetimi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
