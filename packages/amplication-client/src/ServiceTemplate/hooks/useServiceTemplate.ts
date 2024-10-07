import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import * as models from "../../models";
import {
  CREATE_SERVICE_TEMPLATE,
  GET_SERVICE_TEMPLATES,
} from "./serviceTemplateQueries";
import { GET_RESOURCES } from "../../Workspaces/queries/resourcesQueries";

type TFindResourcesData = {
  resources: models.Resource[];
};

type TGetServiceTemplates = {
  serviceTemplates: models.Resource[];
};

type TCreateServiceTemplate = {
  createServiceTemplate: models.Resource;
};

const useServiceTemplate = (
  currentProject: models.Project | undefined,
  onServiceTemplateCreated?: (serviceTemplate: models.Resource) => void
) => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");

  const {
    data: serviceTemplates,
    loading: loadingServiceTemplates,
    error: errorServiceTemplates,
    refetch: reloadServiceTemplates,
  } = useQuery<TGetServiceTemplates>(GET_SERVICE_TEMPLATES, {
    variables: {
      projectId: currentProject?.id,
      whereName:
        searchPhrase !== ""
          ? { contains: searchPhrase, mode: models.QueryMode.Insensitive }
          : undefined,
    },
    skip: !currentProject?.id,
  });

  const [
    createServiceTemplateInternal,
    {
      loading: loadingCreateServiceTemplate,
      error: errorCreateServiceTemplate,
      data: createServiceTemplateData,
    },
  ] = useMutation<TCreateServiceTemplate>(CREATE_SERVICE_TEMPLATE, {});

  const createServiceTemplate = (data: models.ServiceTemplateCreateInput) => {
    createServiceTemplateInternal({ variables: { data: data } })
      .then((result) => {
        reloadServiceTemplates();
        onServiceTemplateCreated &&
          onServiceTemplateCreated(result.data.createServiceTemplate);
      })
      .catch(console.error);
  };

  const handleSearchChange = useCallback(
    (value) => {
      setSearchPhrase(value);
    },
    [setSearchPhrase]
  );

  const [
    findResourcesByTemplateInternal,
    {
      data: findResourcesByTemplateData,
      loading: findResourcesByTemplateLoading,
      error: findResourcesByTemplateError,
      refetch: findResourcesByTemplateRefetch,
    },
  ] = useLazyQuery<TFindResourcesData>(GET_RESOURCES);

  const findResourcesByTemplate = (templateId: string) => {
    findResourcesByTemplateInternal({
      variables: {
        where: {
          project: { id: currentProject?.id },
          serviceTemplateId: templateId,
        },
      },
    });
  };

  return {
    serviceTemplates: serviceTemplates?.serviceTemplates || [],
    handleSearchChange,
    loadingServiceTemplates,
    errorServiceTemplates,
    reloadServiceTemplates,
    createServiceTemplate,
    loadingCreateServiceTemplate,
    errorCreateServiceTemplate,
    createdServiceTemplateResults: createServiceTemplateData,
    findResourcesByTemplate,
    findResourcesByTemplateData: findResourcesByTemplateData?.resources,
    findResourcesByTemplateLoading,
    findResourcesByTemplateError,
    findResourcesByTemplateRefetch,
  };
};

export default useServiceTemplate;
