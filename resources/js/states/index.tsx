import { create } from "zustand"

export type ThemeType = "light" | "dark" | "system"

export const useThemeState = create<{
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}))

export const useLoadingState = create<{
  loading: boolean
  setLoading: (loading: boolean) => void
}>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}))
