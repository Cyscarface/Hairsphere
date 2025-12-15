import React, { useState } from 'react';
import { HairTypeInfo } from '../types';
import HairDiagnostic from './HairDiagnostic';

const HairEducation: React.FC = () => {
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  const hairTypes: HairTypeInfo[] = [
    {
      id: 'type1',
      type: 'Type 1 (Straight)',
      description: 'Naturally straight hair. It tends to be shiny due to natural oils traveling easily down the shaft, but can get greasy quickly.',
      careTips: ['Avoid heavy oils', 'Use volumizing shampoos', 'Wash more frequently'],
      imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80',
    },
    {
      id: 'type2',
      type: 'Type 2 (Wavy)',
      description: 'Hair has a gentle wave pattern forming an "S" shape. Can be prone to frizz and needs lightweight moisture.',
      careTips: ['Use mousse for definition', 'Avoid heavy creams', 'Scrunch to encourage waves'],
      imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
    },
    {
      id: 'type3',
      type: 'Type 3 (Curly)',
      description: 'Definite "S" shaped curls ranging from loose loops to tight corkscrews. Prone to dryness and damage.',
      careTips: ['Deep condition regularly', 'Detangle when wet', 'Use the rake and shake method'],
      imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80',
    },
    {
      id: 'type4',
      type: 'Type 4 (Coily/Kinky)',
      description: 'Tight coils or zig-zag patterns. Very fragile and dry as oils have trouble moving down the shaft. Shrinkage is common.',
      careTips: ['Prioritize heavy moisture', 'Low manipulation styles', 'Sleep with satin protection'],
      imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a90406430b5?w=800&q=80',
    },
  ];

  if (showDiagnostic) {
    return (
      <div className="py-8">
        <HairDiagnostic 
          onComplete={(result) => console.log('Diagnostic result:', result)}
          onClose={() => setShowDiagnostic(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Hair Knowledge Hub</h1>
        <p className="text-gray-600">Understand your crown. Select a category below to learn more about specific hair textures and best practices.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {hairTypes.map((info) => (
          <div key={info.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-peach-100 hover:shadow-lg transition-all duration-300 group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={info.imageUrl} 
                alt={info.type} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl font-serif font-bold">{info.type}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 leading-relaxed mb-4">{info.description}</p>
              
              <h4 className="font-bold text-peach-800 text-sm uppercase tracking-wide mb-3">Care Essentials</h4>
              <ul className="space-y-2">
                {info.careTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-peach-400 mt-1.5"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-peach-50 rounded-3xl p-8 border border-peach-200 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-serif text-gray-800 mb-2">Discover Your Unique Hair Profile</h2>
            <p className="text-gray-700 mb-4">
              Not sure if you have high porosity or low porosity? Does your hair feel dry no matter what? 
              Take our 2-minute diagnostic to get a personalized care blueprint.
            </p>
            <div className="flex gap-4">
                <button 
                  onClick={() => setShowDiagnostic(true)}
                  className="bg-gray-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors shadow-lg shadow-gray-200"
                >
                    Start Diagnostic Tool
                </button>
            </div>
          </div>
          <div className="hidden md:block text-9xl">
            ✨
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairEducation;
