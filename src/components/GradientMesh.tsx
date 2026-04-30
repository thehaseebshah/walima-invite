export function GradientMesh() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full animate-mesh-slow opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full animate-mesh-slow-reverse opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '-5s',
        }}
      />
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-float opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(232,213,163,0.5) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
