import produce from 'immer';
import { Types } from 'mongoose';
import {
  CreateEntity, CreateLayout, Entity, Expression, RollCombo, TemplateImport,
} from 'tabletop-assistant-common';
import { Macro } from 'tabletop-assistant-common/src/entity/expression';

import EntityRepository from '../entity/entity.repository';
import LayoutRepository from '../layout/layout.repository';
import TemplateRepository from './template.repository';
import TemplatedEntityRepository from './templated-entity.repository';
import TemplatedLayoutRepository from './templated-layout.repository';

type TemplatedEntity = Omit<Entity, 'tabletopId' | 'userId' | 'createdAt' | 'updatedAt' | '__v'>;

export default class TemplateService {
  constructor(
    private entityRepository: EntityRepository,
    private layoutRepository: LayoutRepository,
    private templateRepository: TemplateRepository,
    private templatedLayoutRepository: TemplatedLayoutRepository,
    private templatedEntityRepository: TemplatedEntityRepository,
  ) {}

  async import(model: TemplateImport) {
    // const layoutsToImport = await this.templatedLayoutRepository.getAll(model.layoutIds);
    // const entitiesToImport = await this.templatedEntityRepository.getAll(model.entityIds);

    // // Entities not duplicated
    // const referencedTemplateIds = TemplateService.findReferencedIds(entitiesToImport);

    // const existingEntities = await this.entityRepository
    //   .getTemplated(tabletopId, referencedTemplateIds);
    // const existingTemplateIds = existingEntities.map((x) => x.templateId);

    // const newEntities = template.entities
    //   .filter((x) => !existingTemplateIds.includes(x._id))
    //   .map((x) => ({
    //     ...x,
    //     templateId: x._id,
    //     tabletopId,
    //     _id: new Types.ObjectId().toString(),
    //   }));

    // const idMap = TemplateService.createEntityIdMap(
    //   existingEntities.map((x) => ({ _id: x._id, templateId: x.templateId })),
    //   newEntities.map((x) => ({ _id: x._id, templateId: x.templateId })),
    // );

    // await Promise.all(newEntities
    //   .map((x) => TemplateService.updateEntityReferencedIds(x, idMap))
    //   .map((x) => this.entityRepository.create(x)));

    // // Layouts created every time
    // const newLayouts = template.layouts
    //   .map((x) => ({
    //     ...x,
    //     templateId: x._id,
    //     tabletopId,
    //     _id: new Types.ObjectId(),
    //   }));

    // await Promise.all(newLayouts
    //   .map((x) => TemplateService.updateLayoutReferencedIds(x, idMap))
    //   .map((x) => this.layoutRepository.create(x)));
  }

  private static findReferencedIds(entities: TemplatedEntity[]) {
    return entities
      .map((x) => TemplateService.findReferencedIdsOnEntity(x))
      .reduce((arr, x) => arr.concat(x), []);
  }

  private static findReferencedIdsOnEntity(entity: TemplatedEntity) {
    const actionTriggerIds = entity.actions
      .map((x) => x.triggers)
      .reduce((arr, x) => arr.concat(x), [])
      .filter((x) => Boolean(x.entityId))
      .map((x) => x.entityId as string);

    const computedFieldIds = entity.fields
      .map((x) => x.computed)
      .filter((x) => Boolean(x))
      .map((x) => x!.variables)
      .map((x) => Object.values(x))
      .reduce((arr, x) => arr.concat(x), [])
      .map((x) => x.entityId);

    const computedRollIds = entity.actions
      .map((x) => x.roll)
      .filter((x): x is RollCombo => Boolean(x))
      .reduce((arr, x) => arr.concat(x), [])
      .reduce(
        (arr, x) => arr!.concat([x.facesComputed, x.numberComputed]),
        [] as (Expression | undefined)[],
      )
      .filter((x) => Boolean(x))
      .map((x) => x!.variables)
      .map((x) => Object.values(x))
      .reduce((arr, x) => arr.concat(x), [])
      .map((x) => x.entityId);

    const computedMacroTargetIds = entity.actions
      .map((x) => x.macros)
      .filter((x): x is Macro[] => Boolean(x))
      .reduce((arr, x) => arr.concat(x), [])
      .map((x) => x.target.entityId);

    const computedMacroIds = entity.actions
      .map((x) => x.macros)
      .filter((x): x is Macro[] => Boolean(x))
      .reduce((arr, x) => arr.concat(x), [])
      .map((x) => x.expression.variables)
      .map((x) => Object.values(x))
      .reduce((arr, x) => arr.concat(x), [])
      .map((x) => x.entityId);

    return [
      entity._id,
      ...actionTriggerIds,
      ...computedFieldIds,
      ...computedRollIds,
      ...computedMacroTargetIds,
      ...computedMacroIds,
    ];
  }

  private static createEntityIdMap(
    existingEntities: { _id: string, templateId?: string }[],
    newEntities: { _id: string, templateId?: string }[],
  ): { [templatedId: string]: string } {
    return existingEntities.concat(newEntities)
      .reduce((obj, x) => ({
        ...obj,
        [x.templateId as string]: x._id,
      }), {});
  }

  private static updateEntityReferencedIds(
    entity: CreateEntity,
    idMap: { [templatedId: string]: string },
  ): CreateEntity {
    return produce(entity, (draft) => {
      draft.actions
        .map((x) => x.triggers)
        .reduce((arr, x) => arr.concat(x), [])
        .filter((x) => Boolean(x.entityId))
        // eslint-disable-next-line no-param-reassign
        .forEach((x) => { x.entityId = idMap[x.entityId as string]; });

      draft.fields
        .map((x) => x.computed)
        .filter((x) => Boolean(x))
        .map((x) => x!.variables)
        .map((x) => Object.values(x))
        .reduce((arr, x) => arr.concat(x), [])
        // eslint-disable-next-line no-param-reassign
        .forEach((x) => { x.entityId = idMap[x.entityId]; });

      draft.actions
        .map((x) => x.roll)
        .filter((x): x is RollCombo => Boolean(x))
        .reduce((arr, x) => arr.concat(x), [])
        .reduce(
          (arr, x) => arr!.concat([x.facesComputed, x.numberComputed]),
          [] as (Expression | undefined)[],
        )
        .filter((x) => Boolean(x))
        .map((x) => x!.variables)
        .map((x) => Object.values(x))
        .reduce((arr, x) => arr.concat(x), [])
        // eslint-disable-next-line no-param-reassign
        .forEach((x) => { x.entityId = idMap[x.entityId]; });

      draft.actions
        .map((x) => x.macros)
        .filter((x): x is Macro[] => Boolean(x))
        .reduce((arr, x) => arr.concat(x), [])
        .map((x) => x.target)
        // eslint-disable-next-line no-param-reassign
        .forEach((x) => { x.entityId = idMap[x.entityId]; });

      draft.actions
        .map((x) => x.macros)
        .filter((x): x is Macro[] => Boolean(x))
        .reduce((arr, x) => arr.concat(x), [])
        .map((x) => x.expression.variables)
        .map((x) => Object.values(x))
        .reduce((arr, x) => arr.concat(x), [])
        // eslint-disable-next-line no-param-reassign
        .forEach((x) => { x.entityId = idMap[x.entityId]; });
    });
  }

  private static updateLayoutReferencedIds(
    entity: CreateLayout,
    idMap: { [templatedId: string]: string },
  ): CreateLayout {
    return {
      ...entity,
      entries: entity.entries
        .map((x) => ({ ...x, entityId: idMap[x.entityId] })),
    };
  }
}
