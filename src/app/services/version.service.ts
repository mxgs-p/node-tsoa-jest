import { VersionDto } from '@models/version.dto';

class VersionService {
  async Get() {
    return new Promise<VersionDto>((resolve) => {
      resolve({
        version: 'v0.1.0',
        description: 'Base project for a quickest kickoff',
        name: 'node+tsoa+jest'
      } as VersionDto);
    });
  }
}

export const versionService = new VersionService();
