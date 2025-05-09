# 📅 Google Meet Scheduler

A lightweight, TypeScript-first utility for creating Google Calendar events with integrated Google Meet links. Perfect for scheduling classes, meetings, interviews, and any event requiring a video conference — all with just a few lines of code.

---

## ✨ Features

- ✅ Easily create Google Calendar events
- 📎 Automatically generate Google Meet links
- 🌐 Customizable timezone support
- 🔐 Secure OAuth2 integration
- 📦 Lightweight with minimal dependencies
- 🔧 Fully written in TypeScript

---

## 📦 Installation

To install **Google Meet Scheduler** in your project, run:

```bash
npm install google-meet-scheduler
````

---

## 🛠️ Setup & Usage

### 1. Google Cloud Setup

Before using this package, make sure you set up a Google Cloud project:

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Enable the **Google Calendar API**.
4. Set up **OAuth2.0 Client ID credentials**.
5. Download the `credentials.json` file.

### 2. Import the Function

You can import the `createGoogleMeetEvent` function like this:

```ts
import { createGoogleMeetEvent } from 'google-meet-scheduler';
```

### 3. Example Usage

Here’s an example of how to use the `createGoogleMeetEvent` function to create a Google Calendar event with a Google Meet link:

```ts
import { createGoogleMeetEvent } from "google-meet-scheduler";

(async () => {
  const res = await createGoogleMeetEvent({ 
    summary: "Test Event",
    credentials: {
      clientId: "",
      clientSecret: "",
      redirectUri: "http://localhost:6999",
      refreshToken: "",
    },
  });

})();
```

### 4. Notes:

* Replace the credentials with your own OAuth2 credentials (Client ID, Client Secret, Refresh Token, and Redirect URI).
* The `createGoogleMeetEvent` function returns an object that includes the event details, including the generated Google Meet link.

---


---

## 📄 License

MIT © [Mahedi Hasan](https://github.com/Mahedi-Hasan10)

---

