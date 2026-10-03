import type { ArticleSection } from "@/lib/articles";

export const reactNativeCountdownTimerSections: ArticleSection[] = [
  {
    id: "intervals-and-state",
    heading: "Intervals and state updates",
    paragraphs: [
      "**A countdown** shows how long remains before a recurring task is due.",
      "**Overdue time** shows how long has passed since the task became due.",
      "**React Compiler** avoids updating UI elements whose state has not changed.",
      "**A timer display** therefore needs state updates to change every second.",
      "**useState** holds the value displayed by the component.",
      "**useEffect** runs the interval setup in this example.",
      "**An empty dependency array** runs this setup once when the component initially renders.",
      {
        text: "**setInterval** repeatedly runs a function after the specified interval.",
        bullets: [
          "**The first argument** is the function to run.",
          "**The second argument** is the interval in milliseconds.",
          "**1000 milliseconds** is one second.",
          "**The return value** identifies the interval for cleanup.",
        ],
      },
      "**The interval callback** keeps the state value available when the effect was created.",
      "**A functional state update** receives the current value instead of relying on that captured value.",
      "**val + 1** returns the next number of elapsed seconds.",
      {
        text: "**The elapsed-seconds example** updates state once per second inside a component.",
        block: {
          type: "command",
          label: "Component fragment with useState and useEffect imported",
          command: `const [secondsElapsed, setSecondsElapsed] = useState(0);

useEffect(() => {
  const intervalId = setInterval(() => {
    setSecondsElapsed((val) => val + 1);
  }, 1000);

  return () => clearInterval(intervalId);
}, []);`,
        },
      },
      "**Unmounting** removes the component from the UI.",
      "**The returned function** cleans up the effect when the component is unmounted.",
      "**clearInterval(intervalId)** stops the identified interval.",
      "**Cleanup** prevents previous intervals from continuing alongside new ones.",
      "**Multiple running intervals** can make the counter increment several times at once.",
    ],
  },
  {
    id: "date-utilities",
    heading: "Date utilities",
    paragraphs: [
      "**date-fns** provides date utilities that also work in React Native.",
      "**Date formatting** turns a date into readable text using a format string.",
      "**Distance formatting** can describe elapsed time in words such as 12 days ago.",
      "**The countdown example** uses date-fns to compare dates and calculate durations.",
      {
        text: "**npx expo install** is the installation option used for date-fns.",
        block: {
          type: "command",
          label: "Install date-fns",
          command: "npx expo install date-fns",
        },
      },
      "**Installing one other package** means this package is not tracked for Expo SDK compatibility.",
    ],
  },
  {
    id: "frequency-and-deadlines",
    heading: "Timestamps, frequency, and deadlines",
    paragraphs: [
      "**A timestamp** is the numeric time used to represent a completion or deadline.",
      "**Date.now()** supplies the current timestamp.",
      "**frequency** describes how often the task needs to be completed.",
      "**A ten-second frequency** makes the countdown easier to test.",
      {
        text: "**Milliseconds** are the units used for the frequency calculation.",
        bullets: [
          "**One second** is 1000 milliseconds.",
          "**One minute** is 60 times 1000 milliseconds.",
          "**One hour** is 60 minutes.",
          "**One day** is 24 hours.",
        ],
      },
      "**The car-wash example** uses a frequency of two weeks.",
      "**Two weeks** is 14 days.",
      {
        text: "**The two-week frequency** converts 14 days into milliseconds.",
        block: {
          type: "command",
          label: "Frequency for the car-wash example",
          command: "const frequency = 14 * 24 * 60 * 60 * 1000;",
        },
      },
      "**The last completion timestamp** is the first entry in the example's completion history.",
      "**Optional access** safely reads the history when countdownState might be undefined.",
      "**The deadline** is the last completion timestamp plus the frequency.",
      "**Date.now()** is the default deadline when there is no previous completion.",
      {
        text: "**The deadline calculation** uses the saved completion history in this example.",
        block: {
          type: "command",
          label: "With countdownState holding the restored history",
          command: `const frequency = 10 * 1000;
const lastCompletedTimestamp = countdownState?.completedAtTimestamps[0];
const timestamp = lastCompletedTimestamp
  ? lastCompletedTimestamp + frequency
  : Date.now();`,
        },
      },
    ],
  },
  {
    id: "countdown-status",
    heading: "Countdown status and duration types",
    paragraphs: [
      "**CountdownStatus** describes the information needed to render the timer.",
      "**A boolean** is a true or false value.",
      "**isOverdue** is a boolean indicating whether the deadline is in the past.",
      "**distance** holds the time between the deadline and the current time.",
      "**Duration** is the date-fns type used for that distance in this example.",
      "**Duration fields** are optional numbers for units such as days, hours, minutes, and seconds.",
      "**ReturnType<typeof intervalToDuration>** is the demonstrated alternative for deriving the function's return type.",
      "**Importing Duration directly** is the option chosen for clearer code.",
      "**useState<CountdownStatus>** restricts the state to values matching that type.",
      "**The initial status** has isOverdue set to false.",
      "**An empty distance object** contains no duration values yet.",
      {
        text: "**The typed state** starts with a default status before the timer calculation runs.",
        block: {
          type: "command",
          label: "Component fragment with useState imported",
          command: `import type { Duration } from "date-fns";

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

const [status, setStatus] = useState<CountdownStatus>({
  isOverdue: false,
  distance: {},
});`,
        },
      },
    ],
  },
  {
    id: "remaining-and-overdue-time",
    heading: "Remaining time and overdue time",
    paragraphs: [
      "**isBefore** checks whether its first date is before its second date.",
      "**isBefore(timestamp, Date.now())** returns whether the deadline has passed.",
      "**intervalToDuration** calculates a duration from an object containing start and end.",
      "**start** is the earlier time in the example's interval.",
      "**end** is the later time in the example's interval.",
      {
        text: "**The date order** depends on whether the task is overdue.",
        bullets: [
          "**Remaining time** runs from the current time to the deadline.",
          "**Overdue time** runs from the deadline to the current time.",
        ],
      },
      "**The returned duration** contains the time units used by the timer display.",
      "**setStatus** stores both the overdue flag and the calculated duration.",
      {
        text: "**The interval callback** recalculates this status every second.",
        block: {
          type: "command",
          label: "With isBefore and intervalToDuration imported from date-fns",
          command: `const isOverdue = isBefore(timestamp, Date.now());
const distance = intervalToDuration(
  isOverdue
    ? { start: timestamp, end: Date.now() }
    : { start: Date.now(), end: timestamp }
);

setStatus({ isOverdue, distance });`,
        },
      },
    ],
  },
  {
    id: "effect-dependencies",
    heading: "Effect dependencies and interval replacement",
    paragraphs: [
      "**A dependency array** lists values that cause an effect to run again when they change.",
      "**lastCompletedTimestamp** is the interval effect's dependency in this example.",
      "**A new completion** changes the timestamp used to calculate the deadline.",
      "**Effect cleanup** clears the previous interval before the effect runs again.",
      "**The replacement interval** uses the deadline based on the new completion time.",
      "**An infinite loop** repeatedly runs the effect because its own work keeps changing a dependency.",
      "**Updating a state dependency inside the effect** can cause that loop.",
      "**Separate effects** handle the storage read and interval setup as separate interactions.",
    ],
  },
  {
    id: "timer-segments",
    heading: "Reusable timer segments",
    paragraphs: [
      "**TimerSegment** is a component that renders a number with its unit underneath.",
      "**Props** are the values passed into a component.",
      "**number** supplies the segment's displayed value.",
      "**unit** supplies its label, such as days or seconds.",
      "**textStyle** is an optional prop applied to both the number and unit text.",
      "**The optional style** allows the segment's text to be white or black as needed.",
      "**TextStyle** is the React Native type used to check the supplied text style.",
      "**Missing duration fields** default to 0 in the display.",
      "**The example display** uses days, hours, minutes, and seconds.",
      "**flexDirection: 'row'** places the segments next to each other.",
      "**marginBottom: 24** creates space between the segment row and the button below it.",
      "**textStyle** supplies the white-text style only when status.isOverdue is true.",
      {
        text: "**The segment row** reads the calculated values from status.distance.",
        block: {
          type: "command",
          label: "JSX fragment with View and TimerSegment available",
          command: `<View style={styles.row}>
  <TimerSegment unit="days" number={status.distance.days ?? 0} textStyle={textStyle} />
  <TimerSegment unit="hours" number={status.distance.hours ?? 0} textStyle={textStyle} />
  <TimerSegment unit="minutes" number={status.distance.minutes ?? 0} textStyle={textStyle} />
  <TimerSegment unit="seconds" number={status.distance.seconds ?? 0} textStyle={textStyle} />
</View>`,
        },
      },
    ],
  },
  {
    id: "conditional-styling",
    heading: "Conditional text and styling",
    paragraphs: [
      "**Conditional rendering** selects text according to the overdue flag.",
      "**Thing due in** introduces the remaining time.",
      "**Thing overdue by** introduces the elapsed overdue time.",
      "**Car wash due in** labels the remaining time in the car-wash example.",
      "**Car wash overdue by** labels its overdue time.",
      "**A style array** combines the base style with a conditional style.",
      "**containerLate** gives an overdue timer a red background.",
      "**The red background** makes the overdue task difficult to overlook.",
      "**whiteText** makes the heading and timer segments white when overdue.",
      "**undefined** leaves out the extra style when the task is not overdue.",
      {
        text: "**The heading** uses the same overdue text color as the timer segments.",
        block: {
          type: "command",
          label: "Component fragment with base container styling already defined",
          command: `const textStyle = status.isOverdue ? styles.whiteText : undefined;

<View style={[styles.container, status.isOverdue ? styles.containerLate : undefined]}>
  <Text style={[styles.heading, textStyle]}>
    {status.isOverdue ? "Thing overdue by" : "Thing due in"}
  </Text>
</View>`,
        },
      },
      "**fontSize: 24** sets the heading's text size.",
      "**fontWeight: 'bold'** makes the heading bold.",
      "**marginBottom: 24** separates the heading from the timer segments.",
      {
        text: "**The style entries** supply the demonstrated heading, row, and overdue appearance.",
        block: {
          type: "command",
          label: "Entries inside the component's styles object",
          command: `heading: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
row: { flexDirection: "row", marginBottom: 24 },
containerLate: { backgroundColor: "red" },
whiteText: { color: "white" },`,
        },
      },
      "**I've done the thing** is the completion button's label in the example.",
      "**I've washed the car** is the car-wash example's completion button text.",
      "**Completing the task** resets the countdown.",
    ],
  },
  {
    id: "persisted-countdown-state",
    heading: "Persisted countdown state",
    paragraphs: [
      "**Persistence** keeps the countdown data available after the application reloads.",
      "**An unsaved countdown** resets when the application reloads.",
      "**AsyncStorage** stores the example's countdown data under a key.",
      "**PersistedCountdownState** describes the data saved to storage.",
      "**currentNotificationId** identifies the notification that may need to be canceled.",
      "**undefined** is the initial notification ID before a notification is scheduled.",
      "**completedAtTimestamps** is an array of numeric completion times.",
      "**The newest completion** is stored at the beginning of the array.",
      {
        text: "**The persisted type** keeps the notification ID together with the completion history.",
        block: {
          type: "command",
          label: "Shared countdown data and storage key",
          command: `export type PersistedCountdownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

export const countdownStorageKey = "taskly-countdown";`,
        },
      },
      "**countdownState** starts as undefined before saved data is fetched.",
      "**getFromStorage(countdownStorageKey)** is the utility call that reads the saved countdown data.",
      "**setCountdownState(value)** places the retrieved value into component state.",
      "**The useEffect callback** cannot itself be an async function.",
      "**An inner async function** performs the storage read.",
      {
        text: "**init()** starts the asynchronous read inside the loading effect.",
        block: {
          type: "command",
          label: "Component fragment using the storage-reading utility",
          command: `useEffect(() => {
  const init = async () => {
    const value = await getFromStorage(countdownStorageKey);
    setCountdownState(value);
  };

  init();
}, []);`,
        },
      },
    ],
  },
  {
    id: "notification-replacement",
    heading: "Notification IDs and cancellation",
    paragraphs: [
      "**A scheduled notification** still fires unless it is canceled.",
      "**Scheduling a new notification** does not cancel the previous one.",
      "**Early completion** makes the previous reminder unnecessary.",
      "**The hourly example** cancels the old reminder when the task is completed after 30 minutes.",
      "**scheduleNotificationAsync** returns a string identifying the scheduled notification.",
      "**pushNotificationId** holds that returned string in the example.",
      "**The notification title** says that the task is due.",
      "**Time to wash the car** is the car-wash reminder's title.",
      "**The time trigger** takes seconds.",
      "**frequency / 1000** converts the example's milliseconds into trigger seconds.",
      "**cancelScheduledNotificationAsync** cancels the notification identified by its argument.",
      "**currentNotificationId** supplies the old notification's ID when it exists.",
      "**cancelAllScheduledNotificationsAsync** is the discussed alternative for canceling every scheduled notification.",
      "**Canceling one notification** is the option used because its ID is known.",
      {
        text: "**The cancellation call** runs inside the async completion handler before saving the new state.",
        block: {
          type: "command",
          label: "With Notifications available from the notification library",
          command: `if (countdownState?.currentNotificationId) {
  await Notifications.cancelScheduledNotificationAsync(
    countdownState.currentNotificationId
  );
}`,
        },
      },
      "**Replacing the reminder** leaves one scheduled notification after repeated early completions.",
    ],
  },
  {
    id: "saving-completions",
    heading: "Completion history and state updates",
    paragraphs: [
      "**Date.now()** records the time when the completion button is pressed.",
      "**The first completion** creates a history containing one timestamp.",
      "**A later completion** adds its timestamp before the previous entries.",
      "**The spread syntax** includes the earlier completion timestamps in the new array.",
      "**The new notification ID** replaces the previous ID in saved state.",
      "**An undefined notification ID** is also allowed in the persisted state.",
      "**setCountdownState** updates the state used by the timer.",
      "**saveToStorage** receives the storage key and the new countdown state.",
      {
        text: "**The completion update** saves the new history after notification handling.",
        block: {
          type: "command",
          label: "Inside an async handler with pushNotificationId already determined",
          command: `const newCountdownState: PersistedCountdownState = {
  currentNotificationId: pushNotificationId,
  completedAtTimestamps: countdownState
    ? [Date.now(), ...countdownState.completedAtTimestamps]
    : [Date.now()],
};

setCountdownState(newCountdownState);
await saveToStorage(countdownStorageKey, newCountdownState);`,
        },
      },
      "**The saved completion time** allows the deadline to be restored after reopening the application.",
    ],
  },
  {
    id: "loading-and-readiness",
    heading: "Loading indicators and timer readiness",
    paragraphs: [
      "**Asynchronous fetching** retrieves stored data after the component's first render.",
      "**The initial status** can show a white screen before the saved overdue state turns it red.",
      "**This flicker** comes from rendering the default status before the saved timer state is ready.",
      "**ActivityIndicator** is React Native's built-in loading spinner.",
      "**isLoading** is a state value initialized to true in the loading example.",
      "**An early return** displays the loading view while isLoading is true.",
      {
        text: "**The loading view** fills the screen while the timer is being prepared.",
        block: {
          type: "command",
          label: "Component fragment with View and ActivityIndicator imported",
          command: `if (isLoading) {
  return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator />
    </View>
  );
}`,
        },
      },
      "**flex: 1** makes the loading container fill its parent.",
      "**justifyContent: 'center'** centers the spinner in the parent.",
      "**alignItems: 'center'** supplies the example's other centering setting.",
      "**A container without flex: 1** may be too small for the expected centering.",
      {
        text: "**The loading container style** uses a white background with centered content.",
        block: {
          type: "command",
          label: "Entry inside the component's styles object",
          command: `activityIndicatorContainer: {
  backgroundColor: "white",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},`,
        },
      },
      {
        text: "**Timer readiness** involves two separate statuses in the demonstration.",
        bullets: [
          "**Storage readiness** means the saved state has been fetched.",
          "**Interval readiness** means the first timer interval has been set.",
        ],
      },
      "**Finishing the storage read** alone does not make the timer ready in this example.",
      "**setIsLoading(false)** ends loading after the timer setup in the demonstrated approach.",
      "**The demonstrated loading logic** works when at least one completion timestamp exists.",
      "**No previous completion** can leave that logic showing the spinner forever.",
      "**First-load handling** remains unfinished in the supplied loading example.",
      "**A state management library** is the discussed production approach for handling the fetching.",
      "**Keeping the splash screen visible** is another discussed way to cover that fetch.",
      "**The example option** uses a full-screen spinner.",
    ],
  },
  {
    id: "shared-storage-and-history",
    heading: "Shared storage and history lists",
    paragraphs: [
      "**A storage key** identifies saved data independently of the screen reading it.",
      "**Different screens or components** can read the same AsyncStorage data using the same key.",
      "**Exporting the key and type** makes both available to the history screen.",
      "**The history screen** fetches the countdown state into its own component state.",
      "**FlatList** is the list component used to render a large scrollable history.",
      "**data** receives the completedAtTimestamps array.",
      "**An empty array** is the example's fallback when there is no saved history.",
      "**renderItem** receives each timestamp as item.",
      "**Destructuring item** reads the timestamp from the renderItem argument.",
      "**The returned View** contains the Text shown for that history entry.",
      "**An implicit return** uses parentheses to return the JSX directly.",
      "**A callback without a return** renders no history item.",
      "**format** from date-fns formats a date or timestamp using a format string.",
      "**The first argument** is the history entry's timestamp.",
      "**The second argument** is fullDateFormat, the example's date-format string.",
      "**The formatted result** is readable date text.",
      "**ListEmptyComponent** supplies the No history message when the list is empty.",
      {
        text: "**The history list** renders the saved timestamps as formatted dates.",
        block: {
          type: "command",
          label: "JSX fragment with format imported and fullDateFormat defined",
          command: `<FlatList
  data={countdownState?.completedAtTimestamps ?? []}
  style={styles.list}
  contentContainerStyle={styles.contentContainer}
  renderItem={({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{format(item, fullDateFormat)}</Text>
    </View>
  )}
  ListEmptyComponent={<Text>No history</Text>}
/>`,
        },
      },
      "**The gap between completion times** can show how frequently the task was completed.",
      "**Comparing the last two history entries** is discussed as a possible extension.",
    ],
  },
  {
    id: "history-list-styling",
    heading: "History list and item styles",
    paragraphs: [
      "**style** supplies the FlatList's outer container styling.",
      "**flex: 1** makes the list fill its available space.",
      "**A white background** is used for the list.",
      "**contentContainerStyle** supplies spacing for the list's contents.",
      "**Content padding** belongs in contentContainerStyle rather than the outer list style.",
      "**marginTop: 8** separates the first entry from the top in this example.",
      "**A light-grey background** distinguishes each history entry.",
      "**marginHorizontal: 8** separates entries from the sides.",
      "**padding: 12** adds space inside each entry.",
      "**borderRadius: 6** rounds each entry's corners.",
      "**marginBottom: 8** separates neighboring entries.",
      "**fontSize: 18** makes the history text larger.",
      "**An empty-array test** checks the No history display.",
      "**A fresh-install test** checks the state before any completion has been added.",
    ],
  },
  {
    id: "success-haptics",
    heading: "Success haptic feedback",
    paragraphs: [
      "**Haptic feedback** is the physical feedback felt from the phone.",
      "**Success feedback** makes completing the task feel satisfying.",
      "**expo-haptics** supplies the feedback used in the completion handler.",
      "**Haptics** is the name used to access the imported library.",
      "**Haptics.notificationAsync** triggers the selected notification feedback.",
      "**Haptics.NotificationFeedbackType.Success** selects success feedback.",
      "**The completion handler** triggers the feedback before scheduling the next notification.",
      {
        text: "**The success call** provides feedback when the completion button is pressed.",
        block: {
          type: "command",
          label: "Library import and call inside the completion handler",
          command: `import * as Haptics from "expo-haptics";

Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);`,
        },
      },
    ],
  },
  {
    id: "refs-and-programmatic-control",
    heading: "Refs and programmatic component control",
    paragraphs: [
      "**A ref** holds a reference to an element on the screen.",
      "**useRef** is the React hook used to create that reference.",
      "**Programmatic control** means calling a component's function from code.",
      "**The confetti ref** allows the completion handler to start the animation.",
      "**The initial ref** starts with no component reference.",
      "**any** is the ref type chosen in this example.",
      "**The ref prop** connects confettiRef to the ConfettiCannon component.",
      "**confettiRef.current** gives access to the referenced component.",
      "**start()** launches the confetti through that reference.",
      {
        text: "**The ref setup** creates the reference inside the component.",
        block: {
          type: "command",
          label: "Component fragment with useRef imported from React",
          command: "const confettiRef = useRef<any>(null);",
        },
      },
      {
        text: "**The start call** runs inside the completion handler when the button is pressed.",
        block: {
          type: "command",
          label: "With confettiRef connected to ConfettiCannon",
          command: "confettiRef.current?.start();",
        },
      },
    ],
  },
  {
    id: "responsive-window-dimensions",
    heading: "Responsive window dimensions",
    paragraphs: [
      "**Different screen sizes** need different positions for a centered confetti launch.",
      "**A fixed x position** does not place the launch at every screen's center.",
      "**Dimensions.get('window')** is the first demonstrated way to read the window dimensions.",
      "**width** is the window's width.",
      "**width / 2** places the launch halfway across the window.",
      "**The initial Dimensions implementation** reads the size once.",
      "**That initial implementation** does not recalculate the position when the device size changes.",
      "**useWindowDimensions** is the React Native hook chosen instead.",
      "**The hook's width** adapts when the window changes between portrait and landscape.",
      {
        text: "**The responsive width** is read inside the component.",
        block: {
          type: "command",
          label: "Component fragment with useWindowDimensions imported from React Native",
          command: "const { width } = useWindowDimensions();",
        },
      },
    ],
  },
  {
    id: "confetti-properties",
    heading: "Confetti animation properties",
    paragraphs: [
      "**react-native-confetti-cannon** is the JavaScript library used for the confetti animation.",
      "**ConfettiCannon** is the component imported from that library.",
      "**count** controls the amount of confetti.",
      "**count={50}** is chosen because the default amount felt too intense on Android phones.",
      "**origin** supplies the launch position using x and y coordinates.",
      "**x: 0 and y: 0** launch from the left corner in the initial example.",
      "**x: width / 2** centers the launch horizontally for the current window.",
      "**The y coordinate** can move the launch slightly off screen.",
      "**An off-screen launch** avoids a visible pile of confetti at the launch point.",
      "**fadeOut** makes the confetti disappear after it falls.",
      "**The fadeOut shorthand** passes true for this boolean prop.",
      "**autoStart={false}** stops the animation from firing when the screen opens.",
      "**The completion handler** starts the animation through the ref instead.",
      {
        text: "**The centered-launch example** uses the responsive width with y kept at 0.",
        block: {
          type: "command",
          label: "Library import and JSX with confettiRef and width defined",
          command: `import ConfettiCannon from "react-native-confetti-cannon";

<ConfettiCannon
  ref={confettiRef}
  count={50}
  origin={{ x: width / 2, y: 0 }}
  fadeOut
  autoStart={false}
/>`,
        },
      },
    ],
  },
  {
    id: "metro-restarts-and-cache",
    heading: "Metro restarts and cached data",
    paragraphs: [
      "**Metro** is the bundler process restarted in the example.",
      "**A screen stuck refreshing** is one reason to try restarting the bundler.",
      "**An application that fails to load** is another reason to try a restart.",
      "**Stopping and starting Metro** is the first troubleshooting option discussed.",
      "**A suspected cache problem** is a reason to try the reset option if restarting does not help.",
      {
        text: "**--reset-cache** is the startup option discussed for resetting the cache.",
        block: {
          type: "command",
          label: "Option supplied when restarting the bundler",
          command: "--reset-cache",
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
        title: "How do you update state with the current value in React using useState?",
        paragraphs: [
          "**The state setter** accepts a function that receives the current value.",
          "**The function** returns the new state value.",
          "**setSecondsElapsed** can use that function to increment elapsed seconds.",
        ],
        code: "setSecondsElapsed(val => val + 1);",
      },
      {
        type: "details",
        title: "What is the purpose of returning a function from a useEffect hook?",
        paragraphs: [
          "**The returned function** performs cleanup before the component unmounts.",
          "**Cleanup** can clear intervals or subscriptions.",
          "**Cleanup** prevents memory leaks.",
          "**Cleanup** prevents multiple concurrent processes.",
        ],
      },
      {
        type: "details",
        title: "How do you create an interval that updates every second in React?",
        paragraphs: [
          "**setInterval()** runs inside a useEffect hook.",
          "**An empty dependency array** is used for the effect.",
          "**The first interval argument** is the callback function.",
          "**1000 milliseconds** is the interval's second argument.",
          "**The functional state setter** receives the current state value.",
          "**The interval callback** otherwise retains values from the effect's scope.",
          "**clearInterval()** stops the interval in the returned cleanup function.",
          "**Cleanup** prevents multiple intervals from running simultaneously.",
        ],
      },
      {
        type: "details",
        title: "What is a key consideration when creating a UI that updates every second in React?",
        paragraphs: [
          "**React Compiler** does not automatically update UI elements whose state has not changed.",
          "**Time-based updates** need attention to state management and rendering.",
        ],
      },
      {
        type: "details",
        title: "When updating state with setState inside a setInterval callback, why should you pass a function instead of directly using the state variable?",
        paragraphs: [
          "**The interval callback** retains the values available when the interval was created.",
          "**The retained state variable** does not provide updated state values.",
          "**A function passed to setState** receives the current value as its parameter.",
          "**The function** uses that current value to calculate the next state.",
        ],
        code: "setState(currentVal => currentVal + 1);",
      },
      {
        type: "details",
        title: "What TypeScript utility can be used to get the return type of a function?",
        paragraphs: [
          "**ReturnType and typeof** can derive a function's return type.",
          "**ReturnType<typeof intervalToDuration>** derives the return type of intervalToDuration.",
        ],
      },
      {
        type: "details",
        title: "What method from date-fns can be used to check if one date is before another?",
        paragraphs: [
          "**isBefore** checks whether one date is before another.",
          "**The return value** is a boolean.",
        ],
      },
      {
        type: "details",
        title: "What parameters does intervalToDuration from date-fns typically require?",
        paragraphs: [
          "**start** supplies the start date.",
          "**end** supplies the end date.",
          "**intervalToDuration** calculates the duration between those dates.",
        ],
      },
      {
        type: "details",
        title: "How can you specify a type for a useState hook in TypeScript?",
        paragraphs: [
          "**Angle brackets** specify the type managed by useState.",
          "**useState<CountdownStatus>** specifies CountdownStatus as the state type.",
        ],
      },
      {
        type: "details",
        title: "What structure does the duration object from date-fns have?",
        paragraphs: [
          "**The duration object** contains optional numeric properties.",
          "**The properties** represent years, months, weeks, days, hours, minutes, and seconds.",
        ],
      },
      {
        type: "details",
        title: "How can you conditionally apply multiple styles to a component in React Native?",
        paragraphs: [
          "**The style prop** accepts an array of styles.",
          "**The array** combines a base style with conditional styles.",
          "**isOverdue** determines whether the example applies containerLate.",
        ],
        code: "style={[styles.container, isOverdue ? styles.containerLate : undefined]}",
      },
      {
        type: "details",
        title: "What approach can be used to change text color when an item is overdue?",
        paragraphs: [
          "**A conditional textStyle prop** applies white text when the item is overdue.",
          "**undefined** leaves out the white-text style otherwise.",
        ],
        code: "textStyle={status.isOverdue ? styles.whiteText : undefined}",
      },
      {
        type: "details",
        title: "How can you create a visually distinct container for overdue items?",
        paragraphs: [
          "**A separate overdue style** supplies a different background color such as red.",
          "**A style array** applies that style conditionally.",
        ],
      },
      {
        type: "details",
        title: "How can timer segments be arranged to display horizontally?",
        paragraphs: [
          "**flexDirection: 'row'** arranges timer segments next to each other.",
        ],
      },
      {
        type: "details",
        title: "What is the purpose of storing the currentNotificationId in the persisted countdown state?",
        paragraphs: [
          "**currentNotificationId** identifies the previously scheduled notification for cancellation.",
          "**Canceling that notification** prevents duplicate reminders for the same task.",
        ],
      },
      {
        type: "details",
        title: "What data structure is used to track the history of completed tasks?",
        paragraphs: [
          "**completedAtTimestamps** is an array of completion timestamps.",
          "**Each timestamp** records when a task was completed.",
        ],
      },
      {
        type: "details",
        title: "How is the frequency of a task initially defined in the code?",
        paragraphs: [
          "**The initial frequency** is hard-coded as 10 seconds.",
          "**10 seconds** equals 10,000 milliseconds.",
          "**User-configurable frequency** is a possible future enhancement.",
        ],
      },
      {
        type: "details",
        title: "Why is it important to cancel previous notifications before scheduling a new one?",
        paragraphs: [
          "**Canceling previous notifications** prevents multiple reminders for the same task.",
          "**Only the most recent scheduled notification** remains active.",
        ],
      },
      {
        type: "details",
        title: "How are new task completions added to the completedAtTimestamps array?",
        paragraphs: [
          "**Date.now()** supplies the new completion timestamp.",
          "**The new timestamp** is added to the beginning of the array.",
          "**Previous entries** remain in the completion history.",
        ],
      },
      {
        type: "details",
        title: "What does flex: 1 do in React Native styling?",
        paragraphs: [
          "**flex: 1** makes the container fill its parent container.",
        ],
      },
      {
        type: "details",
        title: "What is the purpose of justifyContent: 'center' in React Native styling?",
        paragraphs: [
          "**justifyContent: 'center'** centers content within the container.",
          "**Unexpected centering** can result from a container being smaller than expected.",
          "**flex: 1** makes the container fill its parent's available space.",
          "**The larger container** makes the centering effect visible.",
        ],
      },
      {
        type: "details",
        title: "Why might a loading state be important when fetching data asynchronously?",
        paragraphs: [
          "**A loading state** prevents flickering between initial and loaded states.",
          "**A loading indicator** appears while data is being retrieved.",
          "**The loading state** provides a smoother user experience.",
        ],
      },
      {
        type: "details",
        title: "What React Native component can be used to show a loading indicator?",
        paragraphs: [
          "**ActivityIndicator** is the built-in React Native component for a loading spinner.",
        ],
      },
      {
        type: "details",
        title: "What potential issue can arise when using useEffect to fetch initial state from AsyncStorage?",
        paragraphs: [
          "**A brief visual flicker** can occur between the default state and the loaded state.",
          "**A loading state** can reduce that flicker.",
        ],
      },
      {
        type: "details",
        title: "How can you access AsyncStorage across different screens or components?",
        paragraphs: [
          "**The same storage key** gives different screens or components access to the same data.",
          "**Those screens or components** can modify the stored data using that key.",
        ],
      },
      {
        type: "details",
        title: "What hook is used to retrieve data from AsyncStorage in a React component?",
        paragraphs: [
          "**useEffect** fetches the value from AsyncStorage.",
          "**getFromStorage** is an example utility called with the storage key.",
          "**useState** creates a state variable for the retrieved data.",
          "**The state setter** updates that variable with the fetched value.",
        ],
      },
      {
        type: "details",
        title: "What React Native component is typically used for rendering large lists of items?",
        paragraphs: [
          "**FlatList** is the recommended component for rendering large lists efficiently.",
        ],
      },
      {
        type: "details",
        title: "What is the purpose of using the contentContainer style in a FlatList?",
        paragraphs: [
          "**The contentContainer style** adds padding or margin to the list's contents.",
          "**That spacing** keeps items away from the screen edges.",
        ],
      },
      {
        type: "details",
        title: "How can you format timestamps into readable dates in a React Native application?",
        paragraphs: [
          "**format** from date-fns converts a timestamp into readable date text.",
          "**The first argument** is the timestamp.",
          "**The second argument** is a full date-format string.",
        ],
      },
      {
        type: "details",
        title: "How do you trigger a confetti animation programmatically in React Native using react-native-confetti-cannon?",
        paragraphs: [
          "**useRef()** creates a reference for controlling ConfettiCannon.",
          "**The ref prop** passes that reference to the component.",
          "**autoStart={false}** disables automatic startup.",
          "**confettiRef.current?.start()** triggers the animation when needed.",
        ],
      },
      {
        type: "details",
        title: "What method can be used to get responsive window dimensions in React Native?",
        paragraphs: [
          "**useWindowDimensions** provides width, height, and other window dimension properties.",
          "**The dimension properties** automatically adapt to device orientation changes.",
        ],
      },
      {
        type: "details",
        title: "How do you import and use haptic feedback in a React Native application?",
        paragraphs: [
          "**The namespace import** makes the library's methods available through Haptics.",
          "**Haptics.notificationAsync** triggers notification haptic feedback.",
          "**Haptics.NotificationFeedbackType.Success** selects success feedback.",
          "**Warning and Error** are other available notification feedback types.",
        ],
        code: `import * as Haptics from "expo-haptics";

Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);`,
      },
      {
        type: "details",
        title: "How can you calculate the center of a screen dynamically in React Native?",
        paragraphs: [
          "**Dimensions.get('window').width / 2** calculates the horizontal center.",
          "**useWindowDimensions** is the preferred option for a responsive width.",
          "**Dividing that width by 2** calculates the responsive horizontal center.",
        ],
      },
    ],
  },
];
