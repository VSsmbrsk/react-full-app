export const API_URL = "http://localhost:3001";

export const sortOptions = [
  { value: "_sort=level", content: "Level ASC" },
  { value: "_sort=-level", content: "Level DESC" },
  { value: "_sort=completed", content: "Complete ASC" },
  { value: "_sort=-completed", content: "Complete DESC" },
];

export const countOptions = [
  { value: "10", content: "10" },
  { value: "15", content: "15" },
  { value: "20", content: "20" },
  { value: "25", content: "25" },
];

export const levelOptions = [
  { value: "1", content: "1 - easiest" },
  { value: "2", content: "2 - medium" },
  { value: "3", content: "3 - hardest" },
];
