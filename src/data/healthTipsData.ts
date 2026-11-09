export interface HealthTip {
  id: string;
  title: string;
  subtitle: string;
  category: "Mental Wellness" | "Circadian & Sleep" | "Diet & Nutrition" | "Cardio Fitness";
  readTime: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  summary: string;
  whyItWorks: {
    mechanism: string;
    cardioImpact: string;
    clinicalMetric: string;
  };
  steps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  doctorNote: {
    doctorName: string;
    specialty: string;
    hospital: string;
    quote: string;
    imageKey: "dokter1" | "dokter2" | "dokter3";
  };
  officialSource: {
    title: string;
    publisher: string;
    year: string;
    summary: string;
    url: string;
    citation: string;
  };
}

export const healthTipsData: HealthTip[] = [
  {
    id: "mindful-breathing",
    title: "Mindful Breathing",
    subtitle: "5 min rhythmic exercise",
    category: "Mental Wellness",
    readTime: "3 min read",
    icon: "🌬️",
    iconBg: "#a0f3d9",
    iconColor: "#006955",
    summary:
      "5 minutes of rhythmic 4-7-8 breathing can lower your resting heart rate and measurably decrease morning cortisol.",
    whyItWorks: {
      mechanism:
        "Prolonged exhalation activates the parasympathetic nervous system via the vagus nerve. This directly inhibits excessive sympathetic adrenaline discharge.",
      cardioImpact:
        "Reduces vascular peripheral resistance, promotes arterial relaxation, and elevates Heart Rate Variability (HRV) within minutes.",
      clinicalMetric: "Clinically observed 4-7 mmHg drop in acute systolic blood pressure.",
    },
    steps: [
      {
        stepNumber: 1,
        title: "Find a Comfortable Posture",
        description: "Sit upright with your spine straight and shoulders relaxed. Rest your hands gently on your lap.",
      },
      {
        stepNumber: 2,
        title: "Inhale (4 Seconds)",
        description: "Close your mouth and inhale quietly through your nose for a mental count of 4.",
      },
      {
        stepNumber: 3,
        title: "Hold Breath (7 Seconds)",
        description: "Hold your breath calmly for a count of 7 seconds without straining your throat.",
      },
      {
        stepNumber: 4,
        title: "Exhale Completely (8 Seconds)",
        description: "Exhale completely through your mouth with a gentle whooshing sound for a full 8 seconds. Repeat 4 cycles.",
      },
    ],
    doctorNote: {
      doctorName: "Dr. Jean Gunnhildr, Sp.JP, FIHA",
      specialty: "Cardiologist & Vascular Specialist",
      hospital: "Raccoon City General Hospital",
      quote:
        "Paced slow breathing exercises tone the vagal brake on the sinoatrial node. It is the single most accessible tool to calm an overstimulated resting pulse.",
      imageKey: "dokter1",
    },
    officialSource: {
      title: "Managing Stress to Control High Blood Pressure",
      publisher: "American Heart Association (AHA)",
      year: "2024",
      summary:
        "Official guidelines published by the American Heart Association affirm that structured deep-breathing exercises modulate the autonomic nervous system, contributing to meaningful reductions in chronic hypertension risk and daily stress levels.",
      url: "https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/managing-stress-to-control-high-blood-pressure",
      citation: "AHA Clinical Recommendation Guidelines on Autonomic Tone & Hypertension",
    },
  },
  {
    id: "circadian-reset",
    title: "Circadian Reset",
    subtitle: "Morning sunlight habit",
    category: "Circadian & Sleep",
    readTime: "4 min read",
    icon: "☀️",
    iconBg: "#fff3c4",
    iconColor: "#b45309",
    summary:
      "Ten minutes of natural indirect sunlight within 30 minutes of waking anchors your melatonin curve for restorative sleep.",
    whyItWorks: {
      mechanism:
        "Specialized intrinsically photosensitive retinal ganglion cells (ipRGCs) detect photons and signal the suprachiasmatic nucleus (SCN) in the brain.",
      cardioImpact:
        "Resets the daily cardiovascular rhythm, ensuring that night-time blood pressure dipping occurs naturally during deep restorative sleep cycles.",
      clinicalMetric: "Enhances nocturnal blood pressure dipping by up to 12% in clinical sleep studies.",
    },
    steps: [
      {
        stepNumber: 1,
        title: "Catch Morning Photons",
        description: "Step outside onto a balcony or yard within 30-45 minutes of sunrise or waking up.",
      },
      {
        stepNumber: 2,
        title: "Direct Eye Exposure (No Sunglasses)",
        description: "Do not wear sunglasses. You do not need to look directly at the sun; look generally toward the eastern sky.",
      },
      {
        stepNumber: 3,
        title: "Duration Target",
        description: "Aim for 10 minutes on clear sunny days, or 20-30 minutes if the morning sky is cloudy or overcast.",
      },
      {
        stepNumber: 4,
        title: "Pair with Hydration",
        description: "Drink 350ml of clean water while standing in the morning sun to rehydrate vascular volume.",
      },
    ],
    doctorNote: {
      doctorName: "Dr. Joko wee Ambasuki, Sp.N, M.Kes",
      specialty: "Neurologist & Sleep Medicine Consultant",
      hospital: "Gotham General Hospital",
      quote:
        "Morning optical photon exposure sets an internal 14-hour timer for natural melatonin release. Better sleep quality directly prevents arterial stiffening.",
      imageKey: "dokter2",
    },
    officialSource: {
      title: "Circadian Mechanisms in Cardiovascular Function and Disease",
      publisher: "National Center for Biotechnology Information (NCBI / NIH)",
      year: "2023",
      summary:
        "Peer-reviewed medical research demonstrates that healthy circadian entrainment driven by morning light exposure prevents autonomic dysregulation, improves arterial compliance, and preserves healthy nocturnal cardiovascular recovery.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6751071/",
      citation: "Nature Reviews Cardiology / NIH PMC6751071",
    },
  },
  {
    id: "gut-heart-link",
    title: "Gut-Heart Link",
    subtitle: "Soluble fiber & vascular health",
    category: "Diet & Nutrition",
    readTime: "4 min read",
    icon: "🥗",
    iconBg: "#d9e5df",
    iconColor: "#006a43",
    summary:
      "Adding 25g of soluble fiber daily has been shown to reduce LDL cholesterol by up to 10% within 6 weeks of consistent intake.",
    whyItWorks: {
      mechanism:
        "Soluble dietary fiber forms a gel-like matrix in the digestive tract that binds bile acids and dietary cholesterol, preventing reabsorption.",
      cardioImpact:
        "Forces the liver to recruit circulating low-density lipoprotein (LDL) particles from bloodstream clearance to synthesize replacement bile acids.",
      clinicalMetric: "Statistically proven 8-10% decrease in circulating LDL-C in 6 weeks.",
    },
    steps: [
      {
        stepNumber: 1,
        title: "Incorporate Oats or Chia",
        description: "Begin breakfast with 40g of rolled oats or a tablespoon of soaked chia seeds rich in beta-glucan.",
      },
      {
        stepNumber: 2,
        title: "Daily Legume Portion",
        description: "Include a half cup of lentils, edamame, or black beans in your lunch or dinner bowl.",
      },
      {
        stepNumber: 3,
        title: "Pectin-Rich Fruits",
        description: "Snack on an apple or pear with its skin on, providing natural soluble pectin for your gut biome.",
      },
      {
        stepNumber: 4,
        title: "Adequate Hydration",
        description: "Ensure at least 2 liters of water daily so fiber smoothly expands and facilitates lipid clearance.",
      },
    ],
    doctorNote: {
      doctorName: "Dr. Pravroro Xubianto, Sp.GK, FINEM",
      specialty: "Clinical Nutritionist & Metabolic Specialist",
      hospital: "Saint Mary's Hospital",
      quote:
        "Soluble fiber is nature's safe, lipid-clearing sponge. Consistent intake reduces endothelial inflammation and stabilizes arterial wall elasticity.",
      imageKey: "dokter3",
    },
    officialSource: {
      title: "Dietary Fiber: Essential for a Healthy Heart and Diet",
      publisher: "Harvard T.H. Chan School of Public Health",
      year: "2023",
      summary:
        "Epidemiological and clinical evidence compiled by Harvard Nutrition Source underscores that diets rich in soluble fiber directly attenuate atherogenic cholesterol profiles, mitigating long-term coronary artery disease risk.",
      url: "https://www.hsph.harvard.edu/nutritionsource/carbohydrates/fiber/",
      citation: "Harvard Nutrition Source / Systematic Review of Dietary Fiber & Cardiovascular Outcomes",
    },
  },
];
