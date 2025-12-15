import { GoogleGenAI, Type } from "@google/genai";
import { ProductAnalysisResult } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateHairAdvice = async (
  prompt: string, 
  history: { role: string; text: string }[]
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Error: API Key not configured.";

  try {
    const systemInstruction = `
      You are "HairSphere AI", a world-class trichologist and elite hair care specialist.
      Your goal is to help users grow and maintain healthy hair with a sense of luxury and self-care.
      You are knowledgeable about all hair types (Type 1A to 4C), porosity, and density.
      
      Guidelines:
      1. Tone: Sophisticated, premium, encouraging, and professional.
      2. Provide actionable, science-backed advice.
      3. If asked about routine, suggest specific product ingredients (e.g., "look for argan oil") rather than brand names unless asked.
      4. Keep answers concise but informative.
      5. The user's aesthetic is "Premium Mauve, Soft Pink, Gold & Navy". Feel free to use metaphors related to royalty, crowns, silk, rose petals, and luxury.
    `;
    
    let context = "";
    if (history.length > 0) {
      context = "Previous conversation:\n" + history.map(h => `${h.role}: ${h.text}`).join("\n") + "\n\n";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${context}User Query: ${prompt}`,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the hair knowledge base right now. Please try again later.";
  }
};

export const analyzeProductImage = async (base64Image: string): Promise<ProductAnalysisResult | null> => {
  const ai = getClient();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming JPEG/PNG from client, API handles detection reasonably well
              data: base64Image,
            }
          },
          {
            text: "Analyze the ingredients list in this beauty product image. Identify the product name if visible. List the key ingredients found, explaining their function and suitability for hair health (Good, Caution, Avoid, Neutral). Provide an overall short verdict."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING, description: "Name of the product or 'Unknown Product'" },
            overallVerdict: { type: Type.STRING, description: "A summary of whether this product is generally good or bad for hair." },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  function: { type: Type.STRING, description: "e.g., Preservative, Emollient, Surfactant" },
                  suitability: { type: Type.STRING, enum: ["Good", "Caution", "Avoid", "Neutral"] },
                  description: { type: Type.STRING, description: "Brief explanation of effects." }
                },
                required: ["name", "function", "suitability", "description"]
              }
            }
          },
          required: ["productName", "overallVerdict", "ingredients"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ProductAnalysisResult;
    }
    return null;

  } catch (error) {
    console.error("Product Analysis Error:", error);
    return null;
  }
};
