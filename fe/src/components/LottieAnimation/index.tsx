import lottie, { AnimationItem } from 'lottie-web'
import { useEffect, useRef } from 'react'

type LottieAnimationProps = {
  animationData: any
  height?: number | string | '100%'
  width?: number | string | '100%'
  margin?: number | string
}

export const LottieAnimation = (props: LottieAnimationProps) => {
  const { animationData, height, width, margin } = props

  const animationContainerRef = useRef<HTMLDivElement>(null)
  let animation: AnimationItem | null = null

  useEffect(() => {
    if (animationContainerRef.current) {
      animation = lottie.loadAnimation({
        container: animationContainerRef.current,
        animationData: animationData,
        renderer: 'svg',
        loop: true,
        autoplay: true
      })
    }

    return () => {
      if (animation) {
        animation.destroy()
        animation = null
      }
    }
  }, [animationData])

  return <div ref={animationContainerRef} style={{ width, height, margin }} />
}
