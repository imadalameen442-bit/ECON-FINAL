/**
 * Fixed ambient background: slow-drifting radial mesh orbs over OLED black.
 * pointer-events-none and fixed so it never triggers scroll repaints.
 */
export function MeshBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(20,40,38,0.55),transparent_60%)]" />
      {/* emerald orb */}
      <div className="absolute -left-32 top-[12%] h-[42rem] w-[42rem] rounded-full bg-emerald-500/12 blur-[120px] animate-float" />
      {/* gold orb */}
      <div
        className="absolute -right-40 top-[48%] h-[38rem] w-[38rem] rounded-full bg-gold-500/10 blur-[130px] animate-float"
        style={{ animationDelay: "-3s" }}
      />
      {/* cool orb */}
      <div
        className="absolute bottom-[-10%] left-[30%] h-[34rem] w-[34rem] rounded-full bg-sky-400/8 blur-[120px] animate-float"
        style={{ animationDelay: "-1.5s" }}
      />
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(100% 60% at 50% 30%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(100% 60% at 50% 30%, black, transparent 75%)",
        }}
      />
    </div>
  );
}
