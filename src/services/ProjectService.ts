import { apiService, ApiService } from './ApiService';
import { Project } from '../api/dto/project';
import { ProjectModel } from '../api/dto/project.model';
import { ProjectRequestModel } from '../api/dto/project.request.model';

class ProjectService {
  private static instance: ProjectService;

  private constructor(private api: ApiService) {}

  public create(project: ProjectModel): Promise<ProjectModel> {
    return this.api.post<Project>("/api/project", new ProjectRequestModel(project))
      .then(e => new ProjectModel(e));
  }

  public getAll(projectManagerId?: number, fromDate?: string, toDate?: string): Promise<ProjectModel[]> {
    const params = {
      projectManagerId,
      fromDate,
      toDate,
    };

    return this.api.get<Project[]>('/api/project', params)
      .then((list: Project[]) => list.map(e => new ProjectModel(e)));
  }

  public get(id: number): Promise<ProjectModel> {
    return this.api.get<Project>(`/api/project/${id}`)
      .then(e => new ProjectModel(e));
  }

  public update(project: ProjectModel): Promise<ProjectModel> {
    return this.api.put<Project>(`/api/project/${project.id}`, new ProjectRequestModel(project))
     .then(e => new ProjectModel(e))
  }

  public delete(id: number): Promise<void> {
    return this.api.delete<null>(`/api/project/${id}`)
      .then(() => {});
  }

  public static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService(apiService);
    }

    return ProjectService.instance;
  }
}

export const projectService = ProjectService.getInstance();
export default projectService;
