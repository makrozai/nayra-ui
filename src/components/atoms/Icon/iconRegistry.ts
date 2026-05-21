import { generatedIcons } from './generated-icons';

export function getIcon(type: string, icon: string) {
  return generatedIcons[type]?.[icon] ?? generatedIcons['solid']?.[icon] ?? null;
}
