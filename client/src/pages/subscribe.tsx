import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const SubscribeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });

    setIsProcessing(false);

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Welcome to Nextia Pro! You are now subscribed.",
      });
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-dark-primary">Complete Your Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />
          <Button 
            type="submit" 
            disabled={!stripe || isProcessing}
            className="w-full gradient-button text-white font-semibold py-3 rounded-full transition-all duration-300"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Subscribe Now
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-dark-primary/60">
            Secure payment powered by Stripe
          </p>
          <p className="text-xs text-dark-primary/50 mt-2">
            Cancel anytime. No hidden fees.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Subscribe() {
  const [clientSecret, setClientSecret] = useState("");
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setLocation("/auth");
      return;
    }

    // Create subscription as soon as the page loads
    apiRequest("POST", "/api/create-subscription")
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          toast({
            title: "Subscription Error",
            description: "Unable to create subscription. Please try again.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Subscription Error",
          description: error.message,
          variant: "destructive",
        });
      });
  }, [user, setLocation, toast]);

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-vibrant-cyan mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-dark-primary mb-2">Setting up your subscription...</h2>
              <p className="text-dark-primary/60">This will only take a moment.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setLocation("/")}
            variant="ghost"
            className="mb-4 text-dark-primary hover:text-fashion-pink"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold text-dark-primary mb-4">
            Subscribe to <span className="text-fashion-pink">Nextia Pro</span>
          </h1>
          <p className="text-xl text-dark-primary/70 max-w-2xl mx-auto">
            Unlock unlimited virtual try-ons and advanced AI recommendations
          </p>
        </div>

        {/* Plan Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">
                <div className="text-3xl font-bold text-dark-primary mb-2">Pro Plan</div>
                <div className="text-5xl font-bold text-vibrant-cyan">$29<span className="text-xl font-normal">/month</span></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Unlimited virtual try-ons",
                  "Advanced AI recommendations",
                  "Social sharing features",
                  "Priority customer support",
                  "Style consultation sessions",
                  "Access to premium features"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-vibrant-cyan mr-3 flex-shrink-0" />
                    <span className="text-dark-primary/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-fashion-pink/10 to-light-cyan/10 rounded-lg">
                <p className="text-sm text-dark-primary/70 text-center">
                  <strong>14-day free trial included!</strong><br />
                  Cancel anytime, no questions asked.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <div>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <SubscribeForm />
            </Elements>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-dark-primary/70">
              Your payment information is secure and encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
