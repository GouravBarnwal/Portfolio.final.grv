interface RotatingProfileProps {
  src: string;
  alt: string;
  className?: string;
}

const RotatingProfile = ({ src, alt, className = '' }: RotatingProfileProps) => {
  return (
    <div className={`hero-profile-stage ${className}`}>
      <div className="hero-profile-orbit hero-profile-orbit-1" />
      <div className="hero-profile-orbit hero-profile-orbit-2" />
      <div className="hero-profile-bracket hero-profile-bracket-left">{'{'}</div>
      <div className="hero-profile-bracket hero-profile-bracket-right">{'}'}</div>
      <div className="hero-profile-spin">
        <div className="hero-profile-ring">
          <img src={src} alt={alt} className="hero-profile-image" />
        </div>
      </div>
      <div className="hero-profile-badge">
        <span className="text-primary font-mono text-xs xl:text-sm">&lt;dev /&gt;</span>
      </div>
    </div>
  );
};

export default RotatingProfile;
