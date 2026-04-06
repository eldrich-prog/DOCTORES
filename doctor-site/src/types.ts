import { ReactNode } from "react";

interface Servicio {
  icon: string;
  title: string;
  desc: string;
}

interface Testimonio {
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

interface Stat {
  num: string;
  label: string;
  icon: string;
  color: string;
}

interface BadgeInfo {
  icon: ReactNode;
  text: string;
}