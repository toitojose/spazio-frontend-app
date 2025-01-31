import { defineStore } from 'pinia';

export const useRenterProgressStore = defineStore('renterProgress', {
  state: () => ({
    completedSteps: [] as number[],
  }),
  actions: {
    markStepCompleted(stepIndex: number) {
      if (!this.completedSteps.includes(stepIndex)) {
        this.completedSteps.push(stepIndex);
      }
    },
  },
});
