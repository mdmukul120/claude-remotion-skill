import JSZip from 'jszip';
import { SKILL_FILES } from '../data/skillFiles';

export async function generateSkillRepoZip(repoName: string = 'claude-remotion-turbo-skill'): Promise<Blob> {
  const zip = new JSZip();
  const root = zip.folder(repoName) || zip;

  for (const file of SKILL_FILES) {
    root.file(file.path, file.content);
  }

  // Add a top-level .gitignore
  root.file(
    '.gitignore',
    `node_modules/
dist/
out/
.env
.DS_Store
*.log
`
  );

  return await zip.generateAsync({ type: 'blob' });
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
