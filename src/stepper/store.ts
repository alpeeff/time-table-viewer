import { create } from "zustand";
import { type CITIES, DEFAULT_TIME_SLOTS, Step } from "@/constants";

type CityType = (typeof CITIES)[number];

type CityDate = {
  city: CityType;
  dates: Record<string, string[]>;
};

type StepperStore = {
  step: Step;
  setStep: (step: Step) => void;
  cities: CityDate[];
  toggleCity: (city: CityType) => void;
  toggleDate: (city: CityType, date: string) => void;
  toggleTimeSlot: (city: CityType, date: string, timeSlot: string) => void;
};

export const useStepperStore = create<StepperStore>((set, get) => ({
  step: Step.SelectCity,
  setStep: (step: Step) => set({ step }),
  cities: [],
  toggleCity: (city: CityType) => {
    const { cities } = get();
    const cityIndex = cities.findIndex((c) => c.city.id === city.id);

    if (cityIndex !== -1) {
      cities.splice(cityIndex, 1);
    } else {
      cities.push({ city, dates: {} });
    }

    set({ cities });
  },

  toggleDate: (city: CityType, date: string) => {
    const { cities } = get();
    const cityIndex = cities.findIndex((c) => c.city.id === city.id);

    if (cityIndex === -1) {
      return;
    }

    const dates = cities[cityIndex].dates[date];

    if (dates) {
      delete cities[cityIndex].dates[date];
    } else {
      cities[cityIndex].dates[date] = DEFAULT_TIME_SLOTS;
    }

    set({ cities });
  },

  toggleTimeSlot: (city: CityType, date: string, timeSlot: string) => {
    const { cities } = get();
    const cityIndex = cities.findIndex((c) => c.city.id === city.id);

    if (cityIndex === -1) {
      return;
    }

    const slots = cities[cityIndex].dates[date];

    if (slots.includes(timeSlot)) {
      cities[cityIndex].dates[date] = slots.filter((slot) => slot !== timeSlot);
    } else {
      cities[cityIndex].dates[date] = [...slots, timeSlot];
    }

    set({ cities });
  },
}));
