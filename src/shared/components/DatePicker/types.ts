export type DateInfo = {
  dates: Date[];
  tooltip: string;
  color: "green" | "yellow" | "blue";
}

export type DateInfoSettings = {
  [key: number]: {
    tooltip: string;
    color: DateInfo["color"];
  };
};