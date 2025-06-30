import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Star, Shirt, Palette, User, Play, RotateCcw, Upload, Settings } from 'lucide-react';


interface FloatingBubble {
  id: number;
  icon: React.ReactNode;
  bgColor: string;
  size: string;
  position: { top: string; left?: string; right?: string; bottom?: string };
  delay: string;
  duration: string;
}

interface Avatar {
  id: string;
  label: string;
  bgColor: string;
}

interface StylePreferences {
  prendaTipo: string;
  estiloPreferido: string;
  avatar: string;
  userPhoto: File | null;
}

interface DemoResult {
  category: string;
  size: string;
  description: string;
  image: string;
}

const floatingBubbles: FloatingBubble[] = [
  {
    id: 1,
    icon: <Camera className="w-8 h-8 text-white" />,
    bgColor: 'bg-light-cyan/30',
    size: 'w-16 h-16',
    position: { top: '20px', left: '40px' },
    delay: '0s',
    duration: '3s'
  },
  {
    id: 2,
    icon: <Star className="w-10 h-10 text-white" />,
    bgColor: 'bg-fashion-pink/40',
    size: 'w-20 h-20',
    position: { top: '128px', right: '64px',  },
    delay: '1s',
    duration: '4s'
  },
  {
    id: 3,
    icon: <Shirt className="w-7 h-7 text-white" />,
    bgColor: 'bg-soft-blue/35',
    size: 'w-14 h-14',
    position: { bottom: '128px', left: '80px' },
    delay: '2s',
    duration: '3.5s'
  },
  {
    id: 4,
    icon: <Palette className="w-9 h-9 text-white" />,
    bgColor: 'bg-soft-magenta/30',
    size: 'w-18 h-18',
    position: { bottom: '64px', right: '128px' },
    delay: '0.5s',
    duration: '3.8s'
  },
  {
    id: 5,
    icon: <Settings className="w-6 h-6 text-white" />,
    bgColor: 'bg-vibrant-cyan/40',
    size: 'w-12 h-12',
    position: { top: '50%', left: '33%' },
    delay: '1.5s',
    duration: '4.2s'
  }
];

const avatars: Avatar[] = [
  { id: 'avatar-m1', label: 'M1', bgColor: 'bg-light-cyan' },
  { id: 'avatar-f1', label: 'F1', bgColor: 'bg-fashion-pink' },
  { id: 'avatar-m2', label: 'M2', bgColor: 'bg-soft-blue' },
  { id: 'avatar-f2', label: 'F2', bgColor: 'bg-soft-magenta' }
];

const prendaOptions = [
  { value: 'camiseta', label: 'Camiseta / Top' },
  { value: 'vestido', label: 'Vestido' },
  { value: 'chaqueta', label: 'Chaqueta / Abrigo' },
  { value: 'pantalon', label: 'Pantalón' },
  { value: 'falda', label: 'Falda' },
  { value: 'blusa', label: 'Blusa' },
  { value: 'sueter', label: 'Suéter' },
  { value: 'shorts', label: 'Shorts' },
  { value: 'camisa', label: 'Camisa' },
  { value: 'blazer', label: 'Blazer' }
];

const estiloOptions = [
  { value: 'casual_chic', label: 'Casual Chic' },
  { value: 'urbano_moderno', label: 'Urbano Moderno' },
  { value: 'elegante_formal', label: 'Elegante Formal' },
  { value: 'deportivo_activo', label: 'Deportivo Activo' },
  { value: 'bohemio', label: 'Bohemio' },
  { value: 'minimalista', label: 'Minimalista' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'romantico', label: 'Romántico' }
];

