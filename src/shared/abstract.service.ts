import { Repository } from 'typeorm';

export abstract class AbstracService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async save(options) {
    return this.repository.save(options);
  }

  async findOne(options: {
    id?: number;
    email?: string;
  }): Promise<any | undefined> {
    if (options.id) {
      return this.repository.findOne({ where: { id: options.id } });
    } else if (options.email) {
      return this.repository.findOne({ where: { email: options.email } });
    }
    return undefined;
  }

  async find(options) {
    return this.repository.find(options);
  }

  async update(id: number, options) {
    return this.repository.update(id, options);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
