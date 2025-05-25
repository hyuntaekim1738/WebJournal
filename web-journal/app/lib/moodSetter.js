import { GoogleGenAI } from "@google/genai";



const moodList = ["happy", "sad", "angry", "anxious", "calm", "excited", "bored", "hopeful", "confused", "lonely", "grateful", "overwhelmed", "relaxed", "tired"];

export async function analyzeMood(journalEntry) {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
    Read the following journal entry and assign it one mood from the following list: ${moodList}
    
    Respond only with the mood.
    
    Journal entry:
    "${journalEntry}"
    `,
    });
    console.log(response);
    console.log(response.text);
    return response.text;
}

export const moodColors = {
    happy: "#B8860B",        // dark goldenrod
    sad: "#104E8B",          // dark dodger blue
    angry: "#8B2500",        // dark red-orange
    anxious: "#5D3FD3",      // darker blue-violet
    calm: "#2E8B57",         // sea green
    excited: "#C71585",      // medium violet red
    bored: "#696969",        // dim gray
    hopeful: "#008B8B",      // dark cyan
    confused: "#6A5ACD",     // slate blue
    lonely: "#2F4F4F",       // dark slate gray
    grateful: "#6B8E23",     // olive drab
    overwhelmed: "#8B0000",  // dark red
    relaxed: "#008080",      // teal
    tired: "#808080"         // gray
  };  
