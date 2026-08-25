/**
 * Single source of truth for the document's sections (DESIGN.md §5, §6).
 * Meta-bar nav, left doc-rail index, and scroll logic all read from here so
 * the section numbering stays in lockstep.
 */
export type Section = {
  /** Two-digit document number, e.g. "01" */
  num: string;
  /** Anchor id used for in-page navigation */
  id: string;
  /** Short label for the doc-rail */
  label: string;
  /** Nav label for the meta-bar (may differ / be omitted) */
  nav?: string;
};

export const SECTIONS: Section[] = [
  { num: "00", id: "hero", label: "Index", nav: undefined },
  { num: "01", id: "work", label: "Selected Work", nav: "Work" },
  { num: "02", id: "pipeline", label: "The Pipeline", nav: "Pipeline" },
  { num: "03", id: "experience", label: "Experience", nav: "Experience" },
  { num: "04", id: "stack", label: "Stack", nav: "Stack" },
  { num: "05", id: "contact", label: "Contact", nav: "Contact" },
];
