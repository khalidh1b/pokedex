import { Ability, Stat } from "./pokemon";

export type TabContentProp = {
  activeTab: string;
  weight: string;
  height: string;
  stats: Stat[];
  abilities: Ability[];
};