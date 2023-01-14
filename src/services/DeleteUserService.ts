import IDeleteUserRepository from "../interfaces/IDeleteUserRepository";

export default class DeleteUserService {
  private readonly repository: IDeleteUserRepository;

  constructor(repository: IDeleteUserRepository) {
    this.repository = repository;
  }

  public async execute(id: number): Promise<Object> {
    await this.repository.execute(id);

    return { message: "Deletado" };
  }
}
