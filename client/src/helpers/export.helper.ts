import { CreateEntity } from '@tabletop-assistant/common';

export default class ExportHelper {
  static export(entity: CreateEntity) {
    const jsonString = JSON.stringify(entity, null, 2);
    const jsString = jsonString
      .replace(/"(.*)":/g, '$1:')
      .replace(/"/g, '\'');
    navigator.clipboard.writeText(jsString);
  }
}
