import { useMemo } from 'react'
import { type SvgProps } from 'react-native-svg'
import { ICON } from './index.preset'

export type IconName = keyof typeof ICON

export interface IIcon extends SvgProps {
  name: IconName
}

export const Icon = ({ name, ...rest }: IIcon) => {
  const IconComponent = useMemo(() => ICON[name], [name])

  return <IconComponent {...rest} />
}
