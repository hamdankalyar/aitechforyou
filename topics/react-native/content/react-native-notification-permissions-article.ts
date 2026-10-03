import type { ArticleSection } from "@/lib/articles";

export const reactNativeNotificationPermissionsSections: ArticleSection[] = [
  {
    id: "push-notifications",
    heading: "Push notifications",
    paragraphs: [
      "**A push notification** is a notification from an application that appears in the device's notification bar.",
      "**The foreground** means the application is currently being used on screen.",
      "**Push notifications** usually arrive when the application is not in the foreground.",
    ],
  },
  {
    id: "remote-and-local-notifications",
    heading: "Remote and local notifications",
    paragraphs: [
      {
        text: "**Remote notifications** are sent from a server.",
        bullets: [
          "**A push token** identifies the device for notification delivery.",
          "**The server** sends the notification through Apple or Firebase to the device.",
          "**Remote notification setup** requires a server.",
          "**The push token** must be registered and saved.",
        ],
      },
      {
        text: "**Local notifications** are scheduled within the application.",
        bullets: [
          "**The current device** is the only device that receives a local notification.",
          "**The example** uses local notifications.",
        ],
      },
      "**Remote notification setup** is more involved than the local notification example.",
    ],
  },
  {
    id: "libraries-and-device-checks",
    heading: "Libraries and device checks",
    paragraphs: [
      "**expo-notifications and expo-device** are the packages installed for the example.",
      "**A device check** determines whether the application is running on a physical device.",
      "**The demonstrated utility** excludes simulators from its notification permission flow.",
      "**The iOS simulator** cannot be used for the demonstrated push notification test.",
      "**A physical phone** is used to test the native permission prompt.",
    ],
  },
  {
    id: "native-permissions",
    heading: "Native permission prompts and statuses",
    paragraphs: [
      "**Notification permission** lets the user decide whether the application may send notifications.",
      "**Permission** must be requested before sending notifications.",
      "**requestPermissionsAsync** is the permission request function that triggers the device's native prompt.",
      {
        text: "**The existing permission status** is checked before requesting permission.",
        bullets: [
          "**undetermined** means the user has never been asked.",
          "**granted** means the user has allowed notifications.",
          "**denied** means the user has refused notifications.",
        ],
      },
      "**undetermined** is the status that allows the request to show a prompt in the demonstrated flow.",
      "**A no-op** is a call that does nothing.",
      "**granted or denied** makes another permission request a no-op in this flow.",
      "**A denied request** prevents the application from showing the same native prompt again.",
    ],
  },
  {
    id: "android-notification-channels",
    heading: "Android notification channels",
    paragraphs: [
      "**A notification channel** groups notifications from the same application on Android.",
      "**The Android version discussed** requires a channel before notification permission is requested.",
      "**Requesting permission without a channel** does not work in that Android setup.",
      "**Channel setup** therefore comes before the utility's permission request.",
    ],
  },
  {
    id: "permission-utility",
    heading: "The notification permission utility",
    paragraphs: [
      "**registerForPushNotificationsAsync** is a convenience function for checking permission before scheduling a notification.",
      "**The device check** returns null when the application is not running on a physical device.",
      "**The existing status** determines whether the utility needs to request permission.",
      "**An early return** ends the function when another permission request is unnecessary.",
      "**The result** reports granted or denied after the user responds in the demonstrated tests.",
      "**Repeated calls** can check permission before each notification is scheduled.",
    ],
  },
  {
    id: "permission-button",
    heading: "A permission request button",
    paragraphs: [
      "**TouchableOpacity** is the button component used in the example.",
      "**onPress** connects a button press to handleRequestPermission.",
      "**handleRequestPermission** is an async arrow function that calls the permission utility.",
      "**await** waits for the utility's result.",
      "**console.log(result)** displays that result.",
      "**activeOpacity={0.8}** makes the pressed button less highlighted in the example.",
      {
        text: "**The button handler** uses registerForPushNotificationsAsync from the example's utility.",
        block: {
          type: "command",
          label: "Permission button with the utility in scope",
          command: `const handleRequestPermission = async () => {
  const result = await registerForPushNotificationsAsync();
  console.log(result);
};

<TouchableOpacity activeOpacity={0.8} onPress={handleRequestPermission}>
  <Text>Request permission</Text>
</TouchableOpacity>`,
        },
      },
      {
        text: "**The button styling** uses a black background.",
        bullets: [
          "**The text color** is white.",
          "**borderRadius** is set to 6.",
          "**textTransform** is set to uppercase.",
          "**letterSpacing** is set to 1.",
        ],
      },
      "**fontWeight** must be a string in the demonstrated styling.",
      "**A numeric fontWeight** crashed the tested Android application.",
      "**The same numeric value** worked in the iOS simulator.",
      {
        text: "**bold** is the string value used for fontWeight.",
        block: {
          type: "command",
          label: "Text style property",
          command: 'fontWeight: "bold",',
        },
      },
    ],
  },
  {
    id: "notification-settings",
    heading: "Changing permission in device settings",
    paragraphs: [
      "**Device settings** let the user enable notifications after denying the native prompt.",
      "**The iOS example** uses the application's entry under Settings and Notifications.",
      "**Expo Go** is the application whose notification permission is changed in that example.",
      "**Enabling notifications in settings** makes the next permission check report granted.",
      "**Device settings** also let the user turn permission off.",
    ],
  },
  {
    id: "review-questions",
    heading: "Review questions",
    paragraphs: [],
    blocks: [
      {
        type: "details",
        title: "What are the two types of push notifications?",
        paragraphs: [
          "**Remote notifications** are sent from a server.",
          "**Local notifications** are scheduled within the app.",
          "**The current device** is the only device that receives a local notification.",
        ],
      },
      {
        type: "details",
        title: "How many times can a developer ask for push notification permissions?",
        paragraphs: [
          "**The native permission prompt** can only appear once.",
          "**Declining permission** prevents the system from showing the prompt again.",
          "**Device settings** let the user manually enable permission after declining.",
          "**The permission request function** can be called multiple times.",
          "**Repeated calls** become a no-op after permission has been granted or denied.",
        ],
      },
      {
        type: "details",
        title: "What are the possible permission statuses for push notifications?",
        paragraphs: [
          "**granted** means the user said yes.",
          "**undetermined** means the user has never been asked.",
          "**denied** means the user said no.",
        ],
      },
      {
        type: "details",
        title: "What is a unique characteristic of requesting push notification permissions on Android?",
        paragraphs: [
          "**The latest version of Android** requires a notification channel before asking for permission.",
          "**Requesting permission without a channel** does not work.",
        ],
      },
      {
        type: "details",
        title: "Do push notifications work on simulators and emulators?",
        paragraphs: [
          "**Push notifications** do not work on iOS simulators.",
          "**Android emulators** generally do not support push notifications.",
          "**Testing push notifications** requires an actual physical device.",
        ],
      },
    ],
  },
];
