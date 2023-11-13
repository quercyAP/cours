import Image from 'next/image'
import background from '../../public/assets/background.png'

export default function Background({ children }:
  { children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', width: '100vw', height: '100vh' }}>
      <Image
        alt="Background"
        src={background}
        placeholder="blur"
        quality={100}
        fill
        style={{
          position: 'absolute',
          objectFit: 'cover',
          zIndex: -1
        }}
      />
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(79, 22, 234, 0.1)', // Augmentez l'opacité pour réduire le contraste
        zIndex: -1
      }}></div>

      <div className='container'>
        {children}
      </div>

    </div>
  )
}