
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";

const SacBakimDashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Saç Bakım Yönetim Paneli</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Bugünkü Randevular</CardTitle>
            <CardDescription>Günlük randevu listesi</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">4</p>
            <p className="text-sm text-gray-500">Toplam bugün için</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Haftalık İstatistikler</CardTitle>
            <CardDescription>Bu haftaki müşteri sayısı</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">18</p>
            <p className="text-sm text-gray-500">Geçen haftaya göre %15 artış</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Aylık Gelir</CardTitle>
            <CardDescription>Bu ay için toplam</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₺24,850</p>
            <p className="text-sm text-gray-500">Hedefin %82'si</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Randevu Takvimi</CardTitle>
            <CardDescription>Planlanan randevuları görüntüleyin</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Hizmetler</CardTitle>
            <CardDescription>Saç bakım hizmetlerimiz</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="popular">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="popular">Popüler</TabsTrigger>
                <TabsTrigger value="new">Yeni</TabsTrigger>
                <TabsTrigger value="all">Tümü</TabsTrigger>
              </TabsList>
              <TabsContent value="popular" className="mt-4">
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Keratin Bakımı</span>
                    <span className="font-bold">₺1,200</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Saç Botoksu</span>
                    <span className="font-bold">₺950</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Protein Tedavisi</span>
                    <span className="font-bold">₺750</span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="new" className="mt-4">
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Argan Yağı Bakımı</span>
                    <span className="font-bold">₺650</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Biyolüminans Tedavi</span>
                    <span className="font-bold">₺1,500</span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="all" className="mt-4">
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Keratin Bakımı</span>
                    <span className="font-bold">₺1,200</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Saç Botoksu</span>
                    <span className="font-bold">₺950</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Protein Tedavisi</span>
                    <span className="font-bold">₺750</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Argan Yağı Bakımı</span>
                    <span className="font-bold">₺650</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Nem Terapisi</span>
                    <span className="font-bold">₺550</span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SacBakimDashboard;
