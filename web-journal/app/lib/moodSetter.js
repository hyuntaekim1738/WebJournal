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
    happy: "#FFD700",        // gold
    sad: "#1E90FF",          // blue
    angry: "#FF4500",        // reddish orangish
    anxious: "#8A2BE2",      // bluish purple
    calm: "#3CB371",         // green
    excited: "#FF69B4",      // pink
    bored: "#A9A9A9",        // gray
    hopeful: "#00CED1",      // like a turquoisish
    confused: "#9370DB",     // purple
    lonely: "#708090",       // grayer
    grateful: "#ADFF2F",     // greenish yellow
    overwhelmed: "#DC143C",  // super red
    relaxed: "#20B2AA",      // light green
    tired: "#C0C0C0"         // silver
};
