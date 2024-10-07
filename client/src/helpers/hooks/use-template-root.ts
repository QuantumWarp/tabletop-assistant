import { useParams } from 'react-router-dom';
import { useGetEntitiesQuery, useGetTemplatesQuery } from '../../store/api';

export function useTemplateRoot() {
  const { tabletopId } = useParams() as { tabletopId: string };
  const {
    data: collections,
    isLoading: templateRootsLoading,
  } = useGetTemplatesQuery();
  const templateRoots = collections?.map((x) => x.root)
  const {
    data: entities,
    isLoading: entitiesLoading,
  } = useGetEntitiesQuery(tabletopId);

  if (templateRootsLoading || entitiesLoading) {
    return { isLoading: true, templateRoot: null };
  }

  if (!templateRoots || !entities) {
    return { isLoading: false, templateRoot: null };
  }

  const entityTags = entities.reduce((arr, x) => arr.concat(x.tags), [] as string[]);
  const matchedRoots = templateRoots.filter((x) => entityTags.includes(x.tag));

  return { isLoading: false, templateRoot: matchedRoots[0] };
}
