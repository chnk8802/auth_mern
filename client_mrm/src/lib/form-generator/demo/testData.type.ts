import type { Address } from "@/types/api";

export interface TestData {
  _id: string;
  first_name: string;
  bio: string;
  age: number;
  dob: string; // could be Date if you parse it
  appointment_time: string; // "HH:mm"
  event_timestamp: string; // ISO timestamp
  gender: "male" | "female" | "other";
  hobbies: string[];
  preferred_contact: "email" | "phone";
  subscribe_newsletter: boolean;
  interests: string[];
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  address: Address;
  assigned_to: {
    id: string;
    fullName: string;
  };
  resume: {
    name: string;
    url: string;
  }[];
  work_experience: {
    company: string;
    designation: string;
    department: string;
    location: string;
    start_date: string;
    end_date: string | null;
    currently_working: boolean;
    years: number;
    skills_used: string[];
    notice_period: string;
  }[];
  signature: string; // base64 image
  location: {
    latitude: number;
    longitude: number;
  };
}
