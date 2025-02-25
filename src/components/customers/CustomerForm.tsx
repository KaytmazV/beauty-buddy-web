
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { CustomerFormData } from "@/types/customer";

interface CustomerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: CustomerFormData;
  onFormDataChange: (data: CustomerFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

export function CustomerForm({
  open,
  onOpenChange,
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  isEditing,
}: CustomerFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Müşteriyi Düzenle" : "Yeni Müşteri"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Müşteri bilgilerini düzenleyin" : "Yeni müşteri bilgilerini girin"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="customerName">Ad Soyad</Label>
            <Input
              id="customerName"
              value={formData.name}
              onChange={(e) =>
                onFormDataChange({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="customerPhone">Telefon</Label>
            <Input
              id="customerPhone"
              value={formData.phone}
              placeholder="+90 5XX XXX XX XX"
              onChange={(e) =>
                onFormDataChange({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="customerTreatments">Aldığı Hizmetler</Label>
            <Input
              id="customerTreatments"
              value={formData.treatments}
              placeholder="Hizmetleri virgülle ayırarak yazın"
              onChange={(e) =>
                onFormDataChange({ ...formData, treatments: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            İptal
          </Button>
          <Button onClick={onSubmit}>
            {isEditing ? "Güncelle" : "Ekle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
