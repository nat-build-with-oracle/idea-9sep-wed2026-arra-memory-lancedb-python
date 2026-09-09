import { t } from "./i18n";
import { THEMES, useTheme } from "./theme";

/**
 * The palette, at the top of Settings.
 *
 * A per-browser preference rather than server configuration — two people opening
 * the same add-on should not have to agree on a palette. Stored in localStorage
 * and also readable from `?theme=`, which makes a particular look a link you can
 * send.
 *
 * The LANGUAGE switch deliberately does not live here. It is the one preference
 * someone may need before they can read the page that would let them change it,
 * so it sits in the nav bar instead.
 */
export function Appearance() {
  const [theme, setTheme] = useTheme();

  return (
    <section className="mb-8 flex flex-col gap-6">
      <div>
        <p className="eyebrow mb-2">{t("settings.theme")}</p>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((item) => {
            const on = item.id === theme;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id)}
                aria-pressed={on}
                title={item.note}
                className="flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors"
                style={{
                  borderColor: on ? "var(--color-ember)" : "var(--color-line)",
                  background: on ? "var(--color-ember-soft)" : "transparent",
                }}
              >
                {/* Two swatches — the ground and the accent — because those are
                    the two decisions a theme actually makes, and a single dot
                    cannot show the contrast between them. */}
                <span
                  aria-hidden="true"
                  className="flex size-6 shrink-0 items-center justify-center rounded-full border"
                  style={{ background: item.swatch[0], borderColor: "var(--color-line-bright)" }}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: item.swatch[1] }}
                  />
                </span>
                <span className="min-w-0">
                  <span
                    className="block text-sm"
                    style={{ color: on ? "var(--color-ember)" : "var(--color-ink)" }}
                  >
                    {item.label}
                  </span>
                  <span className="meta block truncate">{item.note}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
