import { defineStore } from 'pinia';

export const useRenterProgressStore = defineStore('renterProgress', {
  state: () => ({
    completedSteps: [] as number[],
    stepSummaries: {} as Record<number, string>,
  }),
  actions: {
    markStepCompleted(stepIndex: number, summary?: string) {
      if (!this.completedSteps.includes(stepIndex)) {
        this.completedSteps.push(stepIndex);
      }
      if (summary) {
        this.stepSummaries[stepIndex] = summary;
      }
    },
    getStepSummary(stepIndex: number): string {
      return this.stepSummaries[stepIndex] || '';
    },
  },
});
