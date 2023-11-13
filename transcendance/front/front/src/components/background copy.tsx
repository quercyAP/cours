import Image from 'next/image'
import background from '../../public/assets/background.png'
 
export default function Background( {children}: 
{children: React.ReactNode} )
{
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

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

    </div>
  )
}