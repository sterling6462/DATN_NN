import { create } from 'zustand'
import { ApiCore, IBaseSubmit } from '..'

interface IAuth {
  // scope: string
  username: string
  access_token: string
  // refresh_token: string
  // token_type: string
  exp: string
  role: string
  roles: string[]
  houseId?: string
  roomId?: string
}

interface IStore extends IBaseSubmit {
  auth?: IAuth
  loginApi: (endpoint: string, params: unknown) => Promise<void>
  setAuth: (auth: IAuth) => void
}

export const useAuthStore = create<IStore>((set) => {
  return {
    auth: undefined,
    loginApi: async (endpoint: string, params: unknown) => {
      set({ isSubmitting: true })
      try {
        const response = await ApiCore.post<IAuth>(endpoint, params)
        set({ auth: response.data, isSubmitting: false, isError: false })
      } catch (error) {
        set({ isError: true, isSubmitting: false })
      }
    },
    setAuth: (auth: IAuth) => {
      set({ auth: auth })
    }
  }
})
