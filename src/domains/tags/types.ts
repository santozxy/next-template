import { EntityType } from "../general/enums";

export interface Tag {
  id: string;
  name: string;
  category: EntityType;
}
export interface UpdateTags {
  tagsId: string[];
}
