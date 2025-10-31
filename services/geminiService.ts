
import { GoogleGenAI, Type } from "@google/genai";
import { Category, ListingItem, ItemDetails } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const listingSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'A unique identifier for the item.' },
      title: { type: Type.STRING, description: 'The main title of the item.' },
      subtitle: { type: Type.STRING, description: 'A short subtitle (e.g., airline, artist, genre).' },
      description: { type: Type.STRING, description: 'A brief one-sentence description.' },
      price: { type: Type.NUMBER, description: 'Ticket price, if applicable (e.g., flights).' },
    },
    required: ['id', 'title', 'subtitle', 'description']
  }
};

const detailsSchema = {
    movies: {
        type: Type.OBJECT,
        properties: {
            synopsis: { type: Type.STRING },
            cast: { type: Type.ARRAY, items: { type: Type.STRING } },
            director: { type: Type.STRING },
            duration: { type: Type.STRING },
            rating: { type: Type.STRING },
        },
        required: ['synopsis', 'cast', 'director', 'duration', 'rating']
    },
    concerts: {
        type: Type.OBJECT,
        properties: {
            artistBio: { type: Type.STRING },
            venue: { type: Type.STRING },
            date: { type: Type.STRING },
            popularSongs: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['artistBio', 'venue', 'date', 'popularSongs']
    },
    flights: {
        type: Type.OBJECT,
        properties: {
            flightNumber: { type: Type.STRING },
            departureTime: { type: Type.STRING },
            arrivalTime: { type: Type.STRING },
            duration: { type: Type.STRING },
            layovers: { type: Type.STRING },
            aircraft: { type: Type.STRING },
        },
        required: ['flightNumber', 'departureTime', 'arrivalTime', 'duration', 'layovers', 'aircraft']
    },
    sports: {
        type: Type.OBJECT,
        properties: {
            match: { type: Type.STRING },
            league: { type: Type.STRING },
            venue: { type: Type.STRING },
            date: { type: Type.STRING },
            teams: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['match', 'league', 'venue', 'date', 'teams']
    }
}

export const generateListings = async (category: Category): Promise<ListingItem[]> => {
  try {
    const prompt = `Generate a realistic-looking JSON array of 6 items for ${category.name} ticket bookings. Ensure each item has a unique id, title, subtitle, and a short description. For flights, include a realistic price.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: listingSchema,
        },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating listings:", error);
    // Return mock data on failure
    return Array.from({ length: 6 }).map((_, i) => ({
        id: `${category.id}-${i}`,
        title: `Error: Could not load ${category.name}`,
        subtitle: 'Please check API key and try again.',
        description: 'There was an issue fetching dynamic data from the Gemini API.'
    }));
  }
};

export const generateDetails = async (category: Category, itemTitle: string): Promise<ItemDetails | null> => {
    try {
        const prompt = `Generate detailed information as a JSON object for the following ${category.name} item: "${itemTitle}".`;
        const schema = detailsSchema[category.id];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: schema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating details:", error);
        return null;
    }
};
