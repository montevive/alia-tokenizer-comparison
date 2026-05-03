import { useT } from '../i18n'

export function WhyItMatters() {
  const t = useT()
  return (
    <section className="why-section">
      <h2 className="why-title">{t.whyTitle}</h2>
      <p className="why-intro">{t.whyIntro}</p>
      <div className="why-grid">
        {t.whyItems.map((item, i) => (
          <article key={i} className="why-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