export default function VirtualStylingDemo() {
  const [preferences, setPreferences] = useState<StylePreferences>({
    prendaTipo: '',
    estiloPreferido: '',
    avatar: '',
    userPhoto: null
  });
  
  const [demoState, setDemoState] = useState<'initial' | 'loading' | 'results'>('initial');
  const [result, setResult] = useState<DemoResult | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreferences(prev => ({ ...prev, userPhoto: file, avatar: '' }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatarId: string) => {
    setPreferences(prev => ({ ...prev, avatar: avatarId, userPhoto: null }));
    setPreviewImage('');
  };

  const handleRunDemo = async () => {
    if (!preferences.prendaTipo || !preferences.estiloPreferido || (!preferences.avatar && !preferences.userPhoto)) {
      return;
    }

    setDemoState('loading');

    // Simulate API processing
    setTimeout(() => {
      const categories = ['Camiseta Casual Chic', 'Vestido Elegante', 'Chaqueta Urbana', 'Blusa Romántica'];
      const sizes = ['XS', 'S', 'M', 'L', 'XL'];
      const descriptions = [
        'Combina esta pieza con unos jeans oscuros y sneakers blancos para un look casual moderno.',
        'Perfecto para ocasiones especiales, combínalo con tacones y accesorios dorados.',
        'Ideal para un look urbano, úsalo con pantalones negros y botas.',
        'Un estilo dulce y femenino, combínalo con una falda midi y flats.'
      ];

      const randomResult: DemoResult = {
        category: categories[Math.floor(Math.random() * categories.length)],
        size: sizes[Math.floor(Math.random() * sizes.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=400'
      };

      setResult(randomResult);
      setDemoState('results');
    }, 2500);
  };

  const handleReset = () => {
    setDemoState('initial');
    setResult(null);
    setPreferences({
      prendaTipo: '',
      estiloPreferido: '',
      avatar: '',
      userPhoto: null
    });
    setPreviewImage('');
  };


  return (
    <div className="w-full font-sans antialiased">
      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingBubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`absolute ${bubble.size} ${bubble.bgColor} backdrop-blur-sm rounded-full flex items-center justify-center animate-float floating-bubble`}
            style={{
              ...bubble.position,
              '--delay': bubble.delay,
              '--duration': bubble.duration,
              animationDelay: bubble.delay,
              animationDuration: bubble.duration
            } as React.CSSProperties}
          >
            {bubble.icon}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experimenta la <span className="gradient-text">Magia de NextIA</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sube una foto o elige un avatar, selecciona tus preferencias y el tipo de prenda. ¡Nuestra IA te mostrará recomendaciones personalizadas al instante!
          </p>
        </div>

        {/* Interactive Demo Container */}
        <div className="bg-vibrant-cyan/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border-2 border-white/20 w-full max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Configuration Panel */}
            <div className="space-y-8">
              {/* Virtual Model Section */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-2xl font-semibold mb-4 text-dark-primary flex items-center">
                  <User className="w-8 h-8 text-vibrant-cyan mr-3" />
                  Tu Modelo Virtual
                </h3>
                
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50">
                  <label className="block text-base font-medium mb-3 text-gray-700">
                    Sube tu foto o elige un avatar:
                  </label>
                  
                  {/* File Upload Area */}
                  <div 
                    className="border-2 border-dashed border-vibrant-cyan/50 rounded-xl p-6 text-center mb-4 bg-vibrant-cyan/5 hover:bg-vibrant-cyan/10 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png"
                      className="sr-only"
                      onChange={handleFileUpload}
                    />
                    
                    {previewImage ? (
                      <div className="w-full h-48 rounded-lg overflow-hidden mb-2 border-2 border-vibrant-cyan bg-gray-100">
                        <img src={previewImage} alt="Vista previa" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-vibrant-cyan mx-auto mb-2" />
                        <p className="text-gray-600 text-sm">
                          Arrastra o <span className="font-semibold text-vibrant-cyan">selecciona foto</span>
                        </p>
                      </>
                    )}
                  </div>

                  {/* Avatar Selection Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {avatars.map((avatar) => (
                      <label key={avatar.id} className="cursor-pointer group">
                        <input
                          type="radio"
                          name="avatar_choice"
                          value={avatar.id}
                          className="sr-only"
                          checked={preferences.avatar === avatar.id}
                          onChange={() => handleAvatarSelect(avatar.id)}
                        />
                        <div className={`w-full aspect-[3/4] ${avatar.bgColor} rounded-lg flex items-center justify-center text-white font-bold text-lg border-2 ${
                          preferences.avatar === avatar.id 
                            ? 'border-white ring-4 ring-white ring-offset-2' 
                            : 'border-transparent group-hover:border-white/50'
                        } transition-all duration-200 group-hover:scale-105`}>
                          {avatar.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Style Preferences Section */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-semibold mb-4 text-dark-primary flex items-center">
                  <Palette className="w-8 h-8 text-fashion-pink mr-3" />
                  Define tu Estilo
                </h3>
                
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 space-y-4">
                  <div>
                    <label className="block text-base font-medium mb-2 text-gray-700">
                      Tipo de Prenda
                    </label>
                    <Select
                      value={preferences.prendaTipo}
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, prendaTipo: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona el tipo de prenda" />
                      </SelectTrigger>
                      <SelectContent>
                        {prendaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-base font-medium mb-2 text-gray-700">
                      Estilo Preferido
                    </label>
                    <Select
                      value={preferences.estiloPreferido}
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, estiloPreferido: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona tu estilo preferido" />
                      </SelectTrigger>
                      <SelectContent>
                        {estiloOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Action Button */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
  <Button 
    className="w-full text-white px-6 py-4 rounded-full font-medium text-lg h-auto relative overflow-hidden border-0 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    style={{
      background: "linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(0, 200, 255, 0.12) 50%, rgba(0, 150, 255, 0.08) 100%)",
      backdropFilter: "blur(10px)",
      boxShadow: `
        0 8px 32px rgba(0, 255, 255, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.03),
        0 0 20px rgba(0, 255, 255, 0.1)
      `,
      border: "1px solid rgba(255, 255, 255, 0.15)",
    }}
    onClick={handleRunDemo}
    disabled={!preferences.prendaTipo || !preferences.estiloPreferido || (!preferences.avatar && !preferences.userPhoto)}
  >
    {/* Efecto de destello principal */}
    <div
      className="absolute top-2 left-4 w-3 h-3 bg-white rounded-full opacity-80"
      style={{
        filter: "blur(1px)",
        animation: "sparkle 2s ease-in-out infinite",
      }}
    />
    
    {/* Destello secundario */}
    <div
      className="absolute top-4 right-6 w-2 h-2 bg-white rounded-full opacity-60"
      style={{
        filter: "blur(0.5px)",
        animation: "sparkle 2.5s ease-in-out infinite 0.5s",
      }}
    />
    
    {/* Destello pequeño */}
    <div
      className="absolute bottom-3 left-8 w-1 h-1 bg-white rounded-full opacity-70"
      style={{
        filter: "blur(0.3px)",
        animation: "sparkle 1.8s ease-in-out infinite 1s",
      }}
    />
    
    {/* Reflejo curvo superior */}
    <div
      className="absolute top-1 left-2 right-2 h-4 rounded-full opacity-30"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.6) 70%, transparent 100%)",
        filter: "blur(2px)",
      }}
    />
    
    {/* Contenido original del botón */}
    <span className="relative z-10 flex items-center justify-center">
      <Play className="w-5 h-5 mr-2" />
      Ver Mis Recomendaciones
    </span>
    
    <style jsx>{`
      @keyframes sparkle {
        0%, 100% { 
          opacity: 0.3; 
          transform: scale(1);
        }
        50% { 
          opacity: 1; 
          transform: scale(1.2);
        }
      }
    `}</style>
  </Button>
</div>
            </div>

            {/* Results Panel */}
            <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 min-h-[600px] flex flex-col items-center justify-center relative animate-bounce-soft card-shadow">
              <CardContent className="p-8 w-full">
                {demoState === 'initial' && (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-vibrant-cyan/20 to-fashion-pink/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <Settings className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-lg text-gray-600">
                      Configura tus opciones a la izquierda y <span className="font-semibold gradient-text">descubre tu look ideal.</span>
                    </p>
                  </div>
                )}

                {demoState === 'loading' && (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 border-4 border-vibrant-cyan border-t-transparent rounded-full animate-spin mb-6"></div>
                    <p className="text-gray-600 font-semibold text-lg mb-2">Analizando tu estilo...</p>
                    <p className="text-sm text-gray-500">La IA está trabajando para ti.</p>
                  </div>
                )}

                {demoState === 'results' && result && (
                  <div className="w-full text-center">
                    <div className="relative w-full max-w-xs mx-auto aspect-[3/4] rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 mb-6 overflow-hidden shadow-lg border-2 border-vibrant-cyan/30">
                      <img 
                        src={result.image} 
                        alt="Virtual model for style demonstration" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-vibrant-cyan mb-1">{result.category}</p>
                        <h4 className="text-xl font-bold text-dark-primary">
                          Talla Sugerida: <span className="text-vibrant-cyan">{result.size}</span>
                        </h4>
                      </div>
                      
                      <div className="bg-gradient-to-br from-vibrant-cyan/10 to-fashion-pink/10 p-4 rounded-lg border border-white/50">
                        <p className="text-sm text-gray-600 mb-1 font-semibold">Look Recomendado:</p>
                        <p className="text-gray-800 text-sm">{result.description}</p>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 border-2 border-vibrant-cyan text-vibrant-cyan hover:bg-vibrant-cyan hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
                        variant="outline"
                        onClick={handleReset}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Probar Otro Estilo
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-gray-500 text-sm italic animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          *Esta es una simulación con datos de ejemplo. La integración real ofrece una precisión y personalización aún mayores.
        </p>
      </div>
    </div>
  );
}