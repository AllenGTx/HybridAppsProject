export interface VitalItem {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  value: string;
  unit?: string;
  tag?: string;
  tagColor?: string;
  note?: string;
  progress?: number;
  goal?: string;
  isWater?: boolean;
}

export const vitalsData: VitalItem[] = [
  {
    id: "heart-rate",
    icon: "❤️",
    iconBg: "#ffe5e5",
    title: "Heart Rate",
    value: "72",
    unit: "bpm",
    tag: "Live",
    note: "Resting normal",
  },
  {
    id: "daily-steps",
    icon: "🚶",
    iconBg: "#e5f0ff",
    title: "Daily Steps",
    value: "5,430",
    tag: "68%",
    tagColor: "#2563eb",
    progress: 68,
    goal: "Goal: 8,000",
  },
  {
    id: "water-intake",
    icon: "💧",
    iconBg: "#e5f6ff",
    title: "Water Intake",
    value: "1.5",
    unit: "L",
    goal: "Target 2.5 L",
    isWater: true,
  },
  {
    id: "sleep-cycle",
    icon: "🌙",
    iconBg: "#ede5ff",
    title: "Sleep Cycle",
    value: "7h 20m",
    tag: "Good",
    tagColor: "#006a43",
    note: "Deep: 1h 45m",
  },
];
