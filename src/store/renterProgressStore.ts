import { defineStore } from 'pinia';
import { RenterStatusEnum } from '@/enums/renter-status.enum.ts';

interface Step {
  label: string;
  route: string;
  isCompleted: boolean;
  isRequired: boolean;
  summary: string;
}

export const useRenterProgressStore = defineStore('renterProgress', {
  state: () => ({
    steps: [
      {
        label: 'Empieza aquí',
        route: '/renter/want-to-rent',
        isCompleted: false,
        isRequired: true,
        summary: '',
      },
      {
        label: 'Estado actual',
        route: '/renter/select-scenario',
        isCompleted: false,
        isRequired: true,
        summary: '',
      },
      {
        label: 'Verificación de identidad',
        route: '/renter/identity-verification',
        isRequired: true,
        isCompleted: false,
        summary: '',
      },
      {
        label: 'Información general',
        route: '/renter/general-information',
        isRequired: true,
        isCompleted: false,
        summary: '',
      },
      {
        label: 'Informacion laboral',
        route: '/renter/employment-information',
        isRequired: true,
        isCompleted: false,
        summary: '',
      },
      {
        label: 'Conexión con el Propietario',
        route: '/renter/connect-owner',
        isRequired: true,
        isCompleted: false,
        summary: '',
      },
    ] as Step[],
    renterScenario: null as RenterStatusEnum | null,
  }),
  actions: {
    markStepCompleted(stepIndex: number, isCompleted: boolean) {
      const step = this.steps[stepIndex];
      if (step) {
        step.isCompleted = isCompleted;
      }
    },
    updateStepSummary(stepIndex: number, summary: string) {
      const step = this.steps[stepIndex];
      if (step) {
        step.summary = summary;
      }
    },
    setScenario(scenario: RenterStatusEnum) {
      this.renterScenario = scenario;

      // Reconfigurar qué pasos son requeridos según el escenario
      if (scenario === RenterStatusEnum.EXPLORING_OPTIONS) {
        this.steps[2].isRequired = true; // Verificación de identidad requerida
        this.steps[4].isRequired = true; // Información laboral requerida
      } else {
        this.steps[2].isRequired = false; // Verificación de identidad opcional
        this.steps[4].isRequired = false; // Información laboral opcional
      }
    },
  },
  getters: {
    getVisibleSteps: (state): Step[] => {
      return state.steps.filter((step) => step.isRequired);
    },
    isStepCompleted: (state) => (stepIndex: number) => state.steps[stepIndex]?.isCompleted ?? false,
    isStepRequired: (state) => (stepIndex: number) => state.steps[stepIndex]?.isRequired ?? false,
    selectedScenario: (state) => state.renterScenario,
    getStepSummary: (state) => (stepIndex: number) => state.steps[stepIndex]?.summary || '',
    getVisibleStepIndex:
      (state) =>
      (route: string): number => {
        return state.steps.filter((step) => step.isRequired).findIndex((step) => step.route === route);
      },
  },
  persist: true,
});
