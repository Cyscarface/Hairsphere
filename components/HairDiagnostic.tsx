import React, { useState } from 'react';
    import { DiagnosticResult } from '../types';
    import { ChevronRight, ChevronLeft, RefreshCw, CheckCircle, AlertCircle, Info } from 'lucide-react';
    
    interface HairDiagnosticProps {
      onComplete: (result: DiagnosticResult) => void;
      onClose: () => void;
    }
    
    type QuestionId = 'curlPattern' | 'porosity' | 'density' | 'texture';
    
    interface Question {
      id: QuestionId;
      text: string;
      description?: string;
      options: {
        label: string;
        value: string;
        icon?: string;
      }[];
    }
    
    const questions: Question[] = [
      {
        id: 'curlPattern',
        text: "When your hair is air-dried without product, what is its natural shape?",
        options: [
          { label: "Straight, no curl", value: "Type 1", icon: "Creating a straight line" },
          { label: "'S' shaped waves", value: "Type 2", icon: "Gentle waves" },
          { label: "Defined loops or corkscrews", value: "Type 3", icon: "Springy curls" },
          { label: "Tight coils or zig-zags", value: "Type 4", icon: "Dense coils" },
        ]
      },
      {
        id: 'porosity',
        text: "How does your hair react to water?",
        description: "Think about when you're in the shower or spraying water on dry hair.",
        options: [
          { label: "Water beads up/sits on top, takes forever to get wet", value: "Low", icon: "💧" },
          { label: "Gets wet easily, retains moisture well", value: "Medium", icon: "✨" },
          { label: "Absorbs water instantly but dries very fast", value: "High", icon: "🧽" },
        ]
      },
      {
        id: 'density',
        text: "Part your hair down the middle. How much scalp do you see?",
        options: [
          { label: "A lot of scalp is visible", value: "Low", icon: "⚪" },
          { label: "Some scalp is visible", value: "Medium", icon: "🌗" },
          { label: "Very little to no scalp is visible", value: "High", icon: "⚫" },
        ]
      },
      {
        id: 'texture',
        text: "Take a single strand between your fingers. How does it feel?",
        options: [
          { label: "Barely feel it (like silk)", value: "Fine" },
          { label: "Feels like a cotton thread", value: "Medium" },
          { label: "Feels rough or wiry", value: "Coarse" },
        ]
      }
    ];
    
    const HairDiagnostic: React.FC<HairDiagnosticProps> = ({ onComplete, onClose }) => {
      const [step, setStep] = useState(0);
      const [answers, setAnswers] = useState<Record<string, string>>({});
      const [result, setResult] = useState<DiagnosticResult | null>(null);
    
      const handleAnswer = (value: string) => {
        const currentQuestion = questions[step];
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);
    
        if (step < questions.length - 1) {
          setStep(step + 1);
        } else {
          calculateResult(newAnswers);
        }
      };
    
      const calculateResult = (finalAnswers: Record<string, string>) => {
        // Logic to generate recommendations
        const hairType = finalAnswers['curlPattern'] as any;
        const porosity = finalAnswers['porosity'] as any;
        const density = finalAnswers['density'] as any;
        const texture = finalAnswers['texture'] as any;
    
        let routine = "";
        let ingredientsToLove: string[] = [];
        let ingredientsToAvoid: string[] = [];
        let stylingTip = "";
    
        // Basic Logic Matrix
        if (porosity === 'Low') {
          routine += "Use heat when deep conditioning to open cuticles. Apply products to soaking wet hair. ";
          ingredientsToLove.push('Argan Oil', 'Grapeseed Oil', 'Jojoba Oil', 'Humectants (Glycerin)');
          ingredientsToAvoid.push('Heavy Butters (Shea)', 'Too much Protein');
        } else if (porosity === 'High') {
          routine += "Focus on protein treatments to fill gaps in the cuticle. Seal moisture with heavier oils/butters (LCO Method). ";
          ingredientsToLove.push('Shea Butter', 'Castor Oil', 'Hydrolyzed Protein', 'Aloe Vera');
          ingredientsToAvoid.push('High pH Shampoos');
        } else {
           routine += "Maintain balance. You don't need extreme measures, just consistent moisture and gentle cleansing. ";
           ingredientsToLove.push('Coconut Oil', 'Honey', 'Almond Oil');
        }
    
        if (hairType === 'Type 4') {
          stylingTip = "Protective styling is your best friend. Keep ends tucked away to retain length.";
          routine += "Detangle gently with fingers or a wide-tooth comb only when wet and conditioned.";
        } else if (hairType === 'Type 3') {
          stylingTip = "Use the 'rake and shake' method or shingling to define curls. Avoid touching while drying to prevent frizz.";
        } else if (hairType === 'Type 2') {
          stylingTip = "Scrunch products in upwards. Use a diffuser for volume.";
          ingredientsToAvoid.push('Heavy Oils (will weigh down waves)');
        } else {
          stylingTip = "Keep it simple. Focus on scalp health and volume.";
        }
    
        const diagnosis: DiagnosticResult = {
          hairType,
          porosity,
          density,
          texture,
          recommendations: {
            routine,
            ingredientsToLove,
            ingredientsToAvoid,
            stylingTip
          }
        };
    
        setResult(diagnosis);
      };
    
      if (result) {
        return (
          <div className="bg-white rounded-3xl p-8 border border-peach-200 shadow-lg animate-fade-in max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-peach-100 rounded-full flex items-center justify-center mx-auto mb-4 text-peach-600">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-3xl font-serif text-gray-900 mb-2">Your Hair Profile</h2>
              <p className="text-gray-500">Based on your answers, here is your personalized blueprint.</p>
            </div>
    
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Type', value: result.hairType },
                { label: 'Porosity', value: result.porosity },
                { label: 'Density', value: result.density },
                { label: 'Texture', value: result.texture },
              ].map((item, i) => (
                <div key={i} className="bg-peach-50 p-4 rounded-xl text-center border border-peach-100">
                  <span className="block text-xs uppercase tracking-wide text-gray-500 mb-1">{item.label}</span>
                  <span className="font-bold text-gray-800 text-lg">{item.value}</span>
                </div>
              ))}
            </div>
    
            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif text-xl text-gray-800 mb-3">Recommended Strategy</h3>
                <p className="text-gray-600 leading-relaxed">{result.recommendations.routine}</p>
              </div>
    
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                       Ingredients to Love
                    </h4>
                    <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                       {result.recommendations.ingredientsToLove.map((ing, i) => (
                          <li key={i}>{ing}</li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                    <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                       Ingredients to Watch
                    </h4>
                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                       {result.recommendations.ingredientsToAvoid.map((ing, i) => (
                          <li key={i}>{ing}</li>
                       ))}
                    </ul>
                 </div>
              </div>
    
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                 <Info className="text-blue-500 flex-shrink-0 mt-1" />
                 <div>
                    <h4 className="font-bold text-blue-800 mb-1">Pro Styling Tip</h4>
                    <p className="text-blue-700 text-sm">{result.recommendations.stylingTip}</p>
                 </div>
              </div>
            </div>
    
            <div className="mt-8 flex gap-4 justify-center">
               <button 
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
               >
                 Close
               </button>
               <button 
                onClick={() => {
                  setStep(0);
                  setResult(null);
                  setAnswers({});
                }}
                className="px-6 py-3 border border-peach-300 text-peach-700 font-medium rounded-xl hover:bg-peach-50 transition-colors flex items-center gap-2"
               >
                 <RefreshCw size={18} /> Retake Test
               </button>
            </div>
    
            <p className="text-center text-xs text-gray-400 mt-6">
              Disclaimer: This tool is for educational purposes only and does not constitute medical advice.
            </p>
          </div>
        );
      }
    
      const currentQ = questions[step];
    
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-peach-200 shadow-xl min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
             <button 
              onClick={step === 0 ? onClose : () => setStep(step - 1)}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
             >
               <ChevronLeft />
             </button>
             <span className="text-sm font-medium text-peach-600">
               Question {step + 1} of {questions.length}
             </span>
             <div className="w-10"></div> {/* Spacer for centering */}
          </div>
    
          <div className="flex-1">
            <h2 className="text-2xl font-serif text-gray-900 mb-2">{currentQ.text}</h2>
            {currentQ.description && (
              <p className="text-gray-500 mb-6">{currentQ.description}</p>
            )}
    
            <div className="space-y-3 mt-6">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.value)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-peach-400 hover:bg-peach-50 transition-all flex items-center justify-between group"
                >
                  <span className="font-medium text-gray-700 group-hover:text-peach-900">{opt.label}</span>
                  {opt.icon && <span className="text-xl">{opt.icon}</span>}
                </button>
              ))}
            </div>
          </div>
    
          <div className="mt-8">
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
               <div 
                  className="bg-peach-500 h-full transition-all duration-300" 
                  style={{ width: `${((step) / questions.length) * 100}%` }}
               ></div>
            </div>
          </div>
        </div>
      );
    };
    
    export default HairDiagnostic;
    