export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

export const DEFAULT_TIME_SLOTS = ["10:30", "11:00", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"];

export const CUSTOM_CITY_ID = "custom";

export const CITIES = [
  {
    id: "1",
    name: "Мукачево",
  },
  {
    id: "2",
    name: "Ужгород",
  },
  {
    id: "3",
    name: "PRAHA",
  },
  {
    id: "4",
    name: "BUDAPEST",
  },
];

export enum Step {
  SelectCity = "select-city",
  SelectDates = "select-dates",
  Preview = "preview",
}
