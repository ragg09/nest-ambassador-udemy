import { Injectable } from '@nestjs/common';
import { AbstracService } from '../shared/abstract.service';
import { Link } from './entities/link';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LinkService extends AbstracService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {
    super(linkRepository);
  }
}
