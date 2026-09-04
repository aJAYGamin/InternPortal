import { useState } from "react";
import type { HourEntry } from "./types";
import { INITIAL_HOURS } from "./mockData";

/** `useHoursEntries` controls all hours log entries, include
 * - A list of entries
 * - Add function
 */
export function useHoursEntries() {
  const [entries, setEntries] = useState<HourEntry[]>(INITIAL_HOURS);

  function addEntries(description: string, hours: string, project: string, viewDate: string): boolean {
    const h = parseFloat(hours);
    if (!description.trim() || isNaN(h) || h <= 0) return false;

    setEntries((es) => [...es, { id: Date.now(), date: viewDate, project, description: description.trim(), hours: h }]);

    return true;
  }

  return { entries, addEntries };
}

/**
 * `usePosHoursLog` manages the input from new entries, include:
 * - A description
 * - An amount of hours
 * - Project types
 * 
 * *Note*: the date of log is controlled by the `HoursLogWidge`'s `viewDate`, not by this hook 
 */
export function usePostHoursLog() {
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [project, setProject] = useState("Engineering");

  function reset() {
    setDescription("");
    setHours("");
    setProject("Engineering");
  }

  return {
    description, setDescription,
    hours, setHours,
    project, setProject,
    reset
  }
}