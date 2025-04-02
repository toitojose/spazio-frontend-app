import type {
  Catalog,
  CatalogCreateResult,
  CatalogResult,
  CatalogSend,
  CatalogResultFindByID,
  CatalogSendUpdate,
  CatalogUpdateResult,
} from '@/interfaces/catalogs/catalogs.interface';

import type { AxiosInstance } from 'axios';

let resultadoCreate: CatalogCreateResult = {
  result: true,
  message: 'Exito',
  error: undefined,
  data: '',
};

let resultadoUpdate: CatalogUpdateResult = {
  result: true,
  message: 'Exito',
  error: undefined,
  data: '',
};

const catalogEjemplo: CatalogResult = {
  result: true,
  message: 'Nada importante',
  error: undefined,
  data: [
    {
      id: 1,
      name: 'Introducción a TypeScript',
      description: 'Curso básico sobre TypeScript, incluyendo tipado y clases.',
      isPublic: true,
      category: 'Nivel 1',
      createdAt: '',
      updatedAt: '',
      deletedAt: undefined,
    },
    {
      id: 2,
      name: 'Recetas Saludables',
      description: 'Colección de recetas saludables para el día a día.',
      isPublic: true,
      category: 'Nivel 1',
      createdAt: '',
      updatedAt: '',
      deletedAt: undefined,
    },
    {
      id: 3,
      name: 'Guía de Diseño UX/UI',
      description: 'Principios fundamentales para diseñar interfaces efectivas.',
      isPublic: false,
      category: 'Nivel 1',
      createdAt: '',
      updatedAt: '',
      deletedAt: undefined,
    },
    {
      id: 4,
      name: 'Historia del Arte',
      description: 'Resumen de los movimientos artísticos más importantes.',
      isPublic: true,
      category: 'Nivel 1',
      createdAt: '',
      updatedAt: '',
      deletedAt: undefined,
    },
    {
      id: 5,
      name: 'Guía de Seguridad en Aplicaciones Web',
      description: 'Buenas prácticas para proteger aplicaciones contra vulnerabilidades.',
      isPublic: false,
      category: 'Nivel 1',
      createdAt: '',
      updatedAt: '',
      deletedAt: undefined,
    },
  ],
};

export class CatalogService {
  private authBackendClient: AxiosInstance;

  constructor(authBackendClient: AxiosInstance) {
    this.authBackendClient = authBackendClient;
  }

  async catalogs(): Promise<CatalogResult> {
    return catalogEjemplo;
  }
  async catalogsById(id: number): Promise<CatalogResultFindByID> {
    const data: Catalog[] | undefined = catalogEjemplo.data;
    let result: CatalogResultFindByID = {
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
  }

  async update(data: CatalogSendUpdate): Promise<CatalogUpdateResult> {
    /*const response = await this.authBackendClient.post<ProductResult>('/v1.0/products/data.id', {
      data,
    });
    return response.data;*/
    resultadoUpdate.data = data.name;
    return resultadoUpdate;
  }

  async create(data: CatalogSend): Promise<CatalogCreateResult> {
    /*const response = await this.authBackendClient.post<ProductResult>('/v1.0/products', {
      data,
    });
    return response.data;*/
    resultadoCreate.data = data.name;
    return resultadoCreate;
  }
}
