import type { CreateEventPayload, Event } from "../types/event";
import constants from "../utils/constants";

const eventApiUrl = `${constants.API_BASE_URL}/events`;
const getAllEvent = async (): Promise<Event[]> => {
  try {
    const response = await fetch(eventApiUrl, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const jsonDecoded = await response.json();
    const allEvents: Event[] = jsonDecoded.events;
    console.log("allEvents", allEvents);
    return allEvents;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Erreur de la recuperation des événements :", e.message);
    } else {
      console.error("Erreur de la recuperation des événements :", e);
    }
    throw e;
  }
};

const getAllEventWithUsers = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${eventApiUrl}/with-users`, {
      credentials: "include",
    });
    if (!response.ok) {
      const jsonDecoded = await response.json();

      throw new Error(`Erreur HTTP: ${jsonDecoded.message}  `);
    }
    const jsonDecoded = await response.json();
    const allEvents: Event[] = jsonDecoded.events;
    console.log("allEvents", allEvents);
    return allEvents;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Erreur de la recuperation des événements :", e.message);
    } else {
      console.error("Erreur de la recuperation des événements :", e);
    }
    throw e;
  }
};

const createEvent = async (newEvent: CreateEventPayload) => {
  try {
    console.log(newEvent);
    const response = await fetch(eventApiUrl, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const jsonDecoded = await response.json();
    const record: Event = jsonDecoded.event;
    console.log(record);
    return record;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Erreur de la création de l'événement :", e.message);
    } else {
      console.error("Erreur de la création de l'événement :", e);
    }
    throw e;
  }
};

const eventApi = {
  createEvent,
  getAllEvent,
  getAllEventWithUsers,
};

export default eventApi;
