import { useEffect, useState, useMemo } from 'react';

const CODE_SNIPPETS = [
  `const dev = {
  name: "Gourav Barnwal",
  role: "Backend & AI/ML Engineer",
  stack: ["FastAPI", "React", "PostgreSQL"],
  status: "building..."
};`,
  `async def evaluate_llm():
    pipeline = VideoUnderstanding()
    scores = pipeline.benchmark(["gemini", "gpt-4"])
    return scores.accuracy`,
  `export default function Portfolio() {
  return (
    <Hero name="Gourav" />
    <Projects />
    <Contact />
  );
}`,
  `$ npm run dev
> portfolio@0.0.0 dev
> vite

  VITE ready in 526 ms
  ➜  Local: http://localhost:8080/`,
  `class Engineer:
    def __init__(self):
        self.skills = ["Python", "TypeScript"]
        self.passion = "real-world systems"

    def ship(self, project):
        return deploy(project)`,
];

const MATRIX_CHARS = '01{}[]();=<>/\\|&*+#@$~const let async await return import export function class def if else for while';

function useTypingEffect(text: string, speed = 28, pauseMs = 3500) {
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pause = setTimeout(() => {
        setIsPaused(false);
        setIndex(0);
        setDisplay('');
      }, pauseMs);
      return () => clearTimeout(pause);
    }

    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplay(text.slice(0, index + 1));
        setIndex((i) => i + 1);
      }, speed + Math.random() * 20);
      return () => clearTimeout(timer);
    }

    setIsPaused(true);
  }, [text, speed, pauseMs, index, isPaused]);

  return display;
}

function TerminalWindow({
  snippet,
  title,
  className = '',
  speed = 28,
}: {
  snippet: string;
  title: string;
  className?: string;
  speed?: number;
}) {
  const typed = useTypingEffect(snippet, speed, 4000);

  return (
    <div className={`coder-terminal ${className}`}>
      <div className="coder-terminal-bar">
        <span className="coder-dot coder-dot-red" />
        <span className="coder-dot coder-dot-yellow" />
        <span className="coder-dot coder-dot-green" />
        <span className="coder-terminal-title">{title}</span>
      </div>
      <pre className="coder-terminal-body">
        <code>{typed}</code>
        <span className="typing-cursor" aria-hidden="true" />
      </pre>
    </div>
  );
}

function CodeRainColumn({ delay, left }: { delay: number; left: string }) {
  const chars = useMemo(
    () =>
      Array.from({ length: 28 }, () =>
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ).join('\n'),
    []
  );

  return (
    <div
      className="code-rain-column"
      style={{ left, animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      {chars}
    </div>
  );
}

interface CodeTypingBackgroundProps {
  variant?: 'hero' | 'ambient';
}

const CodeTypingBackground = ({ variant = 'ambient' }: CodeTypingBackgroundProps) => {
  const isHero = variant === 'hero';

  return (
    <>
      {/* Mobile fallback - simple gradient background */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-br from-[hsl(235_20%_6%)] to-[hsl(235_25%_8%)]" aria-hidden="true" />
      
      {/* Desktop version with full effects */}
      <div className={`code-typing-bg ${isHero ? 'code-typing-bg-hero' : 'code-typing-bg-ambient'} hidden md:block`} aria-hidden="true">
        <div className="code-grid-overlay" />

        {isHero ? (
          <>
            <div className="code-rain-layer">
              {Array.from({ length: 12 }).map((_, i) => (
                <CodeRainColumn key={i} delay={i * 0.7} left={`${i * 8.5 + 2}%`} />
              ))}
            </div>
            <TerminalWindow
              snippet={CODE_SNIPPETS[0]}
              title="portfolio.ts"
              className="coder-terminal-pos-1"
              speed={22}
            />
            <TerminalWindow
              snippet={CODE_SNIPPETS[1]}
              title="llm_eval.py"
              className="coder-terminal-pos-2 hidden lg:block"
              speed={26}
            />
            <TerminalWindow
              snippet={CODE_SNIPPETS[3]}
              title="bash — zsh"
              className="coder-terminal-pos-3 hidden xl:block"
              speed={18}
            />
          </>
        ) : (
          <>
            <div className="code-rain-layer">
              {Array.from({ length: 8 }).map((_, i) => (
                <CodeRainColumn key={i} delay={i * 0.9} left={`${i * 12 + 4}%`} />
              ))}
            </div>
            <div className="coder-ambient-lines">
              {CODE_SNIPPETS.slice(0, 4).map((line, i) => (
                <p key={i} className="coder-ambient-line" style={{ animationDelay: `${i * 2}s` }}>
                  {line.split('\n')[0]}
                </p>
              ))}
            </div>
          </>
        )}

        <div className="coder-scanlines" />
      </div>
    </>
  );
};

export default CodeTypingBackground;
