import { UserClient } from '@/api/UserClient.ts';
import type { GeneralFormData } from '@/interfaces/User.interface.ts';
import { useUserStore } from '@/store/user.ts';

export class UserService {
  private userClient: UserClient;

  constructor(userClient: UserClient) {
    this.userClient = userClient;
  }

  async registerUser(data: GeneralFormData) {
    const userStore = useUserStore();
    const token = userStore.token;
    return this.userClient.createUserWithRole(data, token);
  }

  async updateUser(data: GeneralFormData) {
    const userStore = useUserStore();
    const token = userStore.token;
    return this.userClient.updateUser(data, token);
  }
}
