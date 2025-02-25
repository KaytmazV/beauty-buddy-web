
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerFormData } from "@/types/customer";
import { useState, useEffect } from "react";

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
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onCancel();
    onOpenChange(false);
  };

  return (
    <div className={`${isOpen ? 'fixed inset-0 bg-black/50 z-50' : 'hidden'}`}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {isEditing ? "Müşteriyi Düzenle" : "Yeni Müşteri"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            {isEditing ? "Müşteri bilgilerini düzenleyin" : "Yeni müşteri bilgilerini girin"}
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName">Ad Soyad</Label>
              <Input
                id="customerName"
                value={formData.name}
                onChange={(e) =>
                  onFormDataChange({ ...formData, name: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">Telefon</Label>
              <Input
                id="customerPhone"
                value={formData.phone}
                placeholder="+90 5XX XXX XX XX"
                onChange={(e) =>
                  onFormDataChange({ ...formData, phone: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="customerTreatments">Aldığı Hizmetler</Label>
              <Input
                id="customerTreatments"
                value={formData.treatments}
                placeholder="Hizmetleri virgülle ayırarak yazın"
                onChange={(e) =>
                  onFormDataChange({ ...formData, treatments: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={handleClose}>
              İptal
            </Button>
            <Button onClick={() => {
              onSubmit();
              handleClose();
            }}>
              {isEditing ? "Güncelle" : "Ekle"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
