import { Permission } from "@/domains/auth/enums";

export const routePermissionsMap = {
  "/municipalities": {
    view: Permission.viewMunicipalities,
    create: Permission.createMunicipalities,
    update: Permission.updateMunicipalities,
    delete: Permission.deleteMunicipalities,
  },
  "/tourist-attractions": {
    view: Permission.viewTouristAttractions,
    create: Permission.createTouristAttractions,
    update: Permission.updateTouristAttractions,
    delete: Permission.deleteTouristAttractions,
  },
  "/hostings": {
    view: Permission.viewHostings,
    create: Permission.createHostings,
    update: Permission.updateHostings,
    delete: Permission.deleteHostings,
  },
  "/events": {
    view: Permission.viewEvents,
    create: Permission.createEvents,
    update: Permission.updateEvents,
    delete: Permission.deleteEvents,
  },
  "/agencies": {
    view: Permission.viewAgencies,
    create: Permission.createAgencies,
    update: Permission.updateAgencies,
    delete: Permission.deleteAgencies,
  },
  "/guides": {
    view: Permission.viewGuides,
    create: Permission.createGuides,
    update: Permission.updateGuides,
    delete: Permission.deleteGuides,
  },
  "/packages": {
    view: Permission.viewTravelPackages,
    create: Permission.createTravelPackages,
    update: Permission.updateTravelPackages,
    delete: Permission.deleteTravelPackages,
  },
  "/restaurants": {
    view: Permission.viewRestaurants,
    create: Permission.createRestaurants,
    update: Permission.updateRestaurants,
    delete: Permission.deleteRestaurants,
  },
  "/crafts": {
    view: Permission.viewCrafts,
    create: Permission.createCrafts,
    update: Permission.updateCrafts,
    delete: Permission.deleteCrafts,
  },
  "/users": {
    view: Permission.viewAdmins,
    create: Permission.createAdmins,
    update: Permission.updateAdmins,
    delete: Permission.deleteAdmins,
  },
  "/news": {
    view: Permission.viewNews,
    create: Permission.createNews,
    update: Permission.updateNews,
    delete: Permission.deleteNews,
  },
  "/tags": {
    view: Permission.viewTags,
    create: Permission.createTags,
    update: Permission.updateTags,
    delete: Permission.deleteTags,
  },
};

export function getRoutePermission(pathname: string): Permission[] | null {
  for (const [basePath, perms] of Object.entries(routePermissionsMap)) {
    if (pathname === basePath) {
      return [perms.view];
    }
    if (perms.create && pathname === `${basePath}/create`) {
      return [perms.create];
    }
    if (
      perms.view &&
      pathname.startsWith(`${basePath}/`) &&
      !pathname.endsWith("/update")
    ) {
      return [perms.view];
    }
    if (
      perms.update &&
      pathname.startsWith(`${basePath}/`) &&
      pathname.endsWith("/update")
    ) {
      return [perms.update];
    }
  }
  return null;
}

export function hasPermission(
  userPermissions: Permission[] = [],
  permission: Permission
): boolean {
  if (!userPermissions) return false;

  if (userPermissions.includes(Permission.all)) {
    return true;
  }
  return userPermissions.includes(permission);
}

export const permissionsModules = [
  {
    name: "admins",
    label: "Usuários",
    permissions: [
      { value: Permission.viewAdmins, label: "Visualizar" },
      { value: Permission.createAdmins, label: "Criar" },
      { value: Permission.updateAdmins, label: "Editar" },
      { value: Permission.deleteAdmins, label: "Excluir" },
    ],
  },
  {
    name: "events",
    label: "Eventos",
    permissions: [
      { value: Permission.viewEvents, label: "Visualizar" },
      { value: Permission.createEvents, label: "Criar" },
      { value: Permission.updateEvents, label: "Editar" },
      { value: Permission.deleteEvents, label: "Excluir" },
    ],
  },
  {
    name: "touristAttractions",
    label: "Atrações Turísticas",
    permissions: [
      { value: Permission.viewTouristAttractions, label: "Visualizar" },
      { value: Permission.createTouristAttractions, label: "Criar" },
      { value: Permission.updateTouristAttractions, label: "Editar" },
      { value: Permission.deleteTouristAttractions, label: "Excluir" },
    ],
  },
  {
    name: "hostings",
    label: "Hospedagens",
    permissions: [
      { value: Permission.viewHostings, label: "Visualizar" },
      { value: Permission.createHostings, label: "Criar" },
      { value: Permission.updateHostings, label: "Editar" },
      { value: Permission.deleteHostings, label: "Excluir" },
    ],
  },

  {
    name: "restaurants",
    label: "Restaurantes",
    permissions: [
      { value: Permission.viewRestaurants, label: "Visualizar" },
      { value: Permission.createRestaurants, label: "Criar" },
      { value: Permission.updateRestaurants, label: "Editar" },
      { value: Permission.deleteRestaurants, label: "Excluir" },
    ],
  },
  {
    name: "agencies",
    label: "Agências",
    permissions: [
      { value: Permission.viewAgencies, label: "Visualizar" },
      { value: Permission.createAgencies, label: "Criar" },
      { value: Permission.updateAgencies, label: "Editar" },
      { value: Permission.deleteAgencies, label: "Excluir" },
    ],
  },
  {
    name: "guides",
    label: "Guias",
    permissions: [
      { value: Permission.viewGuides, label: "Visualizar" },
      { value: Permission.createGuides, label: "Criar" },
      { value: Permission.updateGuides, label: "Editar" },
      { value: Permission.deleteGuides, label: "Excluir" },
    ],
  },
  {
    name: "travelPackages",
    label: "Pacotes de Viagem",
    permissions: [
      { value: Permission.viewTravelPackages, label: "Visualizar" },
      { value: Permission.createTravelPackages, label: "Criar" },
      { value: Permission.updateTravelPackages, label: "Editar" },
      { value: Permission.deleteTravelPackages, label: "Excluir" },
    ],
  },

  {
    name: "crafts",
    label: "Artesanatos",
    permissions: [
      { value: Permission.viewCrafts, label: "Visualizar" },
      { value: Permission.createCrafts, label: "Criar" },
      { value: Permission.updateCrafts, label: "Editar" },
      { value: Permission.deleteCrafts, label: "Excluir" },
    ],
  },
  {
    name: "news",
    label: "Notícias",
    permissions: [
      { value: Permission.viewNews, label: "Visualizar" },
      { value: Permission.createNews, label: "Criar" },
      { value: Permission.updateNews, label: "Editar" },
      { value: Permission.deleteNews, label: "Excluir" },
    ],
  },
];

export const getPermissionModules = (userPermissions: Permission[]) => {
  if (userPermissions.includes(Permission.all)) {
    return permissionsModules;
  }
  const modules = permissionsModules.map((module) => {
    const allowedPermissions = module.permissions.filter((perm) =>
      userPermissions.includes(perm.value)
    );
    return { ...module, permissions: allowedPermissions };
  });

  return modules.filter((module) => module.permissions.length > 0);
};
