
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useBlogStore } from "@/store/blogStore";

const Blog = () => {
  const { posts, fetchPosts, isLoading } = useBlogStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
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

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
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
          )}

          {!isLoading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">Henüz blog yazısı bulunmuyor.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
