import type { CreateEventPayload, Event } from "../types/event";
import { apiRequest } from "../utils/api_request";
import constants from "../utils/constants";

const eventApiUrl = `${constants.API_BASE_URL}/events`;

const getAllEvent = async (): Promise<Event[]> => {
  try {
    const response = await apiRequest<{ events: Event[] }>(eventApiUrl, {
      insertToken: true,
    });

    if (!response.success) {
      throw new Error(response.error || `Erreur HTTP: ${response.status}`);
    }

    const allEvents = response.data?.events || [];
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
    const response = await apiRequest<{ events: Event[] }>(
      `${eventApiUrl}/with-users`,
      {
        insertToken: true,
      }
    );

    if (!response.success) {
      throw new Error(response.error || `Erreur HTTP: ${response.status}`);
    }

    const allEvents = response.data?.events || [];
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

const createEvent = async (newEvent: CreateEventPayload): Promise<Event> => {
  try {
    console.log(newEvent);
    const response = await apiRequest<{ event: Event }>(eventApiUrl, {
      method: "POST",
      insertToken: true,
      body: newEvent,
    });

    if (!response.success) {
      throw new Error(response.error || `Erreur HTTP: ${response.status}`);
    }

    const record = response.data!.event;
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
