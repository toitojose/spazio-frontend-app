<template>
  <div ref="svgContainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { SVGManager } from './svg-manager';
import { svgMap } from './svg-map';
import type { SvgMapKeys } from './svg-map';

export default defineComponent({
  name: 'SVGShape',
  props: {
    shape: {
      type: String as () => SvgMapKeys,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
  },
  setup(props) {
    const svgContainer = ref<HTMLElement | null>(null);

    const loadSVG = async (shapeKey: SvgMapKeys, color: string) => {
      try {
        const svgLoader = svgMap[shapeKey];
        if (!svgLoader) {
          throw new Error(`Forma no encontrada en svgMap: ${shapeKey}`);
        }

        const svgContent = (await svgLoader()).default;
        const manager = new SVGManager(svgContent);

        // Actualiza color y tamaño directamente
        const finalSVG = manager.updateFillColor(color);

        // Renderiza el SVG directamente en el DOM
        if (svgContainer.value) {
          svgContainer.value.innerHTML = finalSVG;
        }
      } catch (error) {
        console.error('Error cargando la forma:', error);
        if (svgContainer.value) {
          svgContainer.value.innerHTML = '<p>Error al cargar la forma.</p>';
        }
      }
    };

    // Carga inicial del SVG
    onMounted(() => {
      loadSVG(props.shape, props.color);
    });

    // Reactividad: recarga el SVG si cambian las props
    watch(
      () => [props.shape, props.color],
      ([newShape, newColor]) => {
        loadSVG(newShape as SvgMapKeys, newColor);
      },
    );

    return {
      svgContainer,
    };
  },
});
</script>
