import React from 'react'
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View
} from 'react-native'
import { Icon, IconName } from '../../../../../../components/Icon'

export const IconButton = (props: TouchableWithoutFeedbackProps) => (
  <TouchableWithoutFeedback {...props}>
    <View style={{ width: 30, height: 30 }} />
  </TouchableWithoutFeedback>
)
