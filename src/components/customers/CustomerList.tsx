
import { Customer } from "@/types/customer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, FileEdit, Trash2, Calendar as CalendarIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onCreateAppointment: (customer: Customer) => void;
}

export function CustomerList({
  customers,
  onEdit,
  onDelete,
  onCreateAppointment,
}: CustomerListProps) {
  return (
    <div className="grid gap-6">
      {customers.map((customer) => (
        <Card key={customer.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">
                  {customer.name.split(' ').map(name => name[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">{customer.phone}</p>
                <div className="flex gap-2 mt-1">
                  {customer.treatments.map((treatment, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                    >
                      {treatment}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm text-right">
                <p>Son Ziyaret: <span className="text-muted-foreground">{customer.lastVisit}</span></p>
                <p>Sonraki Randevu: <span className="text-muted-foreground">{customer.nextAppointment}</span></p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://wa.me/${customer.phone.replace(/\D/g, '')}`, '_blank')}
                >
                  WhatsApp
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onSelect={() => onEdit(customer)}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Düzenle
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onCreateAppointment(customer)}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Randevu Oluştur
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive"
                      onSelect={() => onDelete(customer)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Sil
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
