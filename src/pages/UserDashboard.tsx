
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Settings, User } from "lucide-react";
import WhatsAppSupport from "@/components/WhatsAppSupport";

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pt-24">
      <WhatsAppSupport />
      
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-center mb-12">Kullanıcı Paneli</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profil Kartı */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profil Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-secondary-foreground" />
                  </div>
                  <h3 className="font-medium">Ayşe Yılmaz</h3>
                  <p className="text-sm text-muted-foreground">ayse@email.com</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Profili Düzenle
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Randevular Kartı */}
          <Card className="lg:col-span-2">
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
              <ScrollArea className="h-[400px] pr-4">
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
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
