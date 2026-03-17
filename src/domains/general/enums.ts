export enum EntityType {
  touristAttraction = "touristAttraction",
  hosting = "hosting",
  restaurant = "restaurant",
  event = "event",
  guide = "guide",
  agency = "agency",
  travelPackage = "travelPackage",
  municipality = "municipality",
  craft = "craft",
}

export enum Roles {
  admin = "admin",
}

export enum Status {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export enum AccessibilityItem {
  ramp = "ramp", // Rampa de acesso
  parking = "parking", // Vaga de estacionamento exclusiva
  accessibleBath = "accessibleBath", // Banheiro acessível
  tactileFloor = "tactileFloor", // Piso tátil
  elevator = "elevator", // Elevador acessível
  priorityService = "priorityService", // Atendimento prioritário
  braille = "braille", // Sinalização em Braille
  audioGuide = "audioGuide", // Audioguias com descrição
  multiLanguage = "multiLanguage", // Informações em múltiplos idiomas
}

export enum AccessibilityLabel {
  ramp = "Rampa de acesso",
  parking = "Vaga de estacionamento exclusiva",
  accessibleBath = "Banheiro acessível",
  tactileFloor = "Piso tátil",
  elevator = "Elevador acessível",
  priorityService = "Atendimento prioritário",
  braille = "Sinalização em Braille",
  audioGuide = "Audioguias com descrição",
  multiLanguage = "Informações em múltiplos idiomas",
}
