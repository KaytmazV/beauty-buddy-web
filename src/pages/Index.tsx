
import { motion } from "framer-motion";
import { Calendar, MapPin, Phone, Scissors, Star, Users, Heart, Instagram, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import { useToast } from "@/components/ui/use-toast";
import { appointmentApi, customerApi } from "@/services/api";
import { AppointmentDTO } from "@/types/api";

const Index = () => {
  const { toast } = useToast();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.phone || !formData.service || !selectedTime) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create or find customer
      let customerId: number;
      
      try {
        const customers = await customerApi.getAll();
        const existingCustomer = customers.find(c => c.phone === formData.phone.replace(/\D/g, ""));
        
        if (existingCustomer) {
          customerId = existingCustomer.id || 0;
        } else {
          // Create new customer
          const newCustomer = {
            name: formData.name,
            phone: formData.phone.replace(/\D/g, ""),
            treatments: [formData.service === "sac" ? "Saç Bakımı" : 
                         formData.service === "cilt" ? "Cilt Bakımı" : 
                         formData.service === "makyaj" ? "Makyaj" : "Genel Bakım"]
          };
          
          const createdCustomer = await customerApi.create(newCustomer);
          customerId = createdCustomer.id || 0;
        }
      } catch (error) {
        console.error("Müşteri sorgusu hatası:", error);
        customerId = Math.floor(Math.random() * 1000);
      }

      // Get current selected date and time
      const appointmentDate = new Date();
      const [hours, minutes] = selectedTime.split(':').map(Number);
      appointmentDate.setHours(hours, minutes, 0, 0);
      
      // Service mapping
      const serviceMap: Record<string, string[]> = {
        "sac": ["Saç Bakımı"],
        "cilt": ["Cilt Bakımı"],
        "makyaj": ["Makyaj"]
      };
      
      // Create appointment
      const appointmentData: Omit<AppointmentDTO, 'id'> = {
        customerId: customerId,
        appointmentDate: appointmentDate.toISOString(),
        services: serviceMap[formData.service] || ["Genel Bakım"],
        status: "SCHEDULED", // Fix: Using the literal "SCHEDULED" instead of a generic string
        notes: `Hızlı randevu formu ile oluşturuldu. Müşteri: ${formData.name}, Telefon: ${formData.phone}`
      };
      
      await appointmentApi.create(appointmentData);
      
      // Show success message
      toast({
        title: "Randevunuz Alındı",
        description: "En kısa sürede sizinle iletişime geçeceğiz.",
      });
      
      // Reset form
      setFormData({
        name: "",
        phone: "",
        service: "",
      });
      setSelectedTime(null);
    } catch (error) {
      console.error("Randevu oluşturma hatası:", error);
      toast({
        title: "Hata",
        description: "Randevu oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whyUs = [
    {
      title: "Deneyim",
      description: "20 yıllık sektör tecrübesi",
      icon: <Star className="w-8 h-8 text-accent" />,
      stat: "20+"
    },
    {
      title: "Mutlu Müşteri",
      description: "Memnuniyet odaklı hizmet",
      icon: <Heart className="w-8 h-8 text-accent" />,
      stat: "5000+"
    },
    {
      title: "Uzman Kadro",
      description: "Profesyonel ekip",
      icon: <Users className="w-8 h-8 text-accent" />,
      stat: "15+"
    },
    {
      title: "Hizmet",
      description: "Farklı güzellik hizmeti",
      icon: <Scissors className="w-8 h-8 text-accent" />,
      stat: "30+"
    }
  ];

  const services = [
    {
      title: "Saç Bakımı",
      description: "Profesyonel saç kesimi, boyama ve bakım hizmetleri",
      icon: <Scissors className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "Cilt Bakımı",
      description: "Kişiye özel cilt analizi ve bakım uygulamaları",
      icon: <Star className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "Makyaj",
      description: "Özel günler için profesyonel makyaj hizmetleri",
      icon: <Users className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    }
  ];

  const teamMembers = [
    {
      name: "Ayşe Yılmaz",
      role: "Cilt Bakım Uzmanı",
      image: "/lovable-uploads/645106e4-0ba1-406c-81b7-809eefae0292.png",
      instagram: "https://instagram.com/ayseyilmaz"
    },
    {
      name: "Zeynep Kaya",
      role: "Lazer Epilasyon Uzmanı",
      image: "/lovable-uploads/693c8ffe-710b-40f8-9218-b562b9b63f05.png",
      instagram: "https://instagram.com/zeynepkaya"
    },
    {
      name: "Merve Demir",
      role: "Makyaj ve Güzellik Uzmanı",
      image: "/lovable-uploads/57c192c4-a8eb-4747-8a7d-e90308a924db.png",
      instagram: "https://instagram.com/mervedemir"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <WhatsAppSupport />
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <img 
          src="/lovable-uploads/f1f91e57-0a33-4cf7-a97a-f00595f2bde6.png" 
          alt="Beauty Salon Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        
        <div className="relative container mx-auto px-4 md:px-6 text-center text-white z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-7xl font-light mb-4 md:mb-6"
          >
            Güzellik ve Zarafet
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto px-4 md:px-0"
          >
            Size özel profesyonel bakım hizmetleriyle doğal güzelliğinizi ortaya çıkarıyoruz
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 md:space-y-0 md:space-x-4"
          >
            <Button size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white mb-4 md:mb-0">
              Randevu Al
            </Button>
            <Button size="lg" variant="outline" className="w-full md:w-auto bg-white/10 hover:bg-white/20 text-white border-white">
              Hizmetlerimiz
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-accent mb-2">En İyisi Olmak</p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">Neden Biz?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto px-4 md:px-0">
              20 yıllık tecrübemiz ve uzman kadromuzla size en kaliteli hizmeti sunuyoruz
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 md:px-0">
            {/* Center Image */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full rounded-full overflow-hidden border-4 border-accent/20"
              >
                <img 
                  src="/lovable-uploads/db42afb7-b175-4b3d-a2cf-713523bc80ea.png"
                  alt="Beauty Center" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-[30rem] md:gap-y-16 py-8 md:py-20">
              {/* Left Side Items */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-right flex items-center justify-end gap-4"
              >
                <div>
                  <h3 className="text-lg font-medium mb-2">Deneyimli Ekip</h3>
                  <p className="text-muted-foreground text-base">
                    Alanında uzman profesyonel kadro
                  </p>
                </div>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-accent" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Scissors className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Profesyonel Hizmet</h3>
                  <p className="text-muted-foreground text-base">
                    Kişiye özel bakım planlaması
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-right flex items-center justify-end gap-4"
              >
                <div>
                  <h3 className="text-lg font-medium mb-2">Özenli Hizmet</h3>
                  <p className="text-muted-foreground text-base">
                    Her müşterimize özel ilgi
                  </p>
                </div>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Premium Kalite</h3>
                  <p className="text-muted-foreground text-base">
                    En kaliteli ürünler ve hizmet
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-right flex items-center justify-end gap-4"
              >
                <div>
                  <h3 className="text-lg font-medium mb-2">Esnek Çalışma</h3>
                  <p className="text-muted-foreground text-base">
                    Size uygun randevu imkanı
                  </p>
                </div>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Merkezi Konum</h3>
                  <p className="text-muted-foreground text-base">
                    Kolay ulaşılabilir lokasyon
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-12 md:py-20 bg-pink-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-pink-400 text-lg md:text-xl mb-2"
                >
                  Who We Are
                </motion.h3>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl font-medium text-gray-800 mb-4 md:mb-6"
                >
                  Our History
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-gray-600 leading-relaxed"
                >
                  2019 yılında başlayan yolculuğumuzda, müşterilerimize en kaliteli hizmeti sunma vizyonuyla
                  çalışmalarımızı sürdürüyoruz. Yılların deneyimi ve sürekli gelişen teknolojilerle
                  sektörde öncü konumumuzu koruyoruz.
                </motion.p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-8 mt-8 md:mt-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h4 className="text-4xl md:text-5xl font-light text-pink-400 mb-2">5</h4>
                  <p className="text-gray-600">Years of Experience</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <h4 className="text-4xl md:text-5xl font-light text-pink-400 mb-2">400+</h4>
                  <p className="text-gray-600">Happy Customers</p>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[300px] md:h-[600px] rounded-2xl overflow-hidden mt-8 md:mt-0"
            >
              <img
                src="/lovable-uploads/d9294f84-ceff-48b7-ad69-42551368a2ee.png"
                alt="Beauty Salon Interior with Yellow Walls"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">Ekibimiz</h2>
            <p className="text-muted-foreground">Profesyonel ve deneyimli ekibimizle tanışın</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="relative h-[350px] md:h-[400px] overflow-hidden rounded-xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                      <h3 className="text-lg md:text-xl font-medium mb-2">{member.name}</h3>
                      <p className="text-white/80 mb-4">{member.role}</p>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <a 
                          href={member.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white hover:text-accent transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
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

      {/* Contact Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-center mb-8 md:mb-12">İletişim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Side - Contact Image */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden"
              >
                <img 
                  src="/lovable-uploads/64a521e6-1a33-4880-aa73-c55de1019236.png"
                  alt="Beauty Salon Storefront"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Right Side - Map */}
              <div className="rounded-xl overflow-hidden h-[300px] md:h-[400px] bg-muted">
                {/* Placeholder for Google Maps */}
                <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-accent" />
                </div>
              </div>

              {/* Contact Information Below */}
              <div className="bg-secondary rounded-xl p-6 md:p-8 md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Telefon</h3>
                      <p className="text-muted-foreground">+90 555 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Adres</h3>
                      <p className="text-muted-foreground">Güzellik Sokak No:1, İstanbul</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Çalışma Saatleri</h3>
                      <p className="text-muted-foreground">Her gün 09:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
