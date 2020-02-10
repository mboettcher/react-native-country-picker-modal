import React, { ReactNode } from 'react'
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native'
import CloseButton from './CloseButton'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
})

export interface CloseButtonProps {
  onPress: () => void
}

interface HeaderModalProps {
  withFilter?: boolean
  withCloseButton?: boolean
  closeButtonImage?: ImageSourcePropType
  closeButtonStyle?: StyleProp<ViewStyle>
  closeButtonImageStyle?: StyleProp<ImageStyle>
  closeButton?: (closeButtonProps: CloseButtonProps) => ReactNode | ReactNode
  onClose(): void
  renderFilter(props: HeaderModalProps): ReactNode
}
export const HeaderModal = (props: HeaderModalProps) => {
  const {
    withFilter,
    withCloseButton,
    closeButton,
    closeButtonImage,
    closeButtonStyle,
    closeButtonImageStyle,
    onClose,
    renderFilter,
  } = props

  let button: ReactNode = (
    <CloseButton
      image={closeButtonImage}
      style={closeButtonStyle}
      imageStyle={closeButtonImageStyle}
      onPress={onClose}
    />
  )

  if (closeButton && typeof closeButton === 'function') {
    button = closeButton({ onPress: onClose })
  } else if (closeButton) {
    button = closeButton
  }

  return (
    <View style={styles.container}>
      {withCloseButton && button}
      {withFilter && renderFilter(props)}
    </View>
  )
}

HeaderModal.defaultProps = {
  withCloseButton: true,
}
