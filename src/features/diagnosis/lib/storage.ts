import type { DiagnosisAnswerMap, DiagnosisContextAnswers, PersistedDiagnosisState } from "./types";

const storageVersion = 2;

export function getStorageKey(slug: string) {
  return `dominase-diagnosis:${slug}`;
}

export function loadDiagnosisState(slug: string): PersistedDiagnosisState | null {
  try {
    const raw = window.localStorage.getItem(getStorageKey(slug));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedDiagnosisState> & { storageVersion?: number };
    if (!parsed.storageVersion || parsed.storageVersion < storageVersion) {
      window.localStorage.removeItem(getStorageKey(slug));
      return null;
    }

    return {
      storageVersion,
      contextAnswers: parsed.contextAnswers || {},
      answers: sanitizeAnswers(parsed.answers || {}),
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveDiagnosisState(slug: string, contextAnswers: DiagnosisContextAnswers, answers: DiagnosisAnswerMap) {
  try {
    window.localStorage.setItem(
      getStorageKey(slug),
      JSON.stringify({
        storageVersion,
        contextAnswers,
        answers,
        updatedAt: new Date().toISOString(),
      })
    );
  } catch {
    // Local diagnosis progress is a convenience; the assessment still works if storage is unavailable.
  }
}

function sanitizeAnswers(answers: DiagnosisAnswerMap) {
  return Object.entries(answers).reduce<DiagnosisAnswerMap>((clean, [topicId, answer]) => {
    const currentTouched = answer.currentTouched === true;
    const targetTouched = answer.targetTouched === true;
    if (!currentTouched && !targetTouched) return clean;

    clean[topicId] = {
      current: typeof answer.current === "number" && currentTouched ? answer.current : null,
      target: typeof answer.target === "number" && targetTouched ? answer.target : null,
      currentTouched,
      targetTouched,
      answeredAt: currentTouched && targetTouched && answer.answeredAt ? answer.answeredAt : undefined,
    };

    return clean;
  }, {});
}

export function clearDiagnosisState(slug: string) {
  try {
    window.localStorage.removeItem(getStorageKey(slug));
  } catch {
    // Ignore storage failures.
  }
}
