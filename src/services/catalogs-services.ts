import type { CatalogResult } from '@/interfaces/catalogs/catalogs.interface';

const catalogEjemplo: CatalogResult = {
  result: true,
  message: 'Nada importante',
  error: undefined,
  data: [
    {
      id: 1,
      name: 'Introducción a TypeScript',
      resume: 'Curso básico sobre TypeScript, incluyendo tipado y clases.',
      isPublic: true,
      category: 'General',
    },
    {
      id: 2,
      name: 'Recetas Saludables',
      resume: 'Colección de recetas saludables para el día a día.',
      isPublic: true,
      category: 'General',
    },
    {
      id: 3,
      name: 'Guía de Diseño UX/UI',
      resume: 'Principios fundamentales para diseñar interfaces efectivas.',
      isPublic: false,
      category: 'General',
    },
    {
      id: 4,
      name: 'Historia del Arte',
      resume: 'Resumen de los movimientos artísticos más importantes.',
      isPublic: true,
      category: 'General',
    },
    {
      id: 5,
      name: 'Guía de Seguridad en Aplicaciones Web',
      resume: 'Buenas prácticas para proteger aplicaciones contra vulnerabilidades.',
      isPublic: false,
      category: 'General',
    },
  ],
};

export class CatalogService {
  async products(): Promise<CatalogResult> {
    return catalogEjemplo;
  }
  /*
  async productsById(id: number): Promise<ProductResultFindByID> {
    const data: Product[] | undefined = productosEjemplo.data;
    let result: ProductResultFindByID = {
      result: false,
      message: 'Ninguno',
      error: { statusCode: 400, key: 'No se encontro' },
      data: undefined,
    };
    if (data) {
      for (let dato of data) {
        if (dato.id == id) {
          result = {
            result: true,
            message: 'Ninguno',
            error: null,
            data: dato,
          };
        }
      }
    }
    return result;
  }*/
}
