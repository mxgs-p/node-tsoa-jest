import { Controller, Get, Route, Tags } from 'tsoa';
import { versionService } from '@services/version.service';

@Route('api/v1/version')
@Tags('Version')
export class VersionController extends Controller {
  @Get()
  public async Get() {
    return versionService.Get();
  }
}
