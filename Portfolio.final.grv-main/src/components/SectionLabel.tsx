interface SectionLabelProps {
  file: string;
  comment?: string;
}

const SectionLabel = ({ file, comment }: SectionLabelProps) => (
  <p className="coder-section-label">
    <span className="text-green-400">//</span>
    {comment ? ` ${comment}` : ''}
    <span className="text-muted-foreground ml-2">{file}</span>
  </p>
);

export default SectionLabel;
