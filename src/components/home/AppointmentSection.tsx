
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AppointmentSection = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.phone || !formData.service || !selectedTime) {
      console.log("Lütfen tüm alanları doldurun");
      return;
    }

    // Backend için hazır veri
    const appointmentData = {
      ...formData,
      appointmentTime: selectedTime,
      appointmentDate: new Date().toISOString().split('T')[0],
    };

    console.log("Randevu verileri (Backend için):", appointmentData);
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-800 mb-4">Randevu</h2>
          <p className="text-muted-foreground">Size en uygun zamanda hizmet vermekten mutluluk duyarız</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left Side - Working Hours */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-light mb-6">Çalışma Saatleri</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pazartesi - Cuma</span>
                <span className="font-medium">09:00 - 20:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cumartesi</span>
                <span className="font-medium">10:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pazar</span>
                <span className="font-medium">Kapalı</span>
              </div>
              <div className="pt-6">
                <p className="text-muted-foreground text-sm">
                  * Özel günlerde çalışma saatlerimiz değişiklik gösterebilir
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Appointment Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-light mb-6">Randevu Al</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  placeholder="05XX XXX XX XX"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Hizmet
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                >
                  <option value="">Hizmet seçiniz</option>
                  <option value="sac">Saç Bakımı</option>
                  <option value="cilt">Cilt Bakımı</option>
                  <option value="makyaj">Makyaj</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Randevu Saati - {new Date().toLocaleDateString('tr-TR')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "10:00", "10:30", "11:00", 
                    "11:30", "12:00", "12:30",
                    "13:00", "13:30", "14:00",
                    "14:30", "15:00", "15:30",
                    "16:00", "16:30", "17:00",
                    "17:30", "18:00", "18:30"
                  ].map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`transition-colors ${
                        selectedTime === time 
                          ? "bg-accent text-white" 
                          : "hover:bg-accent hover:text-white"
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90 text-white"
              >
                Randevu Oluştur
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
