import 'pinia';
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate';

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    /**
     * Configuración para persistir el store usando pinia-plugin-persistedstate.
     * Puede ser un booleano o un objeto con opciones.
     */
    persist?: boolean | PersistedStateOptions;
  }
}
