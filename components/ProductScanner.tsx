import React, { useState, useRef } from 'react';
import { Upload, Camera, Loader2, CheckCircle2, AlertTriangle, XCircle, ScanLine } from 'lucide-react';
import { analyzeProductImage } from '../services/geminiService';
import { ProductAnalysisResult } from '../types';

const ProductScanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ProductAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    // Extract base64 data without the prefix
    const base64Data = selectedImage.split(',')[1];
    
    try {
      const result = await analyzeProductImage(base64Data);
      if (result) {
        setAnalysis(result);
      } else {
        setError("Could not analyze image. Please try a clearer photo of the ingredients list.");
      }
    } catch (err) {
      setError("An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'Good': return 'text-peach-700 bg-peach-50 border-peach-200'; // Teal
      case 'Caution': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Avoid': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSuitabilityIcon = (suitability: string) => {
    switch (suitability) {
      case 'Good': return <CheckCircle2 size={16} className="text-peach-700" />;
      case 'Caution': return <AlertTriangle size={16} className="text-orange-600" />;
      case 'Avoid': return <XCircle size={16} className="text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Ingredient Scanner</h1>
        <p className="text-gray-600">
          Upload a photo of any hair product's ingredient list. Our AI will decode the chemicals 
          and tell you if it's safe for your crown.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Upload Section */}
        <div className="md:col-span-2 space-y-4">
          <div 
            className={`
              border-2 border-dashed rounded-3xl h-80 flex flex-col items-center justify-center relative overflow-hidden transition-all
              ${selectedImage ? 'border-peach-500 bg-white' : 'border-peach-300 bg-peach-50 hover:bg-peach-100 cursor-pointer'}
            `}
            onClick={() => !selectedImage && fileInputRef.current?.click()}
          >
            {selectedImage ? (
              <>
                <img src={selectedImage} alt="Preview" className="w-full h-full object-contain p-4" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                    setAnalysis(null);
                  }}
                  className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-gray-600 hover:text-red-500 shadow-sm"
                >
                  <XCircle />
                </button>
              </>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-peach-200 rounded-full flex items-center justify-center mx-auto mb-4 text-peach-700">
                  <Camera size={32} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Upload Photo</h3>
                <p className="text-sm text-gray-500">Click to scan ingredients</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedImage || isAnalyzing}
            className={`
              w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all
              ${!selectedImage || isAnalyzing 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-peach-500 hover:bg-peach-600 hover:shadow-peach-200'}
            `}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <ScanLine /> Decode Ingredients
              </>
            )}
          </button>
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex gap-2">
              <AlertTriangle size={20} className="flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="md:col-span-3">
          {analysis ? (
            <div className="bg-white rounded-3xl border border-peach-200 shadow-sm overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-peach-100 bg-peach-50">
                <h2 className="text-2xl font-serif text-gray-900 mb-1">{analysis.productName}</h2>
                <div className="flex items-start gap-2 mt-2">
                    <span className="bg-white px-2 py-1 rounded text-xs font-bold text-gray-500 uppercase tracking-wide border border-gray-100">Verdict</span>
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{analysis.overallVerdict}"
                    </p>
                </div>
              </div>
              
              <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                   Detailed Breakdown
                </h3>
                
                <div className="space-y-3">
                  {analysis.ingredients.map((ing, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-100 hover:border-peach-200 hover:shadow-sm transition-all bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-gray-800">{ing.name}</h4>
                          <span className="text-xs text-gray-400 uppercase font-medium">{ing.function}</span>
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${getSuitabilityColor(ing.suitability)}`}>
                          {getSuitabilityIcon(ing.suitability)}
                          {ing.suitability}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {ing.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-100 rounded-3xl bg-white/50">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                <ScanLine size={32} />
              </div>
              <h3 className="text-xl font-serif text-gray-400 mb-2">Ready to Analyze</h3>
              <p className="text-gray-400 max-w-xs mx-auto">
                Upload a clear image of the back label. We'll identify sulfates, silicones, alcohols, and more.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductScanner;
