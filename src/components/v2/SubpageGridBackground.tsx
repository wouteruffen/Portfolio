/**
 * Fixed grid texture used behind regular subpages (OverMij, the project
 * category pages). Same recipe as the grid used throughout the homepage
 * sections (AboutV2, ProjectsV2, ContactV2) — kept in one place so every
 * subpage stays in sync instead of re-declaring the same style object.
 * Rendered `fixed inset-0`, so it fills the viewport from y=0 and shows
 * through immediately below the fixed navbar with no gap.
 */
const SubpageGridBackground = () => (
  <div
    className="fixed inset-0 pointer-events-none opacity-[0.06] z-0"
    style={{
      backgroundImage: `
        linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
        linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}
  />
);

export default SubpageGridBackground;
