
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

const WhatsAppScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSchedule = () => {
    if (!selectedDate || !time || !message || !phoneNumber) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    const scheduledTime = new Date(selectedDate);
    const [hours, minutes] = time.split(":");
    scheduledTime.setHours(parseInt(hours), parseInt(minutes));

    // Şu anki zaman ile karşılaştır
    if (scheduledTime <= new Date()) {
      toast.error("Geçmiş bir zaman seçemezsiniz.");
      return;
    }

    // Zamanlayıcı oluştur
    const timeUntilScheduled = scheduledTime.getTime() - new Date().getTime();

    setTimeout(() => {
      // WhatsApp mesajını gönder
      const formattedMessage = encodeURIComponent(message);
      const formattedNumber = phoneNumber.replace(/\D/g, ""); // Sadece rakamları al
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${formattedMessage}`;
      window.open(whatsappUrl, "_blank");
    }, timeUntilScheduled);

    toast.success(
      `Mesaj planlandı: ${selectedDate.toLocaleDateString()} ${time}`
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>WhatsApp Mesaj Planlayıcı</CardTitle>
        <CardDescription>
          Müşterilerinize göndermek istediğiniz mesajları planlayın
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tarih</label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Saat</label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Telefon Numarası</label>
              <Input
                type="tel"
                placeholder="+90 555 111 22 33"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mesaj</label>
              <Textarea
                placeholder="Göndermek istediğiniz mesajı yazın..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>
        <Button onClick={handleSchedule} className="w-full">
          Mesajı Planla
        </Button>
      </CardContent>
    </Card>
  );
};

export default WhatsAppScheduler;
