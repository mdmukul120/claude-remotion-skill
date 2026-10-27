import JSZip from 'jszip';
import { SKILL_FILES } from '../data/skillFiles';

export async function generateSkillRepoZip(repoName?: string): Promise<Blob> {
  const zip = new JSZip();
  // Put files directly at zip root so Claude Capabilities Skills upload works immediately
  for (const file of SKILL_FILES) {
    zip.file(file.path, file.content);
  }

  // Add a top-level .gitignore
  zip.file(
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
