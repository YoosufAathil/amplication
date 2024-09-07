import { registerEnumType } from "@nestjs/graphql";

export enum EnumAssistantFunctions {
  CreateEntities = "createEntities",
  CreateEntityFields = "createEntityFields",
  GetProjectServices = "getProjectServices",
  GetServiceEntities = "getServiceEntities",
  CreateService = "createService",
  CreateProject = "createProject",
  CommitProjectPendingChanges = "commitProjectPendingChanges",
  GetProjectPendingChanges = "getProjectPendingChanges",
  GetPlugins = "getPlugins",
  InstallPlugins = "installPlugins",
  GetServiceModules = "getServiceModules",
  GetService = "getService",
  CreateModule = "createModule",
  GetModuleDtosAndEnums = "getModuleDtosAndEnums",
  CreateModuleDto = "createModuleDto",
  CreateModuleEnum = "createModuleEnum",
  GetModuleActions = "getModuleActions",
  CreateModuleAction = "createModuleAction",
  WritePluginFiles = "writePluginFiles",
  GetPluginFileList = "getPluginFileList",
  ReadPluginFileContent = "readPluginFileContent",
  PlanPluginCreation = "planPluginCreation",
  GetNextStepForPluginPlan = "getNextStepForPluginPlan",
  GetNextChangeForPluginOutline = "getNextChangeForPluginOutline",
  OutlinePluginChanges = "outlinePluginChanges",
}

registerEnumType(EnumAssistantFunctions, {
  name: "EnumAssistantFunctions",
});
