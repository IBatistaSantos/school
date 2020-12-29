import { getRepository, Repository } from 'typeorm';
import ICreateAdministratorDTO from '@modules/administrators/dtos/ICreateAdministratorDTO';
import IAdmininstratorRepository from '../../../repositories/IAdministratorRepository';
import Administrator from '../entities/Administrator';

class AdministratorRepository implements IAdmininstratorRepository {
  private ormRepository: Repository<Administrator>;

  constructor() {
    this.ormRepository = getRepository(Administrator);
  }

  public async findById(id: string): Promise<Administrator | undefined> {
    const school = this.ormRepository.findOne({ where: { id } });
    return school;
  }

  public async create({
    school_id,
    user_id,
  }: ICreateAdministratorDTO): Promise<Administrator> {
    const administrator = this.ormRepository.create({
      school_id,
      user_id,
    });
    await this.ormRepository.save(administrator);
    return administrator;
  }

  public async save(administrator: Administrator): Promise<Administrator> {
    return this.ormRepository.save(administrator);
  }
}
export default AdministratorRepository;
