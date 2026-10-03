import type { ArticleSection } from "@/lib/articles";

export const reactNativeSchedulingNotificationsSections: ArticleSection[] = [
  {
    id: "local-notifications",
    heading: "Local notifications",
    paragraphs: [
      "**A local notification** is a notification scheduled by an application for its own device.",
      "**expo-notifications** provides the function used to schedule the local notification.",
      "**Notifications** is the name used to access the imported package in this example.",
      {
        text: "**The import** makes the package available as Notifications.",
        block: {
          type: "command",
          label: "Notification library import",
          command: 'import * as Notifications from "expo-notifications";',
        },
      },
    ],
  },
  {
    id: "permission-and-device-checks",
    heading: "Permission and device checks",
    paragraphs: [
      "**The permission result** determines whether the example schedules a notification.",
      "**granted** means notification permission has been allowed.",
      "**A granted result** allows the scheduling call to run.",
      {
        text: "**An unsuccessful permission check** shows an alert on a physical device.",
        bullets: [
          "**The alert title** is Unable to schedule notification.",
          "**The alert message** asks the user to enable notification permission for Expo Go in settings.",
        ],
      },
      "**Device.isDevice** from expo-device checks whether the application is running on a physical device.",
      "**The device check** keeps the permission alert from appearing on a simulator.",
      "**A simulator** fails silently in this example.",
    ],
  },
  {
    id: "notification-content-and-triggers",
    heading: "Notification content and triggers",
    paragraphs: [
      "**Notifications.scheduleNotificationAsync** schedules a local notification.",
      "**The scheduling call** is asynchronous.",
      "**await** waits for the scheduling call to finish.",
      "**The argument** supplies the notification content and its trigger.",
      "**content** contains the information shown in the notification.",
      "**title** supplies the notification's title text.",
      "**trigger** determines when the notification should fire.",
      {
        text: "**Trigger options** support different scheduling patterns.",
        bullets: [
          "**A time interval** schedules a notification after an amount of time.",
          "**A date or timestamp** schedules a notification for a particular time.",
          "**Daily, weekly, and yearly triggers** provide recurring scheduling options.",
        ],
      },
      "**seconds: 5** selects a five-second delay in this example.",
      "**The short delay** makes the notification quick to test.",
      {
        text: "**The scheduling example** runs inside an async function after permission is granted.",
        block: {
          type: "command",
          label: "Local notification with Notifications imported",
          command: `await Notifications.scheduleNotificationAsync({
  content: {
    title: "I'm a notification from your app",
  },
  trigger: {
    seconds: 5,
  },
});`,
        },
      },
    ],
  },
  {
    id: "foreground-and-background-notifications",
    heading: "Foreground and background notifications",
    paragraphs: [
      "**The foreground** means the application is open on screen.",
      "**The background** means the application is no longer open on screen.",
      "**Foreground and background notifications** are treated differently.",
      "**A foreground notification** does not appear in the notification bar by default.",
      "**Foreground notification handling** can be added to change that behavior.",
      "**The background test** moves the application into the background before the five-second delay ends.",
      "**The scheduled notification** then appears in the device's notification bar.",
      "**Opening the notification** opens the application.",
      "**The background behavior** is described as the same on Android and iOS.",
    ],
  },
  {
    id: "firebase-configuration-files",
    heading: "Firebase configuration files",
    paragraphs: [
      "**Firebase** is a Google service used for analytics.",
      "**React Native Firebase** is the library discussed for mobile app analytics.",
      "**Firebase setup** supplies configuration files for the mobile platforms.",
      {
        text: "**The configuration format** differs between iOS and Android.",
        bullets: [
          "**iOS** uses a plist file.",
          "**Android** uses a JSON file.",
        ],
      },
      "**The configuration IDs** identify the application to Firebase services.",
      "**The app ID** must match the application associated with the configuration.",
      "**The configuration files** are bundled with the application delivered to the user's phone.",
    ],
  },
  {
    id: "app-bundles-and-secrecy",
    heading: "App bundles and secrecy",
    paragraphs: [
      "**An app bundle** contains the application files shipped to the user's phone.",
      "**Files shipped to a phone** cannot be treated as completely secret.",
      "**A mobile app bundle** can be extracted to inspect its contents in plain text.",
      "**Firebase configuration files** remain inspectable because they are shipped in the bundle.",
      "**Values inserted into JavaScript at build time** also remain inspectable when shipped with the application.",
      "**gitignore** can keep a configuration file out of the Git repository.",
      "**Repository exclusion** does not make the bundled file secret.",
      "**Treating bundled configuration as secret** can encourage putting actual secrets in application code.",
      "**Firebase keys** can be restricted to the relevant app bundles.",
    ],
  },
  {
    id: "eas-secrets",
    heading: "EAS secrets and configuration files",
    paragraphs: [
      "**GitHub secret scanning** may flag the Google services configuration files as secrets.",
      "**Secret storage** is discussed as a way to supply those files without keeping them in Git.",
      "**EAS secrets** is the option discussed for supplying Google services files to EAS.",
      "**The EAS documentation** includes an example for the iOS Google services plist file.",
      "**A file supplied through secret storage** remains inspectable if it is bundled into the application.",
    ],
  },
  {
    id: "server-held-api-keys",
    heading: "Server-held API keys",
    paragraphs: [
      "**An API key** can identify the account charged for a service's usage.",
      "**A key tied to usage charges** is an actual secret that someone else should not obtain.",
      "**Bundling that key** makes it technically available for others to inspect.",
      "**Replacing a bundled key** requires submitting another application version.",
      "**A server** can hold the API key outside the mobile application.",
      "**A cloud function or Lambda** can serve as that server.",
      "**The mobile application** calls the server's API.",
      "**The server** performs the sensitive operation using the key.",
      "**Secret rotation** means changing the secret.",
      "**Keeping the key on the server** allows it to be rotated without replacing the mobile app bundle.",
      {
        text: "**The server architecture** keeps the API key with the sensitive operation.",
        block: {
          type: "command",
          label: "API key architecture",
          command: `Mobile app
    | calls the server's API
    v
Server (cloud function or Lambda)
    | holds the API key
    v
Sensitive operation`,
        },
      },
    ],
  },
  {
    id: "review-questions",
    heading: "Review questions",
    paragraphs: [],
    blocks: [
      {
        type: "details",
        title: "What method is used to schedule a local notification in Expo?",
        paragraphs: [
          "**notifications.scheduleNotificationAsync()** schedules a local notification.",
          "**content and trigger** are the parameters passed to the scheduling method.",
        ],
      },
      {
        type: "details",
        title: "What are the different types of notification triggers available in Expo?",
        paragraphs: [
          "**Seconds** can be used as a notification trigger.",
          "**A date** can be used as a notification trigger.",
          "**A time interval** can be used as a notification trigger.",
          "**Daily** triggers are available.",
          "**Weekly** triggers are available.",
          "**Yearly** triggers are available.",
          "**A specific second** can be used as a notification trigger.",
          "**A particular timestamp** can be used as a notification trigger.",
        ],
      },
      {
        type: "details",
        title: "How do foreground and background notifications behave differently?",
        paragraphs: [
          "**Foreground** means the application is open.",
          "**Foreground notifications** do not appear in the notification bar by default.",
          "**Background notifications** appear in the notification bar when the application is not currently active.",
          "**Custom handling** can be added for foreground notifications.",
        ],
      },
      {
        type: "details",
        title: "What import statement is required to use notifications in an Expo project?",
        paragraphs: [
          {
            text: "**The import statement** imports expo-notifications as notifications.",
            block: {
              type: "command",
              label: "Notification import",
              command: "import * as notifications from 'expo-notifications'",
            },
          },
        ],
      },
    ],
  },
];
