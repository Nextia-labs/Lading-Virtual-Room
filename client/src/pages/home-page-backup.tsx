import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  Sparkles, 
  Camera, 
  Ruler, 
  Palette, 
  Share2, 
  ShoppingBag, 
  Smartphone,
  UserPlus,
  Heart,
  Star,
  CheckCircle,
  Menu,
  LogOut
} from "lucide-react";
import VirtualStylingDemo from "@/components/VirtualStylingDemo";
import ThemeToggle from "@/components/ui/ThemeToggle"



export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();


  const handleSubscribe = (plan: string) => {
    setLocation("/subscribe");
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-pearl-white text-dark-primary overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 z-50 w-[calc(100vw-var(--scrollbar-width))] bg-pearl-white/95 backdrop-blur-md border-b border-light-cyan/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-fashion-pink to-light-cyan rounded-full flex items-center justify-center">
                <Sparkles className="text-white text-lg" />
              </div>
              <span className="text-2xl font-bold text-dark-primary">Nextia</span>
            </div>        
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-dark-primary hover:text-fashionPink transition-colors">Features</a>
              <a href="#how-it-works" className="text-dark-primary hover:text-fashionPink transition-colors">How It Works</a>
              <a href="#testimonials" className="text-dark-primary hover:text-fashionPink transition-colors">Testimonials</a>
              <a href="#pricing" className="text-dark-primary hover:text-fashionPink transition-colors">Pricing</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                  onClick={handleLogout}
                  className="logout-button flex items-center gap-2 px-6 py-2 text-white rounded-full font-semibold text-sm transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
              </Button>
              <Button 
                onClick={() => handleSubscribe('pro')}
                className="button-started text-white px-6 py-2 rounded-full font-medium transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
            
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="text-dark-primary" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark-primary leading-tight mb-6">
                Try Before You{" "}
                <span className="bg-gradient-to-r from-fashion-pink to-light-cyan bg-clip-text text-transparent">
                  Buy
                </span>
              </h1>
              <p className="text-xl text-dark-primary/80 mb-8 leading-relaxed max-w-xl">
                Experience the future of fashion with Nextia's Virtual Room. Use cutting-edge AR technology to see how clothes look on you before making a purchase.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={() => handleSubscribe('pro')}
                  className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg"
                >
                  Start Virtual Fitting
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-dark-primary text-dark-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-dark-primary transition-all duration-300"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative mx-auto w-80 h-96 bg-gradient-to-b from-dark-primary to-gray-800 rounded-3xl p-2 shadow-2xl animate-float">
                <div className="w-full h-full bg-pearl-white rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-soft-blue/20 to-fashion-pink/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-fashion-pink to-light-cyan rounded-full flex items-center justify-center">
                        <CheckCircle className=" text-4xl" />
                      </div>
                      <p className="text-dark-primary font-medium">Virtual Fitting Active</p>
                      <p className="text-sm text-dark-primary/60 mt-1">Summer Dress - Size M</p>
                      <div className="mt-4 flex justify-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-fashion-pink animate-pulse"></div>
                        <div className="w-3 h-3 rounded-full bg-light-cyan animate-pulse delay-100"></div>
                        <div className="w-3 h-3 rounded-full bg-soft-blue animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-light-cyan rounded-full flex items-center justify-center animate-float delay-200">
                <Camera className="text-white text-xl" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-fashion-pink rounded-full flex items-center justify-center animate-float delay-100">
                <Sparkles className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features"  className={`py-20 bg-white text-black dark:bg-gradient-dark dark:text-pearl-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-trigger">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-primary mb-6">
              Revolutionary <span className="text-fashion-pink">Features</span>
            </h2>
            <p className="text-xl text-dark-primary/70 max-w-3xl mx-auto">
              Discover how Nextia's Virtual Room transforms your shopping experience with cutting-edge technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="text-light-cyan text-2xl" />,
                gradient: "from-fashion-pink to-light-cyan",
                title: "AR Try-On Technology",
                description: "Experience clothes on your body using advanced augmented reality. See how garments fit, move, and look from every angle."
              },
              {
                icon: <Ruler className="text-fashion-pink text-2xl" />,
                gradient: "from-soft-blue to-vibrant-cyan",
                title: "Perfect Size Matching",
                description: "Our AI analyzes your measurements to recommend the perfect size every time. No more returns due to poor fit."
              },
              {
                icon: <Palette className="text-soft-blue text-2xl" />,
                gradient: "from-soft-magenta to-fashion-pink",
                title: "Style Recommendations",
                description: "Get personalized style suggestions based on your preferences, body type, and fashion trends."
              },
              {
                icon: <Share2 className="text-soft-magenta text-2xl" />,
                gradient: "from-light-cyan to-soft-blue",
                title: "Social Sharing",
                description: "Share your virtual outfits with friends and get feedback before making a purchase decision."
              },
              {
                icon: <ShoppingBag className="text-vibrant-cyan text-2xl" />,
                gradient: "from-vibrant-cyan to-soft-magenta",
                title: "Seamless Shopping",
                description: "Integrate with major fashion retailers for a smooth shopping experience from try-on to checkout."
              },
              {
                icon: <Smartphone className="text-vibrant-pink text-2xl" />,
                gradient: "from-fashion-pink to-vibrant-cyan",
                title: "Multi-Platform Access",
                description: "Use Nextia on any device - smartphone, tablet, or desktop. Your virtual wardrobe syncs everywhere."
              }
            ].map((feature, index) => (
              <Card key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 scroll-trigger">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-dark-primary mb-4">{feature.title}</h3>
                  <p className="text-dark-primary/70 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-r from-plasma-white to-pearl-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-trigger">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-primary mb-6">
              How It <span className="text-vibrant-cyan">Works</span>
            </h2>
            <p className="text-xl text-dark-primary/70 max-w-3xl mx-auto">
              Get started with Nextia Virtual Room in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <UserPlus className="text-4xl pulse-icon" />,
                gradient: "from-fashion-pink to-light-cyan",
                number: "1",
                numberBg: "bg-soft-blue",
                title: "Create Your Profile",
                description: "Sign up and create your personal profile with basic measurements and style preferences."
              },
              {
                icon: <Camera className="text-4xl pulse-icon" />,
                gradient: "from-soft-blue to-vibrant-cyan",
                number: "2",
                numberBg: "bg-fashion-pink",
                title: "Scan & Try On",
                description: "Use your camera to scan yourself and instantly try on clothes using our AR technology."
              },
              {
                icon: <Heart className="text-4xl pulse-icon" />,
                gradient: "from-soft-magenta to-fashion-pink",
                number: "3",
                numberBg: "bg-light-cyan",
                title: "Love & Purchase",
                description: "Find your perfect fit and style, then purchase directly from our partner retailers."
              }
            ].map((step, index) => (
              <div key={index} className="text-center scroll-trigger">
                <div className="relative mb-8">
                  <div className={`w-32 h-32 bg-gradient-to-r ${step.gradient} rounded-full mx-auto flex items-center justify-center shadow-2xl`}>
                    {step.icon}
                  </div>
                  <div className={`absolute -top-2 -right-2 w-12 h-12 ${step.numberBg} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-dark-primary mb-4">{step.title}</h3>
                <p className="text-dark-primary/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 scroll-trigger">
            <Button 
              onClick={() => handleSubscribe('pro')}
              className="gradient-button text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg"
            >
              Try It Now - It's Free!
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-20 bg-white dark:bg-dark-primary`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-trigger">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-primary mb-6">
              What Our Users <span className="text-soft-magenta">Say</span>
            </h2>
            <p className="text-xl text-dark-primary/70 max-w-3xl mx-auto">
              Join thousands of fashion enthusiasts who've revolutionized their shopping experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Fashion Blogger",
                gradient: "from-fashion-pink to-light-cyan",
                review: "Nextia has completely changed how I shop for clothes. I can try on dozens of outfits in minutes and only buy what I know looks perfect on me!"
              },
              {
                name: "Michael Chen",
                role: "Busy Professional",
                gradient: "from-soft-blue to-vibrant-cyan",
                review: "As someone with no time to shop in stores, Nextia is a lifesaver. The size recommendations are spot-on, and I haven't returned a single item!"
              },
              {
                name: "Emily Rodriguez",
                role: "College Student",
                gradient: "from-soft-magenta to-fashion-pink",
                review: "The social sharing feature is amazing! I can get my friends' opinions before buying anything. It's like having a personal stylist in my pocket."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-pearl-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-trigger">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center mr-4`}>
                      <UserPlus className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark-primary">{testimonial.name}</h4>
                      <p className="text-dark-primary/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-fashion-pink fill-current" />
                    ))}
                  </div>
                  <p className="text-dark-primary/80 italic leading-relaxed">
                    "{testimonial.review}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mt-16 scroll-trigger">
            {[
              { number: "500K+", label: "Happy Users", color: "text-fashion-pink" },
              { number: "2M+", label: "Virtual Try-Ons", color: "text-vibrant-cyan" },
              { number: "95%", label: "Accuracy Rate", color: "text-soft-magenta" },
              { number: "80%", label: "Return Reduction", color: "text-light-cyan" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <p className="text-dark-primary/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="demo" className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VirtualStylingDemo />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20  bg-gradient-to-br from-plasma-white via-pearl-white to-soft-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-trigger">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-primary mb-6">
              Choose Your <span className="text-fashion-pink">Plan</span>
            </h2>
            <p className="text-xl text-dark-primary/70 max-w-3xl mx-auto">
              Start with a free plan or upgrade for advanced features and unlimited access
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Basic",
                price: "$9",
                description: "Perfect for casual shoppers",
                features: [
                  "10 virtual try-ons per month",
                  "Basic size recommendations",
                  "Mobile app access",
                  "Email support"
                ],
                buttonStyle: "border-2 border-fashion-pink text-fashion-pink hover:bg-fashion-pink hover:text-white",
                isPopular: false
              },
              {
                name: "Pro",
                price: "$29",
                description: "For fashion enthusiasts",
                features: [
                  "Unlimited virtual try-ons",
                  "Advanced AI recommendations",
                  "Social sharing features",
                  "Priority customer support",
                  "Style consultation sessions"
                ],
                buttonStyle: "gradient-button text-white",
                isPopular: true
              },
              {
                name: "Enterprise",
                price: "$99",
                description: "For businesses and retailers",
                features: [
                  "Everything in Pro",
                  "API access & integration",
                  "Custom branding options",
                  "Analytics dashboard",
                  "Dedicated account manager"
                ],
                buttonStyle: "border-2 border-soft-magenta text-soft-magenta hover:bg-soft-magenta hover:text-white",
                isPopular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-trigger relative ${plan.isPopular ? 'popular-glow' : ''}`}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-vibrant-cyan text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <CardContent className="p-0">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-dark-primary mb-2">{plan.name}</h3>
                    <p className="text-dark-primary/60 mb-6">{plan.description}</p>
                    <div className="text-5xl font-bold text-dark-primary mb-2">
                      {plan.price}<span className="text-xl font-normal">/mo</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className={`w-5 h-5 mr-3 ${plan.isPopular ? 'text-vibrant-cyan' : 'text-fashion-pink'}`} />
                        <span className="text-dark-primary/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleSubscribe(plan.name.toLowerCase())}
                    className="w-full py-3 rounded-full font-semibold transition-all duration-300 gradient-button text-white"
                  >
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 scroll-trigger">
            <p className="text-dark-primary/70 mb-4">All plans include a 14-day free trial. No credit card required.</p>
            <p className="text-sm text-dark-primary/50">Cancel anytime. Upgrade or downgrade your plan as needed.</p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-dark-primary text-plasma-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-fashion-pink to-light-cyan rounded-full flex items-center justify-center">
                  <Sparkles className="text-white text-lg" />
                </div>
                <span className="text-2xl font-bold">Nextia</span>
              </div>
              <p className="text-plasma-white/70 mb-6 leading-relaxed">
                Revolutionizing fashion shopping through cutting-edge virtual fitting technology.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Pricing</a></li>
                <li><a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Help Center</a></li>
                <li><a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">System Status</a></li>
                <li><a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Bug Reports</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">About Us</a></li>
                <li><a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Careers</a></li>
                <li><a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Press</a></li>
                <li><a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-plasma-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-plasma-white/70 text-sm mb-4 md:mb-0">
              © 2024 Nextia Virtual Room. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Privacy Policy</a>
              <a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Terms of Service</a>
              <a href="#" className="text-plasma-white/70 hover:text-fashion-pink transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
