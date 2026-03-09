export type SopInput = {
  processName: string;
  goal: string;
  ownerRole: string;
  triggers: string;
  toolsUsed: string;
  steps: string;
  qaChecks: string;
  escalationPath: string;
};

export function buildSopDraft(input: SopInput): string {
  const stepLines = input.steps
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => `${index + 1}. ${line}`)
    .join('\n');

  return `# SOP: ${input.processName}\n\n## Goal\n${input.goal}\n\n## Process Owner\n${input.ownerRole}\n\n## Triggers\n${input.triggers}\n\n## Tools\n${input.toolsUsed}\n\n## Steps\n${stepLines}\n\n## QA Checks\n${input.qaChecks}\n\n## Escalation\n${input.escalationPath}\n`;
}
