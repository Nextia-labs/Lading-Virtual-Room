import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Camera, Palette, Smartphone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, loginSchema, type InsertUser, type LoginData } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if already logged in
  if (user) {
    setLocation("/");
    return <div>Redirecting...</div>;
  }

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onLogin = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: InsertUser) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Column - Forms */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="from-fashion-pink to-light-cyan rounded-full flex items-center justify-center">
                <Sparkles className="text-white text-xl" />
              </div>
              <span className="text-4xl font-bold gradient-text">Nextia</span>
            </div>
            <h1 className="text-2xl font-bold text-dark-primary mb-2">Welcome to Virtual Room</h1>
            <p className="text-dark-primary/70">Join the future of fashion shopping</p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-dark-primary">Get Started</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>
                
                {/* Login Form */}
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your username" 
                                {...field}
                                className="border-gray-300 focus:border-fashion-pink focus:ring-fashion-pink"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Enter your password" 
                                {...field}
                                className="border-gray-300 focus:border-fashion-pink focus:ring-fashion-pink"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full gradient-button text-white font-semibold py-2 rounded-full transition-all duration-300"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Signing In..." : "Sign In"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                {/* Register Form */}
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Choose a username" 
                                {...field}
                                className="border-gray-300 focus:border-fashion-pink focus:ring-fashion-pink"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter your email" 
                                {...field}
                                className="border-gray-300 focus:border-fashion-pink focus:ring-fashion-pink"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Create a password (min 8 characters)" 
                                {...field}
                                className="border-gray-300 focus:border-fashion-pink focus:ring-fashion-pink"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full gradient-button text-white font-semibold py-2 rounded-full transition-all duration-300"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-dark-primary/60 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Right Column - Hero Section */}
        <div className="hidden lg:block">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-primary leading-tight mb-6">
              Try Before You{" "}
              <span className="bg-gradient-to-r from-fashion-pink to-light-cyan bg-clip-text text-transparent">
                Buy
              </span>
            </h2>
            <p className="text-xl text-dark-primary/80 leading-relaxed max-w-lg mx-auto">
              Experience the future of fashion with cutting-edge AR technology. See how clothes look on you before making a purchase.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: <Camera className="text-white text-2xl" />,
                gradient: "from-fashion-pink to-light-cyan",
                title: "AR Try-On",
                description: "Virtual fitting with advanced AR"
              },
              {
                icon: <Palette className="text-white text-2xl" />,
                gradient: "from-soft-blue to-vibrant-cyan",
                title: "Style AI",
                description: "Personalized recommendations"
              },
              {
                icon: <Smartphone className="text-white text-2xl" />,
                gradient: "from-soft-magenta to-fashion-pink",
                title: "Multi-Device",
                description: "Works on any device"
              },
              {
                icon: <Sparkles className="text-white text-2xl" />,
                gradient: "from-light-cyan to-soft-blue",
                title: "Perfect Fit",
                description: "95% size accuracy"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-dark-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-dark-primary/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { number: "500K+", label: "Users", color: "text-fashion-pink" },
              { number: "2M+", label: "Try-Ons", color: "text-vibrant-cyan" },
              { number: "95%", label: "Accuracy", color: "text-soft-magenta" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.number}</div>
                <p className="text-sm text-dark-primary/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
