const loadExternalScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};

let vantaEffect: any = null;

const initializeVanta = async (vantaRef: HTMLElement | null): Promise<void> => {
  const windowWithVanta = window as typeof window & { VANTA?: any };

  await loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js');
  await loadExternalScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js');

  if (windowWithVanta.VANTA && vantaRef) {
    vantaEffect = windowWithVanta.VANTA.NET({
      el: vantaRef,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xb74e91,
      backgroundColor: 0x5e42a6,
    });
  }
};

const destroyVanta = (): void => {
  if (vantaEffect) {
    vantaEffect.destroy();
    vantaEffect = null;
  }
};

export { initializeVanta, destroyVanta };
