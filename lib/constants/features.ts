//define a type for features

import { Calendar1, Lock, LucideProps, Notebook, Workflow } from "lucide-react";

export type featureType = {
  featureName: string;
  featureDesc: string;
  featureIcon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const featurelist: featureType[] = [
  {
    featureName: "Calander",
    featureDesc: "All purpose integrated calendar",
    featureIcon: Calendar1,
  },
  {
    featureName: "Todos",
    featureDesc:
      "Interactive notebook for random ideas and things you need to jot down.",
    featureIcon: Notebook,
  },
  {
    featureName: "Integrations",
    featureDesc:
      "Integrated with Canvas LMS, Google Calendar, and Notion for now.",
    featureIcon: Workflow,
  },
  {
    featureName: "Privacy First",
    featureDesc: "Your data is your data.",
    featureIcon: Lock,
  },
];
