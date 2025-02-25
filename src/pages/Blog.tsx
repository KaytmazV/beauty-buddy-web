
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  author: string;
  content?: string;
  tags?: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Saç Boyama Trendleri 2024",
    description: "Bu yılın en popüler saç renkleri ve teknikleri",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486",
    category: "Saç Bakımı",
    date: "15 Mart 2024",
    author: "İlayda Bağ",
    tags: ["Saç", "Trend", "2024"]
  },
  {
    id: 2,
    title: "Doğal Cilt Bakım Rutini",
    description: "Evde uygulayabileceğiniz etkili cilt bakım önerileri",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
    category: "Cilt Bakımı",
    date: "12 Mart 2024",
    author: "İlayda Bağ",
    tags: ["Cilt Bakımı", "Doğal", "Rutin"]
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Güzellik & Bakım Blogu
            </h1>
            <p className="text-lg text-white/90">
              En son güzellik trendleri, bakım ipuçları ve uzman önerileri
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-accent">{post.category}</span>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <CardTitle className="text-xl font-medium hover:text-accent transition-colors">
                      <Link to="#">{post.title}</Link>
                    </CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-medium">
                          {post.author.split(' ').map(name => name[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
