import Lottie from 'react-lottie'

type LottieProps = {
  animationData: any
  height?: number | string | '100%'
  width?: number | string | '100%'
  margin?: number | string
}

export const LottieAnimation = (props: LottieProps) => {
  const { animationData, width, height, margin } = props

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Lottie
      options={defaultOptions}
      style={{ width: width, height: height, margin: margin }}
    />
  )
}
