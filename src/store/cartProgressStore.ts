import { defineStore } from 'pinia';

interface Step {
  isCompleted: boolean;
  isRequired: boolean;
  selectedScenario?: string | null;
  summary: string;
}

export const useCartProgressStore = defineStore('cartProgress', {
  state: () => ({
    steps: {
      0: { isCompleted: false, isRequired: true, summary: '' },
      1: { isCompleted: false, isRequired: true, selectedScenario: null, summary: '' },
      2: { isCompleted: false, isRequired: false, summary: '' },
    } as Record<number, Step>,
  }),
  actions: {
    markStepCompleted(stepIndex: number, isCompleted: boolean, summary?: string) {
      this.steps[stepIndex].isCompleted = isCompleted;
      if (summary) {
        this.steps[stepIndex].summary = summary;
      }
    },
    setScenario(scenario: string, summary: string) {
      this.steps[1].selectedScenario = scenario;
      this.steps[1].isCompleted = true;
      this.steps[1].summary = summary;

      // Puedes usar lógica condicional aquí si tu flujo lo requiere
      if (scenario === 'delivery') {
        this.steps[2].isRequired = true; // Confirmación final requerida
      } else {
        this.steps[2].isRequired = false;
      }
    },
    updateStepSummary(stepIndex: number, summary: string) {
      this.steps[stepIndex].summary = summary;
    },
  },
  getters: {
    isStepCompleted: (state) => (stepIndex: number) => state.steps[stepIndex].isCompleted,
    isStepRequired: (state) => (stepIndex: number) => state.steps[stepIndex].isRequired,
    selectedScenario: (state) => state.steps[1].selectedScenario,
    getStepSummary: (state) => (stepIndex: number) => state.steps[stepIndex].summary,
  },
  persist: true,
});
