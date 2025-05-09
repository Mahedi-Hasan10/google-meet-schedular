import { google } from "googleapis";
import dayjs from "dayjs";

export interface GoogleMeetCredentials {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  refreshToken: string;
}

export interface CreateMeetEventOptions {
  summary?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  timeZone?: string;
  credentials: GoogleMeetCredentials;
}

export interface MeetEventResponse {
  success: boolean;
  meetLink?: string;
  eventId?: string;
  error?: string;
}

/**
 * Create a Google Calendar event with Google Meet link.
 */
export const createGoogleMeetEvent = async ({
  summary = "Scheduled Meeting",
  description = "Created via API",
  startTime,
  endTime,
  timeZone = "UTC",
  credentials,
}: CreateMeetEventOptions): Promise<MeetEventResponse> => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      credentials.clientId,
      credentials.clientSecret,
      credentials.redirectUri
    );

    oAuth2Client.setCredentials({
      refresh_token: credentials.refreshToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const start = startTime || dayjs().add(5, "minute").toDate();
    const end = endTime || dayjs(start).add(30, "minute").toDate();

    const event = {
      summary,
      description,
      start: {
        dateTime: start.toISOString(),
        timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone,
      },
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}`,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
    });

    return {
      success: true,
      meetLink: response.data?.hangoutLink || "",
      eventId: response.data.id ?? undefined,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Unknown error occurred",
    };
  }
};
