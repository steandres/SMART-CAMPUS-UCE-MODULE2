import { getServiceStatuses } from '@/lib/api/service-status';

const modules = [
  {
    title: 'Scholarship Management',
    description:
      'Track scholarship requests, status updates, and student welfare support decisions.',
    href: '/scholarships',
    label: 'Scholarship Service',
  },
  {
    title: 'Socioeconomic Forms',
    description:
      'Review socioeconomic information that supports welfare and scholarship decisions.',
    href: '/socioeconomic-forms',
    label: 'Socioeconomic Service',
  },
];

export default async function Home() {
  const serviceStatuses = await getServiceStatuses();

  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-16">
      <section className="mx-auto flex max-w-7xl flex-col gap-10">
        <header className="flex flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-academic backdrop-blur md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-campus-gold">
                SMART CAMPUS UCE
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-campus-navy md:text-6xl">
                Student Welfare and Support Module
              </h1>
            </div>
            <div className="rounded-2xl bg-campus-navy px-5 py-4 text-right text-white shadow-lg">
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">Module</p>
              <p className="text-2xl font-bold">02</p>
            </div>
          </div>

          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            Academic dashboard for coordinating scholarship support and
            socioeconomic assessment services across the SMART CAMPUS UCE
            ecosystem.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {modules.map((module) => (
              <article
                key={module.title}
                className="group rounded-[1.75rem] border border-white/70 bg-white/85 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-academic"
              >
                <div className="mb-7 inline-flex rounded-full bg-campus-blue/10 px-4 py-2 text-sm font-semibold text-campus-blue">
                  {module.label}
                </div>
                <h2 className="text-2xl font-extrabold text-campus-navy">
                  {module.title}
                </h2>
                <p className="mt-4 min-h-24 text-sm leading-7 text-slate-600">
                  {module.description}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-sm font-semibold text-slate-500">Sprint 17 Base</span>
                  <span className="rounded-full bg-campus-navy px-4 py-2 text-sm font-semibold text-white">
                    Coming soon
                  </span>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-[1.75rem] border border-campus-navy/10 bg-campus-navy p-7 text-white shadow-academic">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-campus-gold">
              Service Monitor
            </p>
            <h2 className="mt-3 text-2xl font-extrabold">Microservice Status</h2>
            <div className="mt-7 space-y-4">
              {serviceStatuses.map((service) => (
                <div
                  key={service.name}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold">{service.name}</p>
                      <p className="mt-1 text-xs text-white/60">{service.baseUrl}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        service.isAvailable
                          ? 'bg-emerald-400/20 text-emerald-200'
                          : 'bg-rose-400/20 text-rose-200'
                      }`}
                    >
                      {service.isAvailable ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}
