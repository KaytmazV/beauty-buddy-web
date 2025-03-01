
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SacBakim = () => {
  return (
    <div className="container mx-auto py-24 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Saç Bakım Hizmetlerimiz</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Keratin Bakımı</h2>
          <p className="text-gray-600 mb-4">
            Profesyonel keratin bakımı ile saçlarınızı yeniden canlandırın. Kırık uçları onarır ve parlaklık kazandırır.
          </p>
          <p className="font-bold text-lg">₺1,200</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Saç Botoksu</h2>
          <p className="text-gray-600 mb-4">
            Saç botoksu ile saçlarınızı derinlemesine besleyin. Yıpranmış saçlar için ideal bir tedavi yöntemidir.
          </p>
          <p className="font-bold text-lg">₺950</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Protein Tedavisi</h2>
          <p className="text-gray-600 mb-4">
            Saçlarınıza protein takviyesi yaparak güçlendirin ve dökülmeleri azaltın.
          </p>
          <p className="font-bold text-lg">₺750</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Argan Yağı Bakımı</h2>
          <p className="text-gray-600 mb-4">
            Argan yağı ile saçlarınızı nemlendirin ve doğal parlaklık kazandırın.
          </p>
          <p className="font-bold text-lg">₺650</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Nem Terapisi</h2>
          <p className="text-gray-600 mb-4">
            Kuru ve mat saçlar için özel olarak geliştirilen nem terapisi ile saçlarınızı canlandırın.
          </p>
          <p className="font-bold text-lg">₺550</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Biyolüminans Tedavi</h2>
          <p className="text-gray-600 mb-4">
            Yeni nesil biyolüminans teknolojisi ile saçlarınıza doğal ışıltı katın.
          </p>
          <p className="font-bold text-lg">₺1,500</p>
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <Link to="/appointment">
          <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-2 rounded-md">
            Randevu Al
          </Button>
        </Link>
        
        <div className="mt-6">
          <Link to="/services/sac-bakim/dashboard" className="text-accent hover:underline">
            Saç Bakım Yönetim Paneline Git
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SacBakim;
