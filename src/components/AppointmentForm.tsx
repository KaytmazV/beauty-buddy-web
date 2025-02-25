import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type Service = {
  id: string;
  category: string;
  name: string;
  duration: number; // dakika cinsinden
  price: number;
};

const services: { category: string; items: Service[] }[] = [
  {
    category: "Saç Bakımı",
    items: [
      { id: "1", category: "Saç", name: "Saç Kesimi", duration: 45, price: 250 },
      { id: "2", category: "Saç", name: "Saç Boyama", duration: 90, price: 600 },
      { id: "3", category: "Saç", name: "Keratin Bakım", duration: 120, price: 800 },
      { id: "4", category: "Saç", name: "Fön", duration: 30, price: 150 },
    ]
  },
  {
    category: "Lazer Epilasyon",
    items: [
      { id: "5", category: "Lazer", name: "Tüm Vücut", duration: 120, price: 1200 },
      { id: "6", category: "Lazer", name: "Yarım Vücut", duration: 60, price: 700 },
      { id: "7", category: "Lazer", name: "Yüz", duration: 30, price: 300 },
    ]
  },
  {
    category: "Tırnak Bakımı",
    items: [
      { id: "8", category: "Tırnak", name: "Manikür", duration: 45, price: 200 },
      { id: "9", category: "Tırnak", name: "Pedikür", duration: 45, price: 250 },
      { id: "10", category: "Tırnak", name: "Protez Tırnak", duration: 90, price: 500 },
    ]
  }
];

const timeSlots = Array.from({ length: 22 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minute = (i % 2) * 30;
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
});

const AppointmentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleTimeClick = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    } else if (selectedTimes.length < 3) {
      setSelectedTimes([...selectedTimes, time].sort());
    } else {
      toast({
        title: "Maksimum 3 saat seçebilirsiniz",
        variant: "destructive"
      });
    }
  };

  const isTimeSlotAvailable = (time: string) => {
    // Burada gerçek bir API'den müsaitlik kontrolü yapılabilir
    return true;
  };

  const handleServiceChange = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const calculateTotalDuration = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.flatMap(cat => cat.items).find(s => s.id === serviceId);
      return total + (service?.duration || 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !date || selectedTimes.length === 0 || selectedServices.length === 0) {
      toast({
        title: "Lütfen tüm alanları doldurun",
        variant: "destructive"
      });
      return;
    }

    const totalDuration = calculateTotalDuration();
    const requiredTimeSlots = Math.ceil(totalDuration / 30);
    
    if (selectedTimes.length < requiredTimeSlots) {
      toast({
        title: `Seçtiğiniz hizmetler için en az ${requiredTimeSlots} zaman dilimi seçmelisiniz`,
        variant: "destructive"
      });
      return;
    }

    // Navigate to dashboard after successful appointment creation
    toast({
      title: "Randevunuz alındı!",
      description: "En kısa sürede size dönüş yapacağız.",
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-light">Randevu Al</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Kişisel Bilgiler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon Numarası</Label>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                  +90
                </span>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="5XX XXX XX XX"
                  className="rounded-l-none"
                  maxLength={10}
                />
              </div>
            </div>
          </div>

          {/* Tarih Seçimi */}
          <div className="space-y-4">
            <Label>Tarih Seçimi</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={tr}
              className="rounded-md border mx-auto"
              disabled={(date) => {
                const now = new Date();
                return date < now || date > new Date(2025, 11, 31);
              }}
            />
          </div>

          {/* Saat Seçimi */}
          <div className="space-y-4">
            <Label>Saat Seçimi (En fazla 3 saat)</Label>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTimes.includes(time) ? "default" : "outline"}
                  className={cn(
                    "h-10",
                    !isTimeSlotAvailable(time) && "opacity-50 cursor-not-allowed",
                    selectedTimes.includes(time) && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => handleTimeClick(time)}
                  disabled={!isTimeSlotAvailable(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Hizmet Seçimi */}
          <div className="space-y-4">
            <Label>Hizmet Seçimi</Label>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="space-y-8">
                {services.map((category) => (
                  <div key={category.category} className="space-y-4">
                    <h3 className="font-medium text-lg">{category.category}</h3>
                    <div className="ml-4 space-y-2">
                      {category.items.map((service) => (
                        <div key={service.id} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={service.id}
                              checked={selectedServices.includes(service.id)}
                              onCheckedChange={() => handleServiceChange(service.id)}
                            />
                            <label
                              htmlFor={service.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {service.name}
                            </label>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {service.duration} dk - {service.price} ₺
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Randevu Butonu */}
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
            Randevu Oluştur
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default AppointmentForm;
