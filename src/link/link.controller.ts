import { Controller, Get, Param } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller()
export class LinkController {
  constructor(private linkSerive: LinkService) {}

  @Get('admin/user/:id/links')
  async all(@Param('id') id: number) {
    return this.linkSerive.find({
      user: id,
      relations: ['orders'],
    });
  }
}
