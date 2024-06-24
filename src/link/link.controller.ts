import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LinkService } from './link.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class LinkController {
  constructor(private linkSerive: LinkService) {}

  @UseGuards(AuthGuard)
  @Get('admin/user/:id/links')
  async all(@Param('id') id: number) {
    return this.linkSerive.find({
      user: id,
      relations: ['orders'],
    });
  }
}
