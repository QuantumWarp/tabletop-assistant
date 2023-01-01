import {
  CreateEntity,
  CreateLayout,
  Expression,
  ExpressionVariable,
  Macro,
  RollCombo,
} from 'tabletop-assistant-common';

type EntityIdObj = { entityId: string };

export class ReferencedIdHelper {
  static forLayout(layout: Omit<CreateLayout, 'tabletopId'>): EntityIdObj[] {
    return layout.entries;
  }

  static forEntity(entity: Omit<CreateEntity, 'tabletopId'>): EntityIdObj[] {
    const computedFields = entity.fields
      .map((x) => x.computed)
      .filter((x) => Boolean(x))
      .map((x) => x?.variables)
      .map((x) => Object.values(x as ExpressionVariable[]))
      .reduce((arr, x) => arr.concat(x), []);

    const actionTriggers = entity.actions
      .map((x) => x.triggers)
      .reduce((arr, x) => arr.concat(x), []);

    const actionComputedRolls = entity.actions
      .map((x) => x.roll)
      .filter((x): x is RollCombo => Boolean(x))
      .reduce((arr, x) => arr.concat(x), [])
      .reduce(
        (arr, x) => arr.concat([x.facesComputed, x.numberComputed]),
        [] as (Expression | undefined)[],
      )
      .filter((x) => Boolean(x))
      .map((x) => x?.variables)
      .map((x) => Object.values(x as ExpressionVariable[]))
      .reduce((arr, x) => arr.concat(x), []);

    const actionMacroTargets = entity.actions
      .map((x) => x.macros)
      .filter((x): x is Macro[] => Boolean(x))
      .reduce((arr, x) => arr.concat(x), [])
      .map((x) => x.target);

    const actionMacroComputed = entity.actions
      .map((x) => x.macros)
      .filter((x): x is Macro[] => Boolean(x))
      .reduce((arr, x) => arr.concat(x), [])
      .map((x) => x.expression.variables)
      .map((x) => Object.values(x as ExpressionVariable[]))
      .reduce((arr, x) => arr.concat(x), []);

    return [
      ...actionTriggers,
      ...computedFields,
      ...actionComputedRolls,
      ...actionMacroTargets,
      ...actionMacroComputed,
    ]
      .filter((x): x is EntityIdObj => Boolean(x.entityId))
      .filter((x) => x.entityId !== '-');
  }

  static setWithMap(
    refs: EntityIdObj[],
    idMap: { [templatedId: string]: string },
  ) {
    // eslint-disable-next-line no-param-reassign
    refs.forEach((x) => {
      x.entityId = idMap[x.entityId];
    });
  }

  static createEntityIdMap(
    existingEntities: { _id: string; templateId?: string }[],
    newEntities: { _id: string; templateId?: string }[],
  ): { [templatedId: string]: string } {
    return existingEntities.concat(newEntities).reduce(
      (obj, x) => ({
        ...obj,
        [x.templateId as string]: x._id,
      }),
      {},
    );
  }
}
