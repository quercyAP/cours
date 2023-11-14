import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, MeshProps } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

interface PaddleProps extends MeshProps {
  speed: number;
}

interface BallProps extends MeshProps {
  initialVelocity: Vector3;
}

const Paddle: React.FC<PaddleProps> = ({ speed, ...meshProps }) => {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.y += speed * delta;
      ref.current.position.y = Math.max(Math.min(ref.current.position.y, 5), -5);
    }
  });

  return (
    <mesh ref={ref} {...meshProps}>
      <boxGeometry args={[1, 5, 0.1]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
};

const Ball: React.FC<BallProps> = ({ initialVelocity, ...props }) => {
  const ref = useRef<Mesh>(null);
  const [velocity, setVelocity] = useState(initialVelocity);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.add(velocity);

      // Collision avec les limites verticales du champ
      if (ref.current.position.y > 5 || ref.current.position.y < -5) {
        setVelocity(new Vector3(velocity.x, velocity.y, 0));
      }
    }
    if (ref.current.position.x > 12 || ref.current.position.x < -12) {
      ref.current.position.set(0, 0, 0);
    }
  });

  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
};

const Pong: React.FC = () => {
  const [paddle1Speed, setPaddle1Speed] = useState<number>(0);
  const [paddle2Speed, setPaddle2Speed] = useState<number>(0);

  const paddle1Position = new Vector3(-10, 0, 0);
  const paddle2Position = new Vector3(10, 0, 0);
  const ballInitialVelocity = new Vector3(0.1, 0.1, 0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const speed = 5;
      switch (event.key) {
        case 'ArrowUp':
          setPaddle2Speed(speed);
          break;
        case 'ArrowDown':
          setPaddle2Speed(-speed);
          break;
        case 'w':
          setPaddle1Speed(speed);
          break;
        case 's':
          setPaddle1Speed(-speed);
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          setPaddle2Speed(0);
          break;
        case 'w':
        case 's':
          setPaddle1Speed(0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Paddle position={paddle1Position} speed={paddle1Speed} />
      <Paddle position={paddle2Position} speed={paddle2Speed} />
      <Ball position={new Vector3(0, 0, 0)} initialVelocity={ballInitialVelocity} />
    </Canvas>
  );
};

export default Pong;
