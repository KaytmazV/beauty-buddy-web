
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus, FileEdit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppSupport from "@/components/WhatsAppSupport";
import WhatsAppScheduler from "@/components/WhatsAppScheduler";

const UserDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newImageName, setNewImageName] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");
  const [images, setImages] = useState([
    {
      id: 1,
      name: "Manikür",
      description: "Profesyonel manikür hizmeti",
      url: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Pedikür",
      description: "Rahatlatıcı pedikür deneyimi",
      url: "https://via.placeholder.com/150",
    },
  ]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddImage = () => {
    const newImage = {
      id: images.length + 1,
      name: newImageName,
      description: newImageDescription,
      url: "https://via.placeholder.com/150",
    };
    setImages([...images, newImage]);
    handleCloseDialog();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 pt-24">
      <WhatsAppSupport />
      
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Hoş Geldiniz, İlayda
            </h1>
            <p className="text-sm text-muted-foreground">
              İlayda Bağ Güzellik Salonu Yönetim Paneli
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menüyü aç</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hesap</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ayarlar</DropdownMenuItem>
              <DropdownMenuItem>Çıkış Yap</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button>Yeni Randevu Ekle</Button>
              <Button>Müşteri Ara</Button>
              <Button>Hizmet Ekle</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Takvim</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Calendar />
            </CardContent>
          </Card>
        </div>

        {/* WhatsApp Planlayıcı */}
        <div className="mt-6">
          <WhatsAppScheduler />
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Görseller
            </h2>
            <Button onClick={handleOpenDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Ekle
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {images.map((image) => (
              <Card key={image.id}>
                <CardContent>
                  <img
                    src={image.url}
                    alt={image.name}
                    className="rounded-md mb-2"
                  />
                  <h3 className="font-semibold">{image.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {image.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
