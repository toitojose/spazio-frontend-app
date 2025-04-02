export enum LeaseApplicationStatusEnum {
  PENDING = 'PENDING', // La solicitud está en espera de decisión del propietario.
  ACCEPTED = 'ACCEPTED', // El propietario ha aprobado al inquilino.
  REJECTED = 'REJECTED', // El propietario rechazó al inquilino.
  CANCELLED_BY_RENTER = 'CANCELLED_BY_RENTER', // El inquilino canceló su solicitud antes de la decisión.
  EXPIRED = 'EXPIRED', // La solicitud expiró después de un tiempo sin respuesta.
}
