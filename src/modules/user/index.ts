import { MOCK_USER_ID } from "@/utils/constants"
import { Observable, of } from "@/utils/rx"

interface UserModel {
  id: string
  name: string
}

interface UserService {
  getUser(): Observable<UserModel>
}

class FakerUserService implements UserService {
  getUser(): Observable<UserModel> {
    return of({
      id: MOCK_USER_ID,
      name: "Harsh Rohila",
    })
  }
}

export { FakerUserService }
export type { UserService, UserModel }
