export enum RenterStatusEnum {
  NEW = 'new', // Usuario recién registrado, sin selección de estado
  EXPLORING_OPTIONS = 'exploring_options', // Explorando opciones en Spazio
  RENTING_NO_CONTRACT = 'renting_no_contract', // Arrendando sin contrato en Spazio
  RENTING_WITH_CONTRACT = 'renting_with_contract', // Arrendando con contrato en Spazio
  AGREEMENT_PENDING_CONTRACT = 'agreement_pending_contract', // Tiene un acuerdo, pero aún no ha firmado
  IDENTITY_VERIFIED = 'identity_verified', // Verificación de identidad validada
  GENERAL_INFORMATION_VERIFIED = 'general_information_verified', // Información general validada
  EMPLOYMENT_INFORMATION_VERIFIED = 'employment_information_verified', // Información laboral validada
  CONTRACT_EXPIRED = 'contract_expired', // Contrato vencido, necesita renovación
  TENANCY_ENDED = 'tenancy_ended', // Inquilino ha terminado su proceso "Quiero arrendar"
  REJECTED = 'rejected', // Inquilino rechazado
}
