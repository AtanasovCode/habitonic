import { create } from 'zustand'

export const useStore = create((set) => ({
  //task dates to display based on screen width
  extraLarge: 12,
  large: 10,
  medium: 8,
  small: 6,
  extraSmall: 4,
  tiny: 2,
}))
